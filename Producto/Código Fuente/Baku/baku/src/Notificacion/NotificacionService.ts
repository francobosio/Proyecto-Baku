import axios from "axios";


export const createNotificacion = async (nuevaNotificacion: {}) => {
    return await axios.post('http://localhost:4000/notificacion', nuevaNotificacion)
}

export const buscarNotificacionUsuarioAuth0 = async (idAuthUsuario: String) => {
        return await axios.get('http://localhost:4000/notificacion/' + idAuthUsuario)
}

export const marcarTodasComoLeidas = async (usuarioActual: String) => {
    return await axios.put('http://localhost:4000/notificacion/marcarTodasComoLeidas', { usuarioActual })
}

export const notificacionLeida = async (usuario_id: String, notificacion_id: String) => {
    return await axios.put('http://localhost:4000/notificacion/marcarComoLeida', { usuario_id, notificacion_id })
}


