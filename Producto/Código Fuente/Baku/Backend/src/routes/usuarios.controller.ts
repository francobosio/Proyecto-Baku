import { RequestHandler } from "express";
import Usuario from "./Usuario";
import Libro from "./Libro";

/* Método para la creación de un nuevo usuario. Recibe un Json en el campo req y devuelve el usaurio creado en el campo res */
export const createUsuario: RequestHandler = async (req, res) => {
    const { auth0_id, apellido, nombre, correo_electronico, avatar } = req.body;

    const newUsuario = {
        auth0_id,
        apellido,
        nombre,
        correo_electronico,
        tipoUsuario: "1",
        estado: "Activo",
        avatar,
    };

    const usuario = new Usuario(newUsuario);
    console.log(usuario);
    await usuario.save();
    return res.json({
        usuario
    });
}

/* Método para la búsqueda de un usuario, recibe el id de auth0 en el campo req y devuelve el usaurio encontrado en el campo res  */
export const getUsuario: RequestHandler = async (req, res) => {
    const auth0id = req.params.auth0id
    const queryUsuario = { auth0_id: auth0id }
    const usuarioFound = await Usuario.findOne(queryUsuario).exec();
    if (!usuarioFound) {
        return res.json(null);
    }
    return res.json(usuarioFound);
}

/* Obtiene la última página de un libro leido por un usuario o la página 0 si es la primera vez que lo lee. Recibe el id de auth0 del usaurio y el id del libro en el campo req 
y devuelve la ultima página encontrada o 0 en el campo res */
export const getUltimaPagina: RequestHandler = async (req, res) => {
    const auth0id = req.params.auth0id;
    const idLibro = req.params.idLibro;
    const queryUsuario = { auth0_id: auth0id }
    const usuario = await Usuario.findOne(queryUsuario).exec();
    if (usuario != undefined) {
        const libros_leidos = usuario.libros_leidos;

        // Busca en la lista el libro cuyo que coincida con el id pasado por parametro. Si no encuentra nada devuelve -1.
        const index = libros_leidos.findIndex(x => x.id_libro === idLibro);

        let ultimaPagina = 0;
        if (index > -1) {
            ultimaPagina = libros_leidos[index].ultima_pagina;
        }
        return res.json(ultimaPagina);
    } else {
        console.log(usuario)
        return res.json({
            message: "El usuario no existe"
        });
    }
}

/* Carga en la lista de libros publicados del usuario un nuevo libro. Recibe por parametro el id de autho del usuario y el id del libro */
export const putLibroPublicado: RequestHandler = async (req, res) => {
    const { auth0id, idLibro } = req.body;
    const queryUsuario = { auth0_id: auth0id }

    const usuario = await Usuario.findOne(queryUsuario).exec();
    usuario?.libros_publicados.push({ id_libro: idLibro });
    await usuario?.save();
    return res.json({
        message: "Usuario modificado con éxito !!!"
    });
}

/* agrega un libro leido a la lista del usuario, ademas guarda la ultima pagina leida de dicho libro
recibe por parametro en req el id de auth0 del usuario, el id del libro y la ultima pagina leida. Luego los agrega a la lista del usuario */
export const putLibroLeido: RequestHandler = async (req, res) => {
    let { auth0id, idLibro, ultimaPaginaLeida, finLectura } = req.body;
    const queryUsuario = { auth0_id: auth0id };

    let usuario = await Usuario.findOne(queryUsuario).exec();

    if (usuario != undefined) {
        const libros_leidos = usuario.libros_leidos;
        // Busca en la lista el libro cuyo que coincida con el id pasado por parametro. Si no encuentra nada devuelve -1.
        const index = libros_leidos.findIndex(x => x.id_libro === idLibro);

        // Si es el fin de la lectura elimina el libro para actualizar la lista
        if (finLectura){
            libros_leidos.splice(index, 1);
        } else {
            if (index > -1) 
            {
                // Si encuentra el libro ya existe y no es el fin de lectura saca la ultima pagina leida y borra el item de la lista
                ultimaPaginaLeida = usuario.libros_leidos[index].ultima_pagina;
                libros_leidos.splice(index, 1);
            } else {
                // si el libro no existe aun setea la ultima pagina en 0
                ultimaPaginaLeida = 0;
            }
        }
        
        // Creo un item que contiene id del libro y la ultima pagina leida y lo agrego al final de la lista

        const libroLeido = {
            id_libro: idLibro,
            ultima_pagina: ultimaPaginaLeida
        }
        usuario.libros_leidos.push(libroLeido);

        await usuario.save();
        return res.json({
            message: "Usuario modificado con éxito !!!"
        });
    }
    return res.json({
        message: "Usuario no existe"
    });
}

