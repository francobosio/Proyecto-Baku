import { RequestHandler } from "express";
import config from '../config'
import fs from 'fs-extra'
import Usuario from "./Usuario";

export const createUsuario: RequestHandler = async (req, res) => {
    const { auth0_id, apellido, nombre, correo_electronico } = req.body;

    const newUsuario = {
        auth0_id,
        apellido,
        nombre,
        correo_electronico
    };

    const usuario = new Usuario(newUsuario);
    console.log(usuario);
    await usuario.save();
    return res.json({
        usuario
    });
}

export const getUsuario: RequestHandler = async (req, res) => {
    const auth0id = req.params.auth0id
    const queryUsuario = { auth0_id: auth0id }
    const usuarioFound = await Usuario.findOne(queryUsuario).exec();
    if (!usuarioFound) {
        return res.json(null);
    }
    return res.json(usuarioFound);
}

export const putLibroPublicado: RequestHandler = async (req, res) => {
    const { auth0id, idLibro } = req.body;
    const queryUsuario = { auth0_id: auth0id }

    const usuario = await Usuario.findOne(queryUsuario).exec();
    usuario?.libros_publicados.push({ id_libro: idLibro });
    await usuario?.save();
    console.log("Modificado con éxito");
    console.log(usuario)
    return res.json({
        message: "Usuario modificado con éxito !!!"
    });
}

export const putLibroLeido: RequestHandler = async (req, res) => {
    const { auth0id, idLibro, ultimaPaginaLeida } = req.body;
    const queryUsuario = { auth0_id: auth0id };
    const queryLibro = { id_libro: idLibro };

    const usuario = await Usuario.findOne(queryUsuario).exec();
    const libros_leidos = usuario?.libros_leidos;

    
    usuario?.libros_leidos.push({ id_libro: idLibro, ultima_pagina: ultimaPaginaLeida });
    await usuario?.save();
    console.log("Modificado con éxito");
    console.log(usuario)
    return res.json({
        message: "Usuario modificado con éxito !!!"
    });
}