import axios from 'axios';
import {Libro} from './Libro'

export const getLibros = async () => {
    return await axios.get('http://localhost:4000/libros')
}

const config = {     
    headers: { "content-type": "multipart/form-data" }
}
export const createLibro = async (formData: FormData) =>{
    return await axios.post('http://localhost:4000/libros',formData, config)
}
