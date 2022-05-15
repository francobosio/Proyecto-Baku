
import { RequestHandler } from "express"
import Libro from './Libro'
import config from '../config'
import https from 'https'
import fs from 'fs-extra'
import redis from 'redis'
import { promisify } from 'util'
import PdfParse from "pdf-parse";
import Usuario from "./Usuario"

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
    client.flushdb((err, succeeded) => {
        if (err) {
            console.log("error occured on redisClient.flushdb");
        } else console.log("purge caches store in redis");
    });
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
        usuario: req.body.usuario,
        editorial: req.body.editorial,
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
        libro
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
        let reply: any = await GET_ASYNC('libros')
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

export const getLibrosRegistrados: RequestHandler = async (req, res) => {
    try {
        //Para limpiar la cache
        client.flushdb((err, succeeded) => {
            if (err) {
                console.log("error occured on redisClient.flushdb");
            } else console.log("Cache eliminado con exito!!!");
        });

        let reply: any = await GET_ASYNC('libros')
        if (reply) {
            return res.json(JSON.parse(reply))
        }
        else {

            const libros = await Libro.find({ estado: 'Registrado' })

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

export const buscarLibro: RequestHandler = async (req, res) => {
    console.log(req.params)
    const busqueda = req.params.buscar;
    const valor = "\"" + `${busqueda}` + "\"";
    console.log(valor);
    const libroFound = await Libro.find({ $text: { $search: valor, $caseSensitive: false, $diacriticSensitive: false } });
    if (!libroFound) return res.status(204).json();
    res.json(libroFound);
}

export const buscarLibroGenero: RequestHandler = async (req, res) => {
    console.log(req.params)
    const genero = req.params.genero;
    const libroFound = await Libro.find({ "genero": genero });
    if (!libroFound) return res.status(204).json();
    res.json(libroFound);
}

const malasPalabras = [
    "puto", "trolo", "padre", "perro", "roca", "castillo", "arma", "hombre"
]

export const getLibroRevision: RequestHandler = async (req, res) => {
    const libroFound = await Libro.findById(req.params.id);
    if (!libroFound) return res.status(204).json(); let sinMalasPalabras = false;
    const url = libroFound.archivoTexto;
    const url2 = url.replace("http", "https");
    https.get(url2, function (res) {
        //nombre del archivo
        const fileStream = fs.createWriteStream(`./revision/${libroFound.titulo}.pdf`);
        res.pipe(fileStream);
        fileStream.on('finish', function () {
            fileStream.close();
            console.log("El Archivo fue descargado con éxito !!");
        }
        )
    })

    //esperar a que el archivo se descargue
    await new Promise(resolve => setTimeout(resolve, 2000));
    const pdfFile = await fs.readFile(`./revision/${libroFound.titulo}.pdf`);

    PdfParse(pdfFile).then(function (data) {
        //Separo en palabras el texto del pdf
        let arrayData = data.text.split(/\t|\n|\s/);
        //limpiar palabras de arrayData incluidas las tildes
        let arrayDataLimpio = arrayData.map((palabra: string) => palabra.toLowerCase()
            .replace(/á/g, "a")
            .replace(/é/g, "e")
            .replace(/í/g, "i")
            .replace(/ó/g, "o")
            .replace(/ú/g, "u")
            .replace(/[^\w]/gi, "")
        );
        //quitar elementos vacios
        arrayDataLimpio = arrayDataLimpio.filter((palabra: string) => palabra !== "");
        //match palabras con array de malas palabras y mostrar en consola
        let arrayDataMatch = arrayDataLimpio.filter(function (palabra: string) {
            return malasPalabras.includes(palabra);
        });
        //identificar palabra y cantidad de veces que se repite typeScript
        let arrayDataMatchCount = arrayDataMatch.reduce(function (obj: any, palabra: string | number) {
            obj[palabra] = (obj[palabra] || 0) + 1;
            return obj;
        }, {});

        //create a new array with the results
        let arrayDataMatchCountArray = Object.keys(arrayDataMatchCount).map(function (key) {
            return [key, arrayDataMatchCount[key]];
        });
        //delete file from folder
        fs.unlink(`./revision/${libroFound.titulo}.pdf`, (err) => {
            if (err) throw err;
            console.log('El archivo fue eliminado con exito !!');
        });
        //si el array esta vacio no hay palabras repetidas
        if (arrayDataMatchCountArray.length === 0) {
            sinMalasPalabras = true;
        }

        return res.json({
            libroFound,
            arrayDataMatchCountArray,
            sinMalasPalabras,
            message: "Libro revisado con éxito !!",
        })

    });
}

//actualizar el estado de libro dependiendo el parametro que se le pase en el body 
export const updateLibroEstado: RequestHandler = async (req, res) => {
    const { id, estado } = req.body;
    const libroUpdated = await Libro.findByIdAndUpdate(id, { estado }, { new: true })
    if (!libroUpdated) return res.status(204).json();
    res.json(libroUpdated);
}

export const getBuscarAutor: RequestHandler = async (req, res) => {
    const libroId = req.params.libroId;
    //buscar que usuario tiene el libro en la coleccion libro_publicados y solo mostrar el campo autor con projeccion
    const separoLibros = await Usuario.aggregate([{ $unwind: "$libros_publicados" }])
    const autorNombre = await Usuario.find({ "libros_publicados.id_libro": libroId }, { nombre: 1,apellido:1, _id: 1 });
    const respuesta= autorNombre[0];
    //si autorNombre no existe retornar un status 204 y un mensaje
    if (!respuesta) return res.status(204).json("No existe el nombre del autor");
    //retornar autorNombre
    res.json({
        respuesta
    });
}

//buscar todos los libros de un autor
export const getLibrosAutor: RequestHandler = async (req, res) => {
    const autorId = req.params.id;
    //solo mostrar libros_publicados
    const autorLibros= await Usuario.findById(autorId).select("libros_publicados");
    if (!autorLibros) return res.status(204).json("No existen libros para este autor");
    //convertir el array de libros_publicados una array de id libros
    const librosId= autorLibros.libros_publicados.map((libro: any) => libro.id_libro);
    //convertir librosId en un vector de string 
    const libros = await Libro.find({ _id: { $in:librosId}});
    res.json(libros);
}