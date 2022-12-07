import { RequestHandler } from "express";
import config from '../config'
import fs from 'fs-extra'
import mongoose from 'mongoose';
import TipoUsuario from "./TipoUsuario";

export const createTipoUsuario: RequestHandler = async (req, res) => {
    const {nombre} = req.body;
    //traer el ultimo id de la tabla tipoUsuario
    const tipoUsuarioUltimo = await TipoUsuario.findOne({}, {}, { sort: { 'id': -1 } })
    if (tipoUsuarioUltimo) {
        const tipoUsuario = {
            id: `${Number(tipoUsuarioUltimo.id) + 1}`,
            nombre: nombre,
        }
        const tipoUsuarioNuevo = new TipoUsuario(tipoUsuario)
        await tipoUsuarioNuevo.save()
        return res.json({
            tipoUsuarioNuevo
        });
    }
}

//obtener todos los tipos de usuario de la base de datos
export const getTipoUsuarios: RequestHandler = async (req, res) => {
    const tipoUsuarios = await TipoUsuario.find().exec();
    return res.json(tipoUsuarios);
}

//eliminar un tipo de usuario de la base de datos
export const eliminarTipoUsuario: RequestHandler = async (req, res) => {
    const {id} = req.body;
    const tipoUsuarioEliminado = await TipoUsuario.findByIdAndDelete(id);
    return res.json(tipoUsuarioEliminado);
}
