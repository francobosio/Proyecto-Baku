import { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Favorito({ libroId }) {
    const listaLibros = (JSON.parse(localStorage.getItem("favoritos"))).data.favoritos
    const [iconoFavorito, seticonoFavorito] = useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const tamaño = matches ? 35 : 25;
    const loadFavoritos = () => {
        //si libroId esta en el array de libros cabiar iconoFavorito a true
        if (listaLibros.map(x => x.id_libro).includes(libroId)) {
            seticonoFavorito(true)
        } else {
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
            <IconButton size='large' sx={{ height: 'auto',width:'auto'}} onClick={() => eliminarFavorito(libroId)}>
                <FavoriteIcon fontSize="large" sx={{ height: tamaño , width:'auto', color: 'whitesmoke' }} />
            </IconButton>
            :
            <IconButton size='large' onClick={() => agregarFavorito(libroId)}>
                <FavoriteBorderIcon fontSize="large" sx={{ height: tamaño, width:'auto', color: 'whitesmoke' }} />
            </IconButton>
    );
}
