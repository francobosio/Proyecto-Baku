//A este componente SOLO LO LLAMA """MARCADOR.ROUTER.TS"""
import { RequestHandler } from "express";
import Marcador from "./Marcador";

//PARA QUE SE USA ESTE CREATE? QUIEN LO LLAMA? 
export const createMarcador: RequestHandler = async (req, res) => {
    const {usuario,libro,HighlightArea,content,quote,startPageIndex,startOffset,startDivIndex,endPageIndex,endOffset,endDivIndex} = req.body;
    const newMarcador = { usuario,libro,HighlightArea,content,quote,startPageIndex,startOffset,startDivIndex,endPageIndex,endOffset,endDivIndex };
    const marcador = new Marcador(newMarcador);
    await marcador.save();
    return res.json({
        marcador
    });
}
//PARA QUE SE USA ESTE GET? QUIEN LO LLAMA? LO llama el marcador.router
export const getMarcador: RequestHandler = async (req, res) => {
    const respuestaBD = await Marcador.find().exec();
    return res.json(respuestaBD);
}
//GUARDAR NOTA
export const guardarNota: RequestHandler = async (req, res) => { //Un RequestHandler es una función que se ejecutará cada vez que el servidor reciba una solicitud en particular, generalmente definida por el método HTTP. Acepta dos parámetros request y response (petición y respuesta)
    const {usuario,id_libro, highlightAreas,content,quote} = req.body; //donde saca el req.body? y qué cosa es?
    const newMarcador = { usuario,id_libro,highlightAreas,content,quote }; //Crea el OBJETO MARCADOR
    const marcador = new Marcador(newMarcador);
    await marcador.save(); //y lo GUARDA
    return res.json({
        marcador
    });
}

export const obtenerNotaPorUsuarioLibro: RequestHandler = async (req,res) =>{
    const idUsuarioActual = req.params.idUsuarioActual;
    const idLibroALeer = req.params.idLibroALeer;
   const respuesta = await Marcador.find({usuario:idUsuarioActual,id_libro:idLibroALeer })
    return  res.json({respuesta})
}

export const deleteNota: RequestHandler = async (req, res) => {
    let id = req.params._id;

    if (id) {
        await Marcador.findByIdAndDelete(id);
        return res.json({
            message: "Marcador Eliminado"
        });
    } else {
        return res.json ({
            message: "No se encontró el marcador indicado"
        })
    }
}


