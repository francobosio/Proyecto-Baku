import axios from "axios";
import { Usuario } from "./Usuario";

export const getUsuario = async (id: String) => {
    const usuario = await axios.get('http://localhost:4000/usuarios/' + id)

    console.log(usuario)
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
