import { RequestHandler } from "express";
import fetch from 'node-fetch'
import Cobro from "./PremiumCobro";
import Usuario from "./Usuario";
import config from '../config'
import Notificacion from "./Notificacion";
import PremiumPlan from "./PremiumPlan";

export const procesarCobroFront: RequestHandler = async (req, res) => {
    const { front_Id, user_Id } = req.body;

    let cobro = await Cobro.findOne({ webhookId: front_Id }).exec();

    if (cobro) {
        cobro.frontId = front_Id;
        cobro.userId = user_Id;

        if (cobro.estado == 'Aprobado') {
            if (!cobro.fechaVencimiento) {
                let fechaHoy = new Date(Date.now());
                let fechaVencimiento = new Date(fechaHoy.setMonth(fechaHoy.getMonth() + 1))
                cobro.fechaVencimiento = fechaVencimiento;
            }

            const plan = await PremiumPlan.findOne({titulo: cobro.plan})
            if (plan){
                await Usuario.findOneAndUpdate({ _id: cobro.userId }, { tipoUsuario: "2", planPremium: plan.urlCobro }, { new: true }).exec();
            }      
        }
    }
    else {
        cobro = await Cobro.findOne({ frontId: front_Id }).exec();
        if (!cobro) {
            cobro = new Cobro({ frontId: front_Id, userId: user_Id })
        }
    }

    await cobro.save()
    res.json(cobro)
}

export const procesarCobroWebhook: RequestHandler = async (req, res) => {
    const { data, entity, action } = req.body;
    if (entity === "preapproval") {
        if (action === "created") {
            // Se crea un nuevo cobro o se actualiza en caso de que ya este creado
            let cobro = await Cobro.findOne({ frontId: data.id }).exec();
            if (cobro) {
                cobro.webhookId = data.id;
                cobro.estado = "Creado";
            } else {
                cobro = await Cobro.findOne({ webhookId: data.id }).exec();
                if (!cobro) {
                    cobro = new Cobro({ webhookId: data.id, estado: "Creado" });
                }
            }
            await cobro.save();
        } else if (action === "updated") {
            let cobro = await Cobro.findOne({ webhookId: data.id }).exec();

            const res = await fetch(`https://api.mercadopago.com/preapproval/${data.id}`, {
                headers: {
                    'Authorization': `Bearer ${config.MP_ACCESS_TOKEN}`
                }
            }).then(response => response.json())
                .then(async data => {
                    if (cobro) {
                        if (data.status === "authorized") {
                            cobro.fechaVencimiento = data.next_payment_date;
                            cobro.estado = "Aprobado"
                            let plan = await PremiumPlan.findOne({ urlCobro: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=" + data.preapproval_plan_id })
                            if (plan) {
                                cobro.plan = plan.titulo;
                                cobro.importe = plan.precio;
                            }

                            if (cobro.userId) {
                                await Usuario.findOneAndUpdate({ _id: cobro.userId }, { tipoUsuario: "2", planPremium: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=" + data.init_point }, { new: true }).exec();
                            }
                        } else {
                            cobro.estado = "Cancelado";
                            cobro.notificadoMes = false;
                            cobro.fechaVencimiento = data.next_payment_date;
                            const mesVencimiento = new Date(data.next_payment_date).getMonth() + 1;
                            const mesHoy = new Date(Date.now()).getMonth() + 1;
                            if ((mesVencimiento === mesHoy + 1) || (mesVencimiento === 1  && mesHoy === 12)) {
                                const notification = new Notificacion({
                                    'titulo': 'Vencimiento de suscripción',
                                    'esNoleido': true,
                                    'descripcion': 'El próximo mes vence su suscripción y perderá sus beneficios Premium',
                                    'tipo': 'Premium'
                                })
                                cobro.notificadoMes = true;
                                notification.save()
                                await Usuario.findOneAndUpdate({ _id: cobro.userId }, { $push: { mensajes: notification } }).exec();
                            }
                        }
                        await cobro.save();
                    }
                });
        }
    }
    res.sendStatus(200);
}

export const obtenerCobroByUserId: RequestHandler = async (req, res) => {
    const cobro = await Cobro.findOne({ userId: req.params.id });
    if (!cobro) return res.status(204).json();

    return res.json(cobro)
}

export const obtenerCobros: RequestHandler = async (req, res) => {
    const cobros = await Cobro.aggregate([
        { $addFields: { "userId": { $toObjectId: "$userId" } } },
        {
            $lookup: {
                from: "usuarios",
                localField: "userId",
                foreignField: "_id",
                as: "usuario"
            }
        }
    ]);

    return res.json(cobros)
}

export const actualizarEstadosUsuarios = async () => {
    let fechaHoy = new Date(Date.now());
    let cobros = await Cobro.find({ estado: 'Cancelado' });

    cobros.forEach(async (cobro) => {
        const mesVencimiento = new Date(cobro.fechaVencimiento).getMonth() + 1;
        const mesHoy = new Date(Date.now()).getMonth() + 1;
        if (cobro.fechaVencimiento < fechaHoy) {
            if (cobro.userId) {
                cobro.estado = 'Finalizado';
                let usuario = await Usuario.findById(cobro.userId)
                if (usuario) {
                    usuario.tipoUsuario = '1';
                    usuario.planPremium = '';
                    usuario.save();
                }
                cobro.save();
            }
        } else if ((Math.ceil((cobro.fechaVencimiento.getTime()-fechaHoy.getTime()) / (1000 * 3600 * 24))) === 7) {
            const notification = new Notificacion({
                'titulo': 'Vencimiento de suscripción',
                'esNoleido': true,
                'descripcion': 'En 7 días vence su suscripción y perderá sus beneficios Premium',
                'tipo': 'Premium'
            })
            notification.save()
            await Usuario.findOneAndUpdate({ _id: cobro.userId }, { $push: { mensajes: notification } }).exec();
            cobro.save();
        } else if ((mesVencimiento === mesHoy + 1) || (mesVencimiento === 1  && mesHoy === 12))  {
            const notification = new Notificacion({
                'titulo': 'Vencimiento de suscripción',
                'esNoleido': true,
                'descripcion': 'El próximo mes vence su suscripción y perderá sus beneficios Premium',
                'tipo': 'Premium'
            })
            cobro.notificadoMes = true;
            notification.save()
            await Usuario.findOneAndUpdate({ _id: cobro.userId }, { $push: { mensajes: notification } }).exec();
            cobro.save();
        }
    });
}
