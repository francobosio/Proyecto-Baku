import { RequestHandler } from "express";
import fetch from 'node-fetch'
import mongoose from 'mongoose'; 
import Cobro from "./PremiumCobro";
import Usuario from "./Usuario";
import config from '../config'

const ObjectId = mongoose.Types.ObjectId;

export const procesarCobroFront: RequestHandler = async (req, res) => {
    const { front_Id, user_Id } = req.body;

    let cobro = await Cobro.findOne({webhookId: front_Id}).exec();

    if (cobro) {
        cobro.frontId = front_Id;
        cobro.userId = user_Id;

        if (cobro.estado == 'Aprobado'){
            if (!cobro.fechaVencimiento){
                let fechaHoy = new Date(Date.now());
                let fechaVencimiento = new Date(fechaHoy.setMonth(fechaHoy.getMonth()+1))
                cobro.fechaVencimiento = fechaVencimiento;
            }

            let usuario = await Usuario.findById(user_Id);
            if (usuario){
                usuario.tipoUsuario = '2';
                await usuario.save();
            }
        }
    }
    else {
        cobro = await Cobro.findOne({frontId: front_Id}).exec();
        if (!cobro){
            cobro = new Cobro({frontId: front_Id, userId: user_Id})
        }
    }

    await cobro.save()
    res.json(cobro)
}

export const procesarCobroWebhook: RequestHandler = async (req, res) => {
    const {data, entity, action} = req.body;
    if (entity === "preapproval") {
        if (action === "created") {
            // Se crea un nuevo cobro o se actualiza en caso de que ya este creado
            let cobro = await Cobro.findOne({frontId: data.id}).exec();
            if (cobro) {
                cobro.webhookId = data.id;
                cobro.estado = "Creado";
            } else {
                cobro = await Cobro.findOne({webhookId: data.id}).exec();
                if (!cobro) {
                    cobro = new Cobro({webhookId: data.id, estado: "Creado"});
                }
            }
            await cobro.save();
        } else if (action === "updated") {
            let cobro = await Cobro.findOne({webhookId: data.id}).exec();

            const res = await fetch(`https://api.mercadopago.com/preapproval/${data.id}`, {
                headers: {
                    'Authorization': `Bearer ${config.MP_ACCESS_TOKEN}`
                }
            }).then(response => response.json())
            .then(async data =>{
                console.log(data);
                if (cobro){
                    if (data.status === "authorized"){
                        cobro.fechaVencimiento = data.next_payment_date;
                        cobro.estado = "Aprobado"

                        if (cobro.userId){
                            let usuario = await Usuario.findById(cobro.userId);
                            if (usuario){
                                usuario.tipoUsuario = '2';
                                usuario.save();
                            }
                        }
                    } else {
                        cobro.estado = "Cancelado";
                        cobro.fechaVencimiento = data.next_payment_date;
                    }
                    await cobro.save();
                }
            });
        }
    }
    res.sendStatus(200);
}

export const obtenerCobroByUserId : RequestHandler = async (req, res) => {
    const cobro = await Cobro.findOne({userId: req.params.id});
    if (!cobro) return res.status(204).json();

    return res.json(cobro)
}

export const actualizarEstadosUsuarios = async () => {
    let fechaHoy = new Date(Date.now());
    let cobros = await Cobro.find({estado: 'Cancelado'});

    cobros.forEach(async (cobro) => {
        if (cobro.fechaVencimiento < fechaHoy){
            if (cobro.userId){
                let usuario = await Usuario.findById(cobro.userId)
                if (usuario) {
                    usuario.tipoUsuario = '1';
                    usuario.save();
                }
            }
        } 
    });
}
