import axios from 'axios';

export const putEnviarDenuncia = async (from: String, to: String, subject: String, mensajeCuerpo: String, concepto: String, autorAuth0: String, libroId: String) => {
    return await axios.put('http://localhost:4000/denuncia/enviar', { from, to, subject, mensajeCuerpo, concepto, autorAuth0, libroId });
}
//guardar la denuncia en la base de datos
export const postGuardarDenuncia = async (from: String, to: String, subject: String, mensajeCuerpo: String, concepto: String, autorAuth0: String, libroId: String) => {
    return await axios.post('http://localhost:4000/denuncia/guardar', { from, to, subject, mensajeCuerpo, concepto, autorAuth0, libroId });
}

export const putContadorDenuncias = async (auth0_id: String) => {
    return await axios.put('http://localhost:4000/denuncia/contadorxUsuario', { auth0_id });
}
 
export const putContadorDenunciasxLibro = async (libroId: String) => {
    return await axios.put('http://localhost:4000/denuncia/contadorxlibro', { libroId });
}

export const getDenunciasxAutorxlibro = async () => {
    return await axios.get('http://localhost:4000/denuncia/obtenerCompleto');
}

