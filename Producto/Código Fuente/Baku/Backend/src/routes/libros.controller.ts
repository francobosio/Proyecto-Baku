import { RequestHandler } from "express"
import path from "path";
import Libro from './Libro'
import multer from "multer"
import config from '../config'
import fs from 'fs-extra'

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET,
});

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
        public_id_pdf: respuestaPdf.public_id,
        genero: req.body.genero,
        autor: req.body.autor,
        aptoTodoPublico: req.body.aptoTodoPublico,
        aceptaTerminos: req.body.aceptaTerminos,
        estado: req.body.estado,
        
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

export const getLibros: RequestHandler = async (req, res) => {
    try {
        const libros = await Libro.find()
        return res.json(libros);
    } catch (error) {
        res.json(error)
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

export const buscarLibro: RequestHandler = async (req, res) => {
    console.log(req.params)
    const busqueda = req.params.buscar;
    const valor ="\""+ `${busqueda}` + "\"";
    console.log(valor);
    const libroFound = await Libro.find({$text:{$search: valor, $caseSensitive: false, $diacriticSensitive: false}});
    if (!libroFound) return res.status(204).json();
    res.json(libroFound);
}

export const buscarLibroGenero : RequestHandler = async (req, res) => {
    console.log(req.params)
    const genero = req.params.genero;
    const valor ="\""+ `${genero}` + "\"";
    console.log(valor);
    const libroFound = await Libro.find({"genero": genero});
    if (!libroFound) return res.status(204).json();
    res.json(libroFound);
}

