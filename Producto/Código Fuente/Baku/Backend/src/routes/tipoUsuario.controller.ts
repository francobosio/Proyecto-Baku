import { RequestHandler } from "express";
import config from '../config'
import fs from 'fs-extra'
import TipoUsuario from "./TipoUsuario";

export const createTipoUsuario: RequestHandler = async (req, res) => {
    const { id, nombre } = req.body
    const newTipoUsuario = {  id, nombre,};
    const tipoUsuario = new TipoUsuario(newTipoUsuario);
    console.log(tipoUsuario);
    await tipoUsuario.save();
    return res.json({
        tipoUsuario
    });
}

//obtener todos los tipos de usuario de la base de datos
export const getTipoUsuarios: RequestHandler = async (req, res) => {
    const tipoUsuarios = await TipoUsuario.find().exec();
    return res.json(tipoUsuarios);
}
