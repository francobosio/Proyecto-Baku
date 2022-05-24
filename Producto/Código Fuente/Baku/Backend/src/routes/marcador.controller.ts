import { RequestHandler } from "express";
import Marcador from "./Marcador";

export const createMarcador: RequestHandler = async (req, res) => {
    const {usuario,libro,HighlightArea,content,quote,startPageIndex,startOffset,startDivIndex,endPageIndex,endOffset,endDivIndex} = req.body;
    const newMarcador = { usuario,libro,HighlightArea,content,quote,startPageIndex,startOffset,startDivIndex,endPageIndex,endOffset,endDivIndex };
    const marcador = new Marcador(newMarcador);
    console.log(newMarcador);
    await marcador.save();
    return res.json({
        marcador
    });
}

export const getMarcador: RequestHandler = async (req, res) => {
    const respuestaBD = await Marcador.find().exec();
    return res.json(respuestaBD);
}

