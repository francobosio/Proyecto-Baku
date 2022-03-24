import axios from 'axios';

export const getLibros = async () => {
    return await axios.get('http://localhost:4000/libros');
}

const config = {     
    headers: { "content-type": "multipart/form-data" }
}
export const createLibro = async (formData: FormData) =>{
    return await axios.post('http://localhost:4000/libros',formData, config);
}

export const getLibro = async (id: String) => {
    return await axios.get("http://localhost:4000/libro/" + id)
}

export const buscarLibro = async (buscar: string) =>{
    console.log(buscar);
    return await axios.get(`http://localhost:4000/libros/buscar/${buscar}`)
}

export const buscarLibroGenero = async (buscar: string) =>{
    return await axios.get(`http://localhost:4000/libros/buscar/genero/${buscar}`)
}

export const getLibroRegistrado = async () => {
    return await axios.get("http://localhost:4000/librosRegistrados" )
}

export const getLibroRevisar = async (id: String) => {
    return await axios.get(`http://localhost:4000/libro/revision/${id}`)
}
//los parametros id y estado se envian en el body del put 
export const putCambiarEstado = async (id: String,estado: string ) => {
    return await axios.put(`http://localhost:4000/libro/cambiarEstado`,{id,estado})
}