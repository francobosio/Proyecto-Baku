import axios from 'axios';

//Para guardar se hace un "post"
export const guardarNota= async (content: String ,highlightAreas: {},quote: String,usuario: String, id_libro: String) => {
    return await axios.post('http://localhost:4000/guardarNota', { content, highlightAreas, quote ,usuario, id_libro});
}

export const obtenerNotaPorUsuarioLibro = async (idUsuarioActual: String,idLibroALeer: String) => {
    return await axios.get('http://localhost:4000/obtenerNotas/'+idUsuarioActual+'/'+idLibroALeer)
}

export const eliminarNota = async (_id: string) => { //despues ver si está bien
    return await axios.delete('http://localhost:4000/eliminarNota/' + _id)
}