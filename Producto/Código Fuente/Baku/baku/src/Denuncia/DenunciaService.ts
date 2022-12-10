import axios from 'axios';
const backend = process.env.REACT_APP_BACKEND_URL;

export const putEnviarDenuncia = async (from: String, to: String, subject: String, mensajeCuerpo: String, concepto: String, autorAuth0: String, libroId: String) => {
    return await axios.put( `${backend}/denuncia/enviar`, { from, to, subject, mensajeCuerpo, concepto, autorAuth0, libroId });
}
//guardar la denuncia en la base de datos
export const postGuardarDenuncia = async (from: String, to: String, subject: String, mensajeCuerpo: String, concepto: String, autorAuth0: String, libroId: String,reclamosxUsuario:Number,reclamosxLibro:Number,reclamador: String) => {
    return await axios.post(`${backend}/denuncia/guardar`, { from, to, subject, mensajeCuerpo, concepto, autorAuth0, libroId,reclamosxUsuario,reclamosxLibro,reclamador });
}

export const putContadorDenuncias = async (auth0_id: String) => {
    return await axios.put(`${backend}/denuncia/contadorxUsuario`, { auth0_id });
}
 
export const putContadorDenunciasxLibro = async (libroId: String) => {
    return await axios.put(`${backend}/denuncia/contadorxlibro`, { libroId });
}

export const getDenunciasxAutorxlibro = async () => {
    return await axios.get(`${backend}/denuncia/obtenerCompleto`);
}

export const putBloquearAutoryLibro= async (autorAuth0:String,libroId:String) => {
    return await axios.put(`${backend}/denuncia/bloquearAutorLibro`, { autorAuth0,libroId});
}

export const deleteReclamo = async (id: String) => {
    return await axios.put(`${backend}/denuncia/eliminarReclamo`, { id });
}


