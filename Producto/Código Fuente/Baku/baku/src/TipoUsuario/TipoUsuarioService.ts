import axios from 'axios';

export const getTipoUsuario = async () => {
    return await axios.get('http://localhost:4000/tipoUsuarios');
}
