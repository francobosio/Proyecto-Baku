import axios from 'axios';
const backend = process.env.REACT_APP_BACKEND_URL;

export const getTipoUsuario = async () => {
    return await axios.get(`${backend}/tipoUsuarios`);
}

export const nuevoTipoUsuario = async (nombre: String) => {
    return await axios.post(`${backend}/tipoUsuariosNuevo`,{nombre});
}   

export const eliminarTipoUsuario = async (id: string) => {
    return await axios.put(`${backend}/tipoUsuarios/eliminar`,{id})
}
