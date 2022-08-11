import { AttachEmailTwoTone } from "@mui/icons-material";
import axios from "axios";
import { Usuario } from "./Usuario";

export const getUsuario = async (id: String) => {
    const usuario = await axios.get('http://localhost:4000/usuarios/' + id)
    return usuario
}

export const createUsuario = async (usuarioData: {}) => {
    
    return await axios.post('http://localhost:4000/usuarios/', usuarioData)
}

export const usuarioLibroCargado = async (usuarioLibroData: {}) => {
    return await axios.put('http://localhost:4000/usuarios/libroSubido/', usuarioLibroData)
}

export const usuarioLibroLeido = async (usuarioLibroLeidoData: {}) => {
    return await axios.put('http://localhost:4000/usuarios/libroLeido/', usuarioLibroLeidoData)
}

export const usuarioUltimaPagina = async (auth0id: String, idLibro: String) => {
    return await axios.get("http://localhost:4000/usuario/ultimaPagina/" + auth0id + "/" + idLibro)
}

export const obtenerTodosUsuarios = async () => {
    return await axios.get('http://localhost:4000/usuarios')
}
//modificar el tipo de usuario de un usuario
export const asignarTipoUsuario = async (id: String, tipoUsuario: String) => {
    return await axios.put('http://localhost:4000/usuarios/modificarTipo', { id, tipoUsuario })
}

export const suscribirUsuario = async (usuario_id: String, autor2: String) => {
    return await axios.put('http://localhost:4000/usuarios/suscribir', { usuario_id, autor2 })
}

export const desuscribirUsuario = async (usuario_id: String, autor: String) => {
    return await axios.put('http://localhost:4000/usuarios/desuscribir', { usuario_id, autor })
}

export const buscarNombreSuscripcion = async (usuario_id: String, autor: String) => {
    return await axios.get('http://localhost:4000/usuarios/buscarNombreSuscripcion/' + usuario_id + '/' + autor)
}

export const modificarUsuario = async (usuarioData: {}) => {
    return await axios.put('http://localhost:4000/usuarios/modificarUsuario', usuarioData)
}

export const eliminarUsuario = async (id: string, flagData: boolean, _callback: any) => {
    return await axios.delete('http://localhost:4000/usuarios/' + id + '/' + flagData).then(() => {_callback()})
}

export const getLibrosLeidosPorUsuario = async () => {
    return await axios.get('http://localhost:4000/usuarios_librosLeidos')
}

export const getLeidosPorUsuario = async () => {
    return await axios.get('http://localhost:4000/usuarios_todosLibrosLeidos')
}

export const obtenerFavoritos = async (usuarioAuth0: String) => {
    return await axios.put('http://localhost:4000/usuarios/favoritos', { usuarioAuth0 })
}

export const agregarFavorito = async (usuarioAuth0: String, idLibro: String) => {
    return await axios.put('http://localhost:4000/usuarios/agregarFavorito', { usuarioAuth0, idLibro})
}

export const eliminarFavorito = async (usuarioAuth0: String, idLibro: String) => {
    return await axios.put('http://localhost:4000/usuarios/eliminarFavorito', { usuarioAuth0, idLibro})
}


