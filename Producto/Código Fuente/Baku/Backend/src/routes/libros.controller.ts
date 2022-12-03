
import { RequestHandler } from "express"
import Libro from './Libro'
import config from '../config'
import https from 'https'
import fs from 'fs-extra'
import PdfParse from "pdf-parse";
import Usuario from "./Usuario"

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
        archivoTexto: respuestaPdf.secure_url,
        public_id_pdf: respuestaPdf.public_id,
        genero: req.body.genero,
        autor: req.body.autor,
        usuario: req.body.usuario,
        editorial: req.body.editorial,
        aptoTodoPublico: req.body.aptoTodoPublico,
        aceptaTerminos: req.body.aceptaTerminos,
        estado: req.body.estado,
        visitas: 0,
        visitas24Horas: 0,
    };
    const libro = new Libro(newLibro);
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
        const libros = await Libro.find()
            res.json(libros);
        }
    catch (error) {
        res.json({ message: error })
    }
}

export const getLibrosRegistrados: RequestHandler = async (req, res) => {
    try {
        const libros = await Libro.find({ estado: 'Registrado' })
        res.json(libros);
    } catch (error) {
        res.json({ message: error })
    }
}

export const getLibrosPublicados: RequestHandler = async (req, res) => {
    try {
            const libros = await Libro.find({ estado: 'Publicado' })
            res.json(libros);
        }
     catch (error) {
        res.json({ message: error })
    }
}

export const getLibrosPublicadosMenorEdad: RequestHandler = async (req, res) => {
    try {
        const libros = await Libro.find({ estado: 'Publicado', aptoTodoPublico: true})
        res.json(libros);
    } catch (error) {
        res.json({ message: error })
    }
}


export const getLibro: RequestHandler = async (req, res) => {
    const libroFound = await Libro.findById(req.params.id);
    if (!libroFound) return res.status(204).json();
    
    // //DESCARGA DEL LIBRO
    // const url2 = libroFound.archivoTexto;
    // 
    // https.get(url2, function (res) {
    //     //nombre del archivo
    //     const fileStream = fs.createWriteStream(`./revision/${libroFound.titulo}.pdf`);
    //     res.pipe(fileStream);
    //     fileStream.on('finish', function () {
    //         fileStream.close();
    //     }
    //     )
    // })
    // //Esperar a que el archivo se descargue
    // await new Promise(resolve => setTimeout(resolve, 2000));

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
    const busqueda = req.params.buscar;
    const valor = "\"" + `${busqueda}` + "\"";
    const libroFound = await Libro.find({ $text: { $search: valor, $caseSensitive: false, $diacriticSensitive: false }, estado: "Publicado" });
    if (!libroFound) return res.status(204).json();
    res.json(libroFound);
}

export const buscarLibroGenero: RequestHandler = async (req, res) => {
    const genero = req.params.genero;
    const libroFound = await Libro.find({ genero: genero, estado: "Publicado" });
    if (!libroFound) return res.status(204).json();
    res.json(libroFound);
}

//region VECTOR MALAS PALABRAS
const malasPalabras = [
    "mierda", "puta", "puto", "concha","tonto","tonta","pelotudo", "pelotuda", "boludo", "boluda", "idiota", "estupido", "estupida", "forro", "forra", "conchudo", "conchuda", "pajero", "pija", "ojete", "culo", "pete", "chota", "choto", "trolo", "tarado", "cago", "cagando", "cagon", "cagate", "bosta", "orto", "ortiva", "trola", "coger", "pajera", "mogolico", "mogolica", "subnormal", "chupala", "tragaleche", "petero", "petera", "cagar", "pingo", "mojon", "culiar", "culiado", "culiada", "culiau", "baboso", "babosa", "bobalicon", "capullo", "caraculo", "cretino", "deserebrado", "deserebrada", "donnadie", "huevon", "lameculos", "malparido", "patan", "pedorro", "pedorra", "zoquete", "hitler", "nazi"
]
//endregion

