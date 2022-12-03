import { RequestHandler } from "express";
import mongoose from 'mongoose'; 
import PremiumCobro from "./PremiumCobro";
import Usuario from "./Usuario";

const ObjectId = mongoose.Types.ObjectId;

export const procesarCobroFront: RequestHandler = async (req, res) => {
    const { front_Id, user_Id } = req.body;

    let cobro = await PremiumCobro.findOne({webhookId: front_Id}).exec();

    if (cobro) {
        cobro.frontId = front_Id;
        cobro.userId = user_Id;

        if (cobro.estado == 'Aprobado'){
            let fechaHoy = new Date(Date.now());
            let fechaVencimiento = new Date(fechaHoy.setMonth(fechaHoy.getMonth()+1))
            cobro.fechaVencimiento = fechaVencimiento;
            
            let usuario = await Usuario.findOne({auth0_id: user_Id});
            if (usuario){
                usuario.tipoUsuario = '2';
                await usuario.save();
            }
        }
    }
    else {
        cobro = new PremiumCobro({frontId: front_Id, userId: user_Id})
    }

    await cobro.save()
    res.json(cobro)
}

export const procesarCobroWebhook: RequestHandler = async (req, res) => {

}

