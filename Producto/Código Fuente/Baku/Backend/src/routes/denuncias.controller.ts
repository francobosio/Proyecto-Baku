import { transporter} from '../libs/mailer'
import { RequestHandler } from "express";
import Denuncia from './Denuncia';
import Usuario from './Usuario';
import Libro from './Libro';

/* from: '"Baku" <bakulibros@gmail.com>', // sender address
to: "ariel.strasorier@gmail.com", // list of receivers
subject: "El libro Denuncia ✔", // Subject line
html: "<b> Hola buenos dias su libro fue denunciado </b>", // html body */


export const enviarMail : RequestHandler = async (req, res) => {
  const  { from, to, subject, mensajeCuerpo, concepto, autorAuth0,libroId } = req.body;
  console.log(from, to, subject, mensajeCuerpo, concepto, autorAuth0,libroId)
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

export const guardarDenuncia : RequestHandler = async (req, res) => {
  const  { from, to, subject, mensajeCuerpo, concepto, autorAuth0,libroId,reclamosxUsuario,reclamosxLibro} = req.body;
    const denuncia = new Denuncia({from, to, subject, mensajeCuerpo, concepto, autorAuth0,libroId,reclamosxUsuario,reclamosxLibro})
    const savedDenuncia = await denuncia.save()
    res.json(savedDenuncia)
}

export const bloquearAutorLibro : RequestHandler = async (req, res) => {
    const  { autorAuth0,libroId} = req.body;
    //buscar por el campo auth0_id y actualizar el campo bloqueado
    const usuario = await Usuario.findOneAndUpdate({auth0_id: autorAuth0}, {estado: "Bloqueado"}, {new: true}).exec();
    const libro = await Libro.findOneAndUpdate({_id: libroId}, {estado: "Rechazado"}, {new: true}).exec();
    res.json({ message: 'Autor y Libro bloqueados' })
}

//contar cuantas denuncias tiene un usuario en la base de datos
export const putContadorDenuncias : RequestHandler = async (req, res) => {
    const  { auth0_id } = req.body;
    const denuncias = await Denuncia.find({ autorAuth0: auth0_id }).countDocuments()
    res.json(denuncias)
}

//contar cuantas denuncias tiene un libro en la base de datos
export const putContadorDenunciasxLibro : RequestHandler = async (req, res) => {
    const  { libroId } = req.body;
    const denuncias = await Denuncia.find({ libroId: libroId }).countDocuments()
    res.json(denuncias)
}

export const getDenunciasxLibroxUsuario : RequestHandler = async (req, res) => {
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
                avatar:0,
                mensajes: 0,
                suscriptores:0,
            },
            libro: {
                fecha_publicacion: 0,
                genero:0,
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
//solo usuarios en estado bloqueado o libros en estado rechazado y reclamosxUsuario mayor a 1 y reclamosxLibro mayor a 1
const listaFiltrada = lista.filter((item) => (item.autor[0].estado === "Bloqueado" || item.libro[0].estado === "Rechazado" )&& item.reclamosxUsuario > 1 && item.reclamosxLibro > 1)
res.json(listaFiltrada)
/* res.json(lista) */
}

export const eliminarReclamo : RequestHandler = async (req, res) => {
    const  { id } = req.body;
    await Denuncia.findByIdAndDelete(id)
    res.json({ message: 'Denuncia eliminada' })
}
