import axios from "axios";
const backend = process.env.REACT_APP_BACKEND_URL;

export const getUsuario = async (auth0id: String) => {
    const usuario = await axios.get(`${backend}/usuarios/${auth0id}`)
    console.log(usuario.data)
    return usuario
}

export const getUsuariosPorId = async (id: String) => {
    return await axios.get(`${backend}/usuarios2/${id}`)
}

export const createUsuario = async (usuarioData: {}) => {
    return await axios.post(`${backend}/usuarios/`, usuarioData)
}

export const putCambiarEstadoUsuario = async (auth0_id: String, estadoUsuario: string) => {
    return await axios.put(`${backend}/usuarios/cambiarEstadoUsuario`, { auth0_id, estadoUsuario})
}

export const usuarioLibroCargado = async (usuarioLibroData: {}) => {
    return await axios.put(`${backend}/usuarios/libroSubido/`, usuarioLibroData)
}

export const usuarioLibroLeido = async (usuarioLibroLeidoData: {}) => {
    return await axios.put(`${backend}/usuarios/libroLeido/`, usuarioLibroLeidoData)
}

export const usuarioUltimaPagina = async (auth0id: String, idLibro: String) => {
    return await axios.get(`${backend}/usuario/ultimaPagina/${auth0id}/${idLibro}`)
}

export const obtenerTodosUsuarios = async () => {
    return await axios.get(`${backend}/usuarios`)
}
//modificar el tipo de usuario de un usuario
export const asignarTipoUsuario = async (id: String, tipoUsuario: String) => {
    return await axios.put(`${backend}/usuarios/modificarTipo`, { id, tipoUsuario })
}

export const suscribirUsuario = async (usuario_id: String, autor2: String) => {
    return await axios.put(`${backend}/usuarios/suscribir`, { usuario_id, autor2 })
}

export const desuscribirUsuario = async (usuario_id: String, autor: String) => {
    return await axios.put(`${backend}/usuarios/desuscribir`, { usuario_id, autor })
}

export const buscarNombreSuscripcion = async (usuario_id: String, autor: String) => {
    return await axios.get(`${backend}/usuarios/buscarNombreSuscripcion/${usuario_id}/${autor}`)
}

export const modificarUsuario = async (usuarioData: {}) => {
    return await axios.put(`${backend}/usuarios/modificarUsuario`, usuarioData)
}

export const eliminarUsuario = async (id: string, flagData: boolean, _callback: any) => {
    return await axios.delete(`${backend}/usuarios/${id}/${flagData}`).then(() => { _callback() })
}

export const getLibrosLeidosPorUsuario = async () => {
    return await axios.get(`${backend}/usuarios_librosLeidos`)
}

export const getLeidosPorUsuario = async () => {
    return await axios.get(`${backend}/usuarios_todosLibrosLeidos`)
}

export const obtenerFavoritos = async (usuarioAuth0: String) => {
    return await axios.put(`${backend}/usuarios/favoritos`, { usuarioAuth0 })
}

export const agregarFavorito = async (usuarioAuth0: String, idLibro: String) => {
    return await axios.put(`${backend}/usuarios/agregarFavorito`, { usuarioAuth0, idLibro })
}

export const eliminarFavorito = async (usuarioAuth0: String, idLibro: String) => {
    return await axios.put(`${backend}/usuarios/eliminarFavorito`, { usuarioAuth0, idLibro })
}

export const obtenerSuscripciones = async (usuarioAuth0: String) => {
    return await axios.get(`${backend}/usuarios/suscripciones/${usuarioAuth0}`)
}

export const obtenerUsuariosSuscriptos = async (usuarioAuth0: String) => {
    return await axios.put(`${backend}/usuarios/suscriptos`,{usuarioAuth0})
}
