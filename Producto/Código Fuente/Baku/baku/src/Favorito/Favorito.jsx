import { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Favorito({ libroId }) {
    console.log(libroId);
    const listaLibros = (JSON.parse(localStorage.getItem("favoritos"))).data.favoritos
    const [iconoFavorito, seticonoFavorito] = useState(false)

    const loadFavoritos = () => {
        console.log(listaLibros)
        //si libroId esta en el array de libros cabiar iconoFavorito a true
        if (listaLibros.map(x => x.id_libro).includes(libroId)) {
            console.log('si esta')
            seticonoFavorito(true)
        } else {
            console.log('no esta')
            seticonoFavorito(false)
        }
    }
    useEffect(() => {
        loadFavoritos()
    }, [libroId])

    const agregarFavorito = async (libroId) => {
        seticonoFavorito(true)
        await usuarioService.agregarFavorito(localStorage.getItem('usuario_activo'), libroId);
        //agregar libroId al array de libros
        listaLibros.push({ id_libro: libroId })
        localStorage.setItem("favoritos", JSON.stringify({ data: { favoritos: listaLibros } }))
    }

    const eliminarFavorito = async (libroId) => {
        seticonoFavorito(false)
        await usuarioService.eliminarFavorito(localStorage.getItem('usuario_activo'), libroId);
        //eliminar libroId del array de libros
        listaLibros.splice(listaLibros.findIndex(x => x.id_libro === libroId), 1)
        //hacer el setLibros sincrono para que se actualice antes de que se cargue el componente
        localStorage.setItem("favoritos", JSON.stringify({ data: { favoritos: listaLibros } }))
    }

    return (
        (iconoFavorito === true) ?
            <IconButton size='large' sx={{ with: '4em' }} onClick={() => eliminarFavorito(libroId)}>
                <FavoriteIcon fontSize="large" sx={{ with: '4em', height: 'auto', color: 'whitesmoke' }} />
            </IconButton>
            :
            <IconButton size='large' sx={{ with: '4em' }} onClick={() => agregarFavorito(libroId)}>
                <FavoriteBorderIcon fontSize="large" sx={{ with: '4em', height: 'auto', color: 'whitesmoke' }} />
            </IconButton>
    );
}
