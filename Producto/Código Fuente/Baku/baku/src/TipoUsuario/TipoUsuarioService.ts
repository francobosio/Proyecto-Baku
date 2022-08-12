import axios from 'axios';

export const getTipoUsuario = async () => {
    return await axios.get('http://localhost:4000/tipoUsuarios');
}

export const nuevoTipoUsuario = async (nombre: String) => {
    return await axios.post('http://localhost:4000/tipoUsuariosNuevo',{nombre});
}   

export const eliminarTipoUsuario = async (id: string) => {
    return await axios.put('http://localhost:4000/tipoUsuarios/eliminar',{id})
}