export const getLibroRevision: RequestHandler = async (req, res) => {
    const libroFound = await Libro.findById(req.params.id);
    if (!libroFound) return res.status(204).json(); 
    let sinMalasPalabras = false;
    const url = libroFound.archivoTexto;
    https.get(url, function (res) {
        //nombre del archivo
        const fileStream = fs.createWriteStream(`./revision/${libroFound.titulo}.pdf`);
        res.pipe(fileStream);
        fileStream.on('finish', function () {
            fileStream.close();
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
    if  (!sinMalasPalabras) {
        await Libro.findByIdAndUpdate(req.params.id, { aptoTodoPublico: false }, { new: true })
    }   

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
    const autorNombre = await Usuario.find({ "libros_publicados.id_libro": libroId }, { nombre: 1, apellido: 1, _id: 1, auth0_id: 1 });
    const respuesta = autorNombre[0];
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
    const autorLibros = await Usuario.findById(autorId).select("libros_publicados");
    if (!autorLibros) return res.status(204).json("No existen libros para este autor");
    //convertir el array de libros_publicados una array de id libros
    const librosId = autorLibros.libros_publicados.map((libro: any) => libro.id_libro);
    //convertir librosId en un vector de string 
    const libros = await Libro.find({ _id: { $in: librosId } });
    res.json(libros);
}

//Obtener Libros- Michael
export const obtenerLibros: RequestHandler = async (req, res) => {
    const libros = await Libro.find()
    if (!libros) return res.status(204).json("No existen libros");
    res.json(libros);
}

//Obtener Libros con Fecha Determinada- Michael
export const obtenerLibrosFecha: RequestHandler = async (req, res) => {
    const fechaDesdeArray = req.params.fechaDesde.split('/');       
    //FECHA DESDE
    let from_date = new Date()
    if (req.params.fechaHasta !== "sinHasta") {
        
        from_date = new Date(req.params.fechaDesde) //MM/DD/AAAA
    } else {
        from_date = new Date(`${fechaDesdeArray[0]}/01/${fechaDesdeArray[2]}`) //MM/DD/AAAA
    }
    from_date.setUTCHours(0, 0, 0, 0) //Establecemos desde las 00 hs


    //FECHA HASTA
    // SI (el mes es diciembre) ENTONCES el mes siguiente es Enero SINO el mes siguiente es "mes actual + 1"
    // SI (el mes es diciembre) ENTONCES el año del mes siguiente "Enero" es "año actual + 1" SINO el año del mes siguiente es "año actual"
    
    let to_date = new Date()
    if (req.params.fechaHasta !== "sinHasta") {
        
        to_date = new Date(req.params.fechaHasta)
        to_date.setUTCHours(23, 59, 59, 59)
    } else {
        to_date = new Date(`${parseInt(fechaDesdeArray[0]) == 12 ? "01" : parseInt(fechaDesdeArray[0]) + 1}/01/${parseInt(fechaDesdeArray[0]) == 12 ? parseInt(fechaDesdeArray[2]) + 1 : fechaDesdeArray[2]}`)
        to_date.setUTCHours(0, 0, 0, 0)
    }

    try {
        //toISOString() transforma al formato Date de MongoBD
        const librosFecha = await Libro.find({ createdAt: { $gte: from_date.toISOString(), $lte: to_date.toISOString() } })
        //res.json([librosFecha, from_date.toISOString(), to_date.toISOString()]) PARA VER COMO TOMA LAS FECHAS
        res.json(librosFecha)
    } catch (error) {
        res.json({ message: error })
    }
}
//buscar los 20 libros con mas favoritos y estado publicado
export const obtenerLibrosMasFavoritos: RequestHandler = async (req, res) => {
    const libros = await Libro.find({ estado: "Publicado" }).sort({ favoritos: -1 }).limit(20)
    if (!libros) return res.status(204).json("No existen libros");
    res.json(libros);
}

//METODOS AUTOMATICOS 
export const eliminarVisitas24Hr = async () => {
    await Libro.updateMany({}, { $unset: { visitas24Horas: 1 } })
}

export const obtenerRanking: RequestHandler = async (req, res) => {
    const libros = await Libro.find({}).sort({ ordenRanking: -1 }).limit(8)
    res.json(libros)
}

//VERSION DE PRUEBA
/* export const getLibros6indicadorSA: RequestHandler = async (req,res)=> {
    const libros = await Libro.find({}).sort({ indicadorAS: -1 }).limit(7)
    let vector;
    for (let i = 1; i < 7; i++) {
      await Libro.findByIdAndUpdate({ _id: libros[i]._id}, {ordenRanking: i }, { new: true })
    }
    res.json(libros[0].id)
} */

export const establecerRanking = async (numero: number) => {
    await Libro.updateMany({}, { $unset: { ordenRanking: 1 } })
    const libros = await Libro.find({ estado: "Publicado" }).sort({ indicadorAS: -1 }).limit(numero)
        for (let i = 0; i < numero; i++) {
            await Libro.findByIdAndUpdate({ _id: libros[i]._id }, { ordenRanking: (i + 1) }, { new: true })
        }
}

export const getLibroNarrador: RequestHandler = async (req, res) => {
    //DESCARGA DEL LIBRO
    const url2 = req.params.archivoTexto;
    https.get(url2, function (res) {
        //nombre del archivo
        const fileStream = fs.createWriteStream(`./revision/${req.params.titulo}.pdf`);
        res.pipe(fileStream);
        fileStream.on('finish', function () {
            fileStream.close();
        }
        )
    })
    //Esperar a que el archivo se descargue
    await new Promise(resolve => setTimeout(resolve, 2000));

    const array: any[] = []

    function render_page(pageData: any) {
        let render_options = {
            //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
            normalizeWhitespace: false,
            //do not attempt to combine same line TextItem's. The default value is `false`.
            disableCombineTextItems: false,
        }
      
        return pageData.getTextContent(render_options)
        .then(function(textContent: any) {
            let lastY, text = '';
            for (let item of textContent.items) {
                if (lastY == item.transform[5] || !lastY){
                    text += item.str;
                }  
                else{
                    text += '\n' + item.str;
                }    
                lastY = item.transform[5];
            }
            array.push(text)
            return text;
        })
    }
      
    let options = {
        pagerender: render_page,
    }


    if (fs.existsSync(`./revision/${req.params.titulo}.pdf`)) {

        //Me parece que con libroFound.archivoTexto nos ahorramos este paso...
        const pdfFile = await fs.readFile(`./revision/${req.params.titulo}.pdf`);

        PdfParse(pdfFile, options).then(function (data) {
            let dataText = data.text;
            //Separo en palabras el texto del pdf
            let arrayData = data.text.split(/\t|\n|\s/);

            let arrayText = arrayData.join(' ')

            const arrayLimpio: any[] = []
            array.forEach(function (elemento, indice, array) {
                
                //Separo en palabras el texto del pdf
                let arrayData = elemento.split(/\t|\n|\s/);

                let arrayText = arrayData.join(' ')
                arrayLimpio.push(arrayText);
            });

            fs.unlink(`./revision/${req.params.titulo}.pdf`, (err => {
                if (err) console.log(err);
                else {
                    console.log(`Archivo eliminado: ${req.params.titulo}.pdf`);
                }
            }));

            return res.json({
                dataText,
                arrayData,
                arrayText,
                array,
                arrayLimpio
            })

        });
    }
}
