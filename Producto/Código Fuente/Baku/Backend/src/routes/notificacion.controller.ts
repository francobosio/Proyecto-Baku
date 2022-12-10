import { RequestHandler } from "express";
import Notificacion from "./Notificacion";
import Usuario from "./Usuario";
import mongoose from 'mongoose'; 
const ObjectId = mongoose.Types.ObjectId;

export const createNotificacion: RequestHandler = async (req, res) => {
    const { auth0usuario, titulo, descripcion, tipo, esNoleido, id_libro, avatar } = req.body
    const newNotificacion = { titulo, descripcion, tipo, esNoleido, id_libro, avatar };
    const notificacion = new Notificacion(newNotificacion);
    await notificacion.save();
    //busco el usuario que sube la obra
    const author = await Usuario.findOne({ auth0_id: auth0usuario }).exec();
    //acceder al vector suscriptores del author y mandarle la notificacion
    if (author) {
        author.suscriptores.forEach(async suscriptor => {
            //buscar y agregarle la notificacion en el vector de notificaciones
           const res = await Usuario.findOneAndUpdate({ _id: suscriptor.usuario_id }, { $push: { mensajes: notificacion } }).exec();
        })
    }
    res.json({ notificacion, author });
}


export const getNotificacion: RequestHandler = async (req, res) => {
    const respuestaBD = await Notificacion.find().exec();
    return res.json(respuestaBD);
}

export const getNotificacionUsuarioActual: RequestHandler = async (req, res) => {
    const auth0usuario = req.params.idAuthUsuario;
    //traer solo el campo mensajes
    const respuestaBD = await Usuario.findOne({ auth0_id: auth0usuario }).select("mensajes").exec();
    return res.json(respuestaBD);
}

export const marcarTodasComoLeidas: RequestHandler = async (req, res) => {
    //obtener el array que se manda por el body
    const { usuarioActual } = req.body;
    //change el campo esNoleido a false
    await Usuario.findByIdAndUpdate({_id: usuarioActual }, { $set: { "mensajes.$[].esNoleido": false } }).exec();
    return res.json({
        message: "Todas las notificaciones marcadas como leidas"
    });
}

export const notificacionLeida: RequestHandler = async (req, res) => {
    const { usuario_id, notificacion_id } = req.body;
    const valor = await Usuario.findOneAndUpdate({auth0_id: usuario_id },
    { $set: { 'mensajes.$[element].esNoleido': false} },
    { arrayFilters: [{ "element._id" :{$eq: notificacion_id }}] }).exec();
    return res.json({
        message: "Notificacion marcada como leida"
    });
}
