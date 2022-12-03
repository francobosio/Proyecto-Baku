import axios from 'axios';
const backend = process.env.REACT_APP_BACKEND_URL;

//Para guardar se hace un "post"
export const guardarNota= async (content: String ,highlightAreas: {},quote: String,usuario: String, id_libro: String) => {
    return await axios.post(`${backend}/guardarNota`, { content, highlightAreas, quote ,usuario, id_libro});
}

export const obtenerNotaPorUsuarioLibro = async (idUsuarioActual: String,idLibroALeer: String) => {
    return await axios.get(`${backend}/obtenerNotas/${idUsuarioActual}/${idLibroALeer}`)
}

export const eliminarNota = async (_id: string) => { //despues ver si está bien
    return await axios.delete(`${backend}/eliminarNota/${_id}`)
}