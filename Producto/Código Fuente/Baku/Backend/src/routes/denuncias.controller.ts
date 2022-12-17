import { transporter } from '../libs/mailer'
import { RequestHandler } from "express";
import Denuncia from './Denuncia';
import Usuario from './Usuario';
import Libro from './Libro';
import moment from 'moment';
import Parametros from './Parametros';

/* from: '"Baku" <bakulibros@gmail.com>', // sender address
to: "ariel.strasorier@gmail.com", // list of receivers
subject: "El libro Denuncia ✔", // Subject line
html: "<b> Hola buenos dias su libro fue denunciado </b>", // html body */


export const enviarMail: RequestHandler = async (req, res) => {
    const { from, to, subject, mensajeCuerpo, concepto, autorAuth0, libroId } = req.body;
    await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        //salto de linea en el cuerpo del mensaje
        html: `<b>${mensajeCuerpo} <br> <br> 
                Concepto: ${concepto} <br> <br> 
                Autor: ${autorAuth0} <br> <br> </b> `
    })
    res.json({ message: 'Mail enviado' })
}

export const guardarDenuncia: RequestHandler = async (req, res) => {
    const { from, to, subject, mensajeCuerpo, concepto, autorAuth0, libroId, reclamosxUsuario, reclamosxLibro, reclamador } = req.body;
    const denuncia = new Denuncia({ from, to, subject, mensajeCuerpo, concepto, autorAuth0, libroId, reclamosxUsuario, reclamosxLibro, reclamador })
    let message;
    //verificar si ya existe una denuncia para ese autorAuth0 y libroId del mismo reclamador 
    const denunciaExistente = await Denuncia.findOne({ autorAuth0: autorAuth0, libroId: libroId, reclamador: reclamador })
    if (!denunciaExistente) {
        await denuncia.save()
        message = 'guardada'
        const denuncias = await Denuncia.find({ autorAuth0: autorAuth0, libroId: libroId })
        console.log(reclamosxUsuario, reclamosxLibro)
        denuncias.forEach(async denuncia => {
            denuncia.reclamosxUsuario = reclamosxUsuario
            denuncia.reclamosxLibro = reclamosxLibro
            await denuncia.save()
        });
        const denuncia2 = await Denuncia.find({ autorAuth0: autorAuth0 })
        denuncia2.forEach(async denuncia => {
            denuncia.reclamosxUsuario = reclamosxUsuario
            await denuncia.save()
        });
    } else {
        message = 'no guardada'
    }
    //todas las denucias del mismo autorAuth0 y libroId actualizarlas con el nuevo reclamosxUsuario y reclamosxLibro 

    res.json({ message: message })
}


export const bloquearAutorLibro: RequestHandler = async (req, res) => {
    const { autorAuth0, libroId } = req.body;
    //buscar por el campo auth0_id y actualizar el campo bloqueado
    await Usuario.findOneAndUpdate({ auth0_id: autorAuth0 }, { estado: "Bloqueado" }, { new: true }).exec();
    const ContadorDenunciasxLibro = await Denuncia.find({ autorAuth0: autorAuth0, libroId: libroId }).countDocuments();
    const numeroLibro = await Parametros.findOne({}).exec();
    let numeroLibro2 = 1;
    if (numeroLibro) {
        numeroLibro2 = numeroLibro.numeroLibro;
    }
    if (ContadorDenunciasxLibro >= numeroLibro2) {
        await Libro.findOneAndUpdate({ _id: libroId }, { estado: "Rechazado" }, { new: true }).exec();
    }

    await Usuario.updateMany({}, { $pull: { libros_leidos: { id_libro: libroId } } }).exec();
    await Usuario.updateMany({}, { $pull: { libros_favoritos: { id_libro: libroId } } }).exec();
    const usuarioBloqueado = await Usuario.findOne({ auth0_id: autorAuth0 }).exec();
    if (usuarioBloqueado) {
        await Usuario.updateMany({}, { $pull: { suscriptores: { usuario_id: usuarioBloqueado.id } } }).exec();
    }
    res.json({ message: 'Autor bloqueado ' })
}

//contar cuantas denuncias tiene un usuario en la base de datos
export const putContadorDenuncias: RequestHandler = async (req, res) => {
    const { auth0_id } = req.body;
    const denuncias = await Denuncia.find({ autorAuth0: auth0_id }).countDocuments()
    res.json(denuncias)
}

//contar cuantas denuncias tiene un libro en la base de datos
export const putContadorDenunciasxLibro: RequestHandler = async (req, res) => {
    const { libroId } = req.body;
    const denuncias = await Denuncia.find({ libroId: libroId }).countDocuments()
    res.json(denuncias)
}

