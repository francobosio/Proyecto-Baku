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

export const getUltimaPagina: RequestHandler = async (req, res) => {
    const auth0id = req.params.auth0id;
    const idLibro = req.params.idLibro;
    const queryUsuario = { auth0_id: auth0id }
    const usuario = await Usuario.findOne(queryUsuario).exec();
    if (usuario != undefined) {
        const libros_leidos = usuario.libros_leidos;
        const index = libros_leidos.findIndex(x => x.id_libro === idLibro);
    
        let ultimaPagina = 0;
        if (index > -1) {
            ultimaPagina = libros_leidos[index].ultima_pagina;
        }
    
        console.log("pagina encontrada");
        console.log(ultimaPagina)
        return res.json(ultimaPagina);
    } else {
        console.log(usuario)
        return res.json({
            message: "Usuario no existe"
        });
    }
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
    let { auth0id, idLibro, ultimaPaginaLeida, finLectura } = req.body;
    const queryUsuario = { auth0_id: auth0id };

    let usuario = await Usuario.findOne(queryUsuario).exec();

    if (usuario != undefined) {
        const libros_leidos = usuario.libros_leidos;
        const index = libros_leidos.findIndex(x => x.id_libro === idLibro);

        if (finLectura){
            libros_leidos.splice(index, 1);
        } else {
            if (index > -1) 
            {
                ultimaPaginaLeida = usuario.libros_leidos[index].ultima_pagina;
                libros_leidos.splice(index, 1);
            } else {
                ultimaPaginaLeida = 0;
            }
        }
        
        const libroLeido = {
            id_libro: idLibro,
            ultima_pagina: ultimaPaginaLeida
        }
        usuario.libros_leidos.push(libroLeido);

        await usuario.save();

        console.log("Modificado con éxito");
        console.log(usuario)
        return res.json({
            message: "Usuario modificado con éxito !!!"
        });
    }
    console.log(usuario)
    return res.json({
        message: "Usuario no existe"
    });
}


