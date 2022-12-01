import axios from "axios";
const backend = process.env.REACT_APP_BACKEND_URL;

export const createNotificacion = async (nuevaNotificacion: {}) => {
    return await axios.post(`${backend}/notificacion`, nuevaNotificacion)
}

export const buscarNotificacionUsuarioAuth0 = async (idAuthUsuario: String) => {
        return await axios.get(`${backend}/notificacion/${idAuthUsuario}`)
}

export const marcarTodasComoLeidas = async (usuarioActual: String) => {
    return await axios.put(`${backend}/notificacion/marcarTodasComoLeidas`, { usuarioActual })
}

export const notificacionLeida = async (usuario_id: String, notificacion_id: String) => {
    return await axios.put(`${backend}/notificacion/marcarComoLeida`, { usuario_id, notificacion_id })
}