export const getDenunciasxLibroxUsuario: RequestHandler = async (req, res) => {
    //hacer un join con $lookup entre las tablas denuncias y usuarios 
    //Entre 5 dias antes de la fecha de publicacion y 5 dias despues de la fecha de publicacion
    const lista = await Denuncia.aggregate([
        {
            $lookup: {
                from: "usuarios",
                localField: "autorAuth0",
                foreignField: "auth0_id",
                as: "autor"
            }
        },//transformar el campo _id en string
        { $addFields: { "libroId": { $toObjectId: "$libroId" } } },
        {
            $lookup: {
                from: "libros",
                localField: "libroId",
                foreignField: "_id",
                as: "libro"
            }
        },
        {
            $project: {
                autor: {
                    createdAt: 0,
                    updatedAt: 0,
                    password: 0,
                    tipoUsuario: 0,
                    libros_leidos: 0,
                    libros_publicados: 0,
                    correo_electronico: 0,
                    fecha_nacimiento: 0,
                    foto: 0,
                    avatar: 0,
                    mensajes: 0,
                    suscriptores: 0,
                },
                libro: {
                    fecha_publicacion: 0,
                    genero: 0,
                    foto: 0,
                    imagenPath: 0,
                    archivoTexto: 0,
                    descripcion: 0,
                    createdAt: 0,
                    updatedAt: 0,
                }
            }
        }

    ])
    //cambiar fecha y hora con 4 horas atras   
    lista.forEach((element: any) => {
        element.createdAt = moment(element.createdAt).subtract(4, 'hours').format('YYYY/MM/DD')
    })
    res.json(lista)
}

export const eliminarReclamo: RequestHandler = async (req, res) => {
    const { id } = req.body;
    //obtener el libroId y el autorAuth0 de la denuncia
    const denuncia = await Denuncia.findById(id).exec();
    await Denuncia.findByIdAndDelete(id)
    if (denuncia) {
        const libroId = denuncia.libroId;
        const autorAuth0 = denuncia.autorAuth0;
        //contar cuantas denuncias tiene el libro
        const ContadorDenunciasxLibro = await Denuncia.find({ libroId: libroId }).countDocuments();
        //actualizar los reclamosxLibro en todas las denuncias con el libroId
        await Denuncia.updateMany({ libroId: libroId }, { reclamosxLibro: ContadorDenunciasxLibro }).exec();
        //contar cuantas denuncias tiene el usuario
        const ContadorDenunciasxUsuario = await Denuncia.find({ autorAuth0: autorAuth0 }).countDocuments();
        //actualizar los reclamosxUsuario en todas las denuncias con el autorAuth0
        await Denuncia.updateMany({ autorAuth0: autorAuth0 }, { reclamosxUsuario: ContadorDenunciasxUsuario }).exec();
        res.json({ message: 'Denuncia eliminada' })
    }
}

export const guardarParametros: RequestHandler = async (req, res) => {
    const { numeroUsuario, numeroLibro } = req.body;
    console.log(numeroUsuario, numeroLibro)
    //actualizar los parametros 
    await Parametros.findOneAndUpdate({}, { numeroUsuario: numeroUsuario, numeroLibro: numeroLibro }, { new: true }).exec();
    //si una denuncia tiene mas de numeroUsuario reclamosxUsuario bloquear el usuario autorAuth0
    const denuncias = await Denuncia.find({}).exec();
    denuncias.forEach(async (element: any) => {
        const ContadorDenunciasxUsuario = await Denuncia.find({ autorAuth0: element.autorAuth0 }).countDocuments();
        if (ContadorDenunciasxUsuario >= numeroUsuario) {
            await Usuario.findOneAndUpdate({ auth0_id: element.autorAuth0 }, { estado: "Bloqueado" }, { new: true }).exec();
        }
        else { await Usuario.findOneAndUpdate({ auth0_id: element.autorAuth0 }, { estado: "Activo" }, { new: true }).exec(); }

    })
    //si una denuncia tiene mas de numeroLibro reclamosxLibro bloquear el libro libroId
    denuncias.forEach(async (element: any) => {
        const ContadorDenunciasxLibro = await Denuncia.find({ libroId: element.libroId }).countDocuments();
        if (ContadorDenunciasxLibro >= numeroLibro) {
            await Libro.findByIdAndUpdate({ _id: element.libroId }, { estado: "Rechazado" }, { new: true }).exec();
        }
        else {
            await Libro.findByIdAndUpdate({ _id: element.libroId }, { estado: "Publicado" }, { new: true }).exec();
        }

    })
    res.json({ message: 'Parametros actualizados' })
}

export const obtenerParametros: RequestHandler = async (req, res) => {
    const parametros = await Parametros.find()
    res.json(parametros)
}