//obtener todos los usuarios de la base de datos y devolverlos en un json con el formato de la base de datos de mongo db 
export const getUsuarios: RequestHandler = async (req, res) => {
    //usar $lookup para unir a usuario y tipoUsuario para obtener el tipo de usuario de cada usuario excluir los campos libros_leidos y libros_publicados
    const usuarios = await Usuario.aggregate([
        {
            $lookup: {
                from: "tipousuarios",
                localField: "tipoUsuario",
                foreignField: "id",
                as: "tipoUsuario"
            }
        },
        {
            $project: {
                libros_leidos: 0,
                libros_publicados: 0,
                correo_electronico: 0,
                createdAt: 0,
                updatedAt: 0,
                tipoUsuario: {
                    _id: 0,
                    createdAt: 0,
                    updatedAt: 0,
                }
            }
        }
    ]);
    return res.json(usuarios);
}

//modificar el tipo de usuario de un usuario en especifico
export const putTipoUsuario: RequestHandler = async (req, res) => {
    const { id, tipoUsuario } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, { tipoUsuario }, { new: true })
    //si el usuariio no existe devolver un mensaje de error en json
    if (!usuario) {
        return res.json({
            message: "Usuario no existe"
        });
    }
    return res.json({
        message: "Usuario modificado con éxito !!!",
        usuario
    });
}

export const putUsuario: RequestHandler = async (req, res) => {
    let { id, apellido, nombre, fecha_nacimiento } = req.body;
    fecha_nacimiento = fecha_nacimiento != undefined ? fecha_nacimiento : null;
    console.log({ id, apellido, nombre, fecha_nacimiento })
    const usuario = await Usuario.findByIdAndUpdate(id, {apellido, nombre, fecha_nacimiento}, {new: true})

    if (!usuario) {
        return res.json({
            message: "Usuario no existe"
        });
    }
    return res.json({
        message: "Usuario modificado con éxito !!!",
        usuario
    });
}

export const deleteUsuario: RequestHandler = async (req, res) => {
    let id = req.params.userId;
    let flagLibro = req.params.flagData;
    let queryBaku = {'auth0_id' : "google-oauth2|112174430754594254481"}

    if (id) {
        const user = await Usuario.findById(id);
        if (flagLibro === 'true')
        {
            const baku = await Usuario.findOne(queryBaku).exec()

            if (baku && user) {
                const aux = baku.libros_publicados.concat(user.libros_publicados);
                await Usuario.updateOne({auth0_id: "google-oauth2|112174430754594254481"},{libros_publicados: aux})
            } 
        } 
        else {
            user?.libros_publicados.forEach(async element => {
                await Libro.findByIdAndDelete(element.id_libro)
            });
        }
        await Usuario.findByIdAndDelete(id);
        return res.json({
            message: "Usuario Eliminado"
        });
    } else {
        return res.json ({
            message: "No se encontro el usuario indicado"
        })
    }
}

export const putSuscribir: RequestHandler = async (req, res) => {
    const { usuario_id, autor2 } = req.body;
    const usuario = await Usuario.findById(autor2).exec();
    if (usuario != undefined) {
        usuario.suscriptores.push({usuario_id: usuario_id});
        await usuario.save();
        console.log("Suscripto con éxito");
        return res.json({
            message: "Usuario suscripto con éxito !!!"
        });
    }
    res.json({message: "Fallo al suscribir"});
}

export const putDesuscribir: RequestHandler = async (req, res) => {
    const { usuario_id, autor } = req.body;
    const usuario = await Usuario.findById(autor).exec();
    if (usuario != undefined) {
        const index = usuario.suscriptores.findIndex(x => x === usuario_id);
        usuario.suscriptores.splice(index, 1);
        await usuario.save();
        console.log("Desuscrito con éxito");
        return res.json({
            message: "Usuario desuscrito con éxito !!!"
        });
    }
}

export const buscarNombreSuscripcion: RequestHandler = async (req, res) => {
    const usuario_id= req.params.usuario_id;
    const autor = req.params.autor;
    const usuario = await Usuario.findById(autor).exec();
    if (usuario != undefined) {
        const estaSuscripto = usuario.suscriptores.map(x => x.usuario_id).includes(usuario_id);
        console.log(estaSuscripto)
        return res.json({
            estaSuscripto
        });
    }
}

export const bloquearUsuario: RequestHandler = async (req, res) => {
    const { auth0_id } = req.body;
    //buscar por el campo auth0_id y actualizar el campo bloqueado
    const usuario = await Usuario.findOneAndUpdate({auth0_id: auth0_id}, {estado: "Suspendido"}, {new: true}).exec();
    if (usuario != undefined) {
        return res.json({
            message: "Usuario bloqueado con éxito !!!"
        });
    }
    return res.json({
        message: "Usuario no encontrado"
    });
}

