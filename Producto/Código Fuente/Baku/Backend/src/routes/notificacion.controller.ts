import { RequestHandler } from "express";
import Notificacion from "./Notificacion";
import Usuario from "./Usuario";

export const createNotificacion: RequestHandler = async (req, res) => {
    const { auth0usuario, titulo, descripcion, tipo, esNoleido } = req.body
    const newNotificacion = { titulo, descripcion, tipo, esNoleido };
    const notificacion = new Notificacion(newNotificacion);
    console.log(newNotificacion);
    await notificacion.save();
    //buscar cada uno de los usuarios que tengan el tipo de usuario que se le pasa por parametro y mandarle la notificacion
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

