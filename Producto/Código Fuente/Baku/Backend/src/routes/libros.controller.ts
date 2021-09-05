import { RequestHandler } from "express"
import Libro from './Libro'

export const createLibro: RequestHandler = async (req, res) => {
    const libroFound = await Libro.findOne({ url: req.body.url })
    if (libroFound)
        return res.status(301).json({ message: 'La URL ya existe wey!' })

    const libro = new Libro(req.body)
    const savedLibro = await libro.save()
    res.json(savedLibro);
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
    if(!libroFound) return res.status(204).json();
    return res.json(libroFound)
}

export const deleteLibro: RequestHandler = async (req, res) => {
    const libroFound = await Libro.findByIdAndDelete(req.params.id);
    if(!libroFound) return res.status(204).json();
    return res.json(libroFound)
}

export const updateLibro: RequestHandler = async (req, res) => {
    const libroUpdated = await Libro.findByIdAndUpdate(req.params.id, req.body,{new: true})
    if(!libroUpdated) return res.status(204).json();
    res.json(libroUpdated);
}