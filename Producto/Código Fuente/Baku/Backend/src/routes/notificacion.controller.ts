import { Console } from "console";
import { RequestHandler } from "express";
import Notificacion from "./Notificacion";
import Usuario from "./Usuario";

export const createNotificacion: RequestHandler = async (req, res) => {
    const { auth0usuario, titulo, descripcion, tipo, esNoleido,id_libro } = req.body
    const newNotificacion = { titulo, descripcion, tipo, esNoleido,id_libro  };
    const notificacion = new Notificacion(newNotificacion);
    console.log(newNotificacion);
    await notificacion.save();
    //busco el usuario que sube la obra
    const author = await Usuario.findOne({ auth0_id: auth0usuario }).exec();
    console.log(author)
    //acceder al vector suscriptores del author y mandarle la notificacion
    if (author) {
        author.suscriptores.forEach(async suscriptor => {
            console.log(suscriptor);
            //buscar y agregarle la notificacion en el vector de notificaciones
            await Usuario.findOneAndUpdate({ auth0_id: suscriptor.auth0_id }, { $push: { mensajes: notificacion } }).exec();
        })
    }
    else {
        console.log("No existe el usuario o No tiene suscriptores");
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
    const {usuarioActual} = req.body;
    console.log(usuarioActual);
    //change el campo esNoleido a false
    await Usuario.findByIdAndUpdate({_id: "6189a5e6efa0cdc3945db096" }, { $set: { "mensajes.[].esNoleido": false } }).exec();
    return res.json({
        message: "Todas las notificaciones marcadas como leidas"
    });
}

