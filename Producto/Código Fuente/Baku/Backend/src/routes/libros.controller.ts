import { RequestHandler } from "express"
import path from "path";
import Libro from './Libro'
import multer from "multer"
import config from '../config'
import fs from 'fs-extra'
import redis from 'redis'
import { promisify } from 'util'

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET,
});

const client = redis.createClient();
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

export const createLibro: RequestHandler = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const respuestaImg = await cloudinary.v2.uploader.upload(files.imagenPath[0].path);
    const respuestaPdf = await cloudinary.v2.uploader.upload(files.archivoTexto[0].path);
    const newLibro = {
        imagenPath: respuestaImg.url,
        public_id_imagen: respuestaImg.public_id,
        titulo,
        descripcion,
        archivoTexto: respuestaPdf.url,
        public_id_pdf: respuestaPdf.public_id
    };
    const libro = new Libro(newLibro);
    console.log(libro)
    await libro.save();
    fs.unlink(files.imagenPath[0].path);
    fs.unlink(files.archivoTexto[0].path);
    return res.json({
        message: "Libro cargado con éxito !!!"
    })

    //Para verificar que no haya otro libro con el mismo titulo sujeto a revision
    //const libroFound = await Libro.findOne({ titulo: req.body.titulo })
    //if (libroFound)
    //  return res.status(301).json({ message: 'La URL ya existe wey!' })
    //const libro = new Libro(req.body)
    //const savedLibro = await libro.save()
    //res.json(savedLibro);
}

//use redis to cache the data
export const getLibros: RequestHandler = async (req, res) => {
    try {
        let reply:any = await GET_ASYNC('libros')
        if (reply) {
            return res.json(JSON.parse(reply))
        }
        else {

            const libros = await Libro.find()

            reply = await SET_ASYNC('libros', JSON.stringify(libros))

            res.json(libros);
        }
    } catch (error) {
        res.json({ message: error })
    }
}


export const getLibro: RequestHandler = async (req, res) => {
    const libroFound = await Libro.findById(req.params.id);
    if (!libroFound) return res.status(204).json();
    return res.json(libroFound)
}

export const deleteLibro: RequestHandler = async (req, res) => {
    const libroFound = await Libro.findByIdAndDelete(req.params.id);
    if (!libroFound) return res.status(204).json();
    if (libroFound) {
        await cloudinary.v2.uploader.destroy(libroFound.public_id_imagen);
        await cloudinary.v2.uploader.destroy(libroFound.public_id_pdf);
    }
    return res.json({
        message: "Libro eliminado con éxito !!",
        libroFound
    })
}

export const updateLibro: RequestHandler = async (req, res) => {
    const libroUpdated = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!libroUpdated) return res.status(204).json();
    res.json(libroUpdated);
}