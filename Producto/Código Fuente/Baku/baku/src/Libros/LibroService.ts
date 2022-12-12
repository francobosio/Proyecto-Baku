import axios from 'axios';
const backend = process.env.REACT_APP_BACKEND_URL;

export const getLibros = async () => {
    return await axios.get(`${backend}/libros`);
}

export const deleteLibro = async (id: string) => {
    return await axios.post(`${backend}/libros/eliminar`, { id });
}

const config = {
    headers: { "content-type": "multipart/form-data" }
}
export const createLibro = async (formData: FormData) => {
    return await axios.post(`${backend}/libros`, formData, config);
}

export const getLibro = async (id: String) => {
    return await axios.get(`${backend}/libro/${id}`)
}

export const buscarLibro = async (buscar: string) => {
    return await axios.get(`${backend}/libros/buscar/${buscar}`)
}

export const buscarLibroGenero = async (buscar: string) => {
    return await axios.get(`${backend}/libros/buscar/genero/${buscar}`)
}

export const getLibroRegistrado = async () => {
    return await axios.get(`${backend}/librosRegistrados`)
}

export const getLibroRevisar = async (id: String) => {
    return await axios.get(`${backend}/libro/revision/${id}`)
}

export const getLibrosPublicado = async (id: String) => {
    return await axios.get(`${backend}/librosPublicados`)
}

export const getLibrosMenorEdad = async (id: String) => {
    return await axios.get(`${backend}/librosPublicados/menorEdad`)
}
//los parametros id y estado se envian en el body del put
export const putCambiarEstado = async (id: String, estado: string) => {
    return await axios.put(`${backend}/libro/cambiarEstado`, { id, estado })
}

export const buscarAutorLibro = async (libroId: string) => {
    return await axios.get(`${backend}/autor/${libroId}`)
}

export const buscarLibros = async (id: string) => {
    return await axios.get(`${backend}/autor/libros/${id}`)
}

export const obtenerLibros = async () => {
    return await axios.get(`${backend}/libros`)
}

export const obtenerLibrosFecha = async (fechaDesde: String, fechaHasta: String) => {
    return await axios.get(`${backend}/librosFecha/${fechaDesde}/${fechaHasta}`)
}

export const obtenerLibrosFavoritos = async (id: String) => {
    return await axios.get(`${backend}/librosFavoritos`)
}

export const obtenerRanking = async () => {
    return await axios.get(`${backend}/libros/ranking`)
}

export const getLibroNarrador = async (archivoTexto: String, currentPage: Number, titulo: String) => {
    return await axios.get(`${backend}/libro/narrador/${archivoTexto}/${currentPage}/${titulo}`)
}

export const putEnviarRechazo = async (from: String, to: String, subject: String, mensajeCuerpo: String, arrayPalabras : []) => {
    return await axios.put(`${backend}/libro/enviarRechazo`, { from, to, subject, mensajeCuerpo, arrayPalabras })
}

