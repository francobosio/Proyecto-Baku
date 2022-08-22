import React from 'react';
import { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        'background': '#99cfbf',
    },
    imageList: {
        width: "100%",
        "margin-bottom": "10px !important",
    },
    titulo: {
        "font": "200% sans-serif",
        "margin-top": "1rem",
        "marginBottom": "1rem",
        'font-weight': 'bold',
        "padding-left": "0",
        color: "black",
    },
    icono: {
        width: "1.7em",
        height: "1.7em",
        color: "white",
    },
    boton: {
        'font-weight': 'bold',
        'margin': '0',
        'display': 'flex',
        'color': '#FFFFFF',
        'fontSize': '1rem',
        'background-color': '#3a7a6f',
        'width': '15.5rem',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        },
    },
    botonClicked: {
        'font-weight': 'bold',
        'margin': '0',
        'display': 'flex',
        'color': '#FFFFFF',
        'fontSize': '1rem',
        'background-color': '#055743',
        'width': '15.5rem',
        '&:hover': {
            'background': '#32695f',
            'color': '#FFFFFF',
        },
    },
    fondo: {
        'minHeight': '100vh',
        'minWidth': ' 95vh'
    }
}));

export default function Favorito({ libroId }) {
    /* console.log(libroId); */
    const [libros, setlibros] = useState(libroId)
    const [iconoFavorito, seticonoFavorito] = useState(false)
    const [estado, setestado] = useState(false)
    
    const load = async () => {
        const res = await usuarioService.obtenerFavoritos(localStorage.getItem('usuario_activo'));
        setlibros(res.data.favoritos)
        setestado(true)
    }

    useEffect(() => {
        load()
    }, [])

    const loadFavoritos = () => {
        /* console.log(libros) */
        //si libroId esta en el array de libros cabiar iconoFavorito a true
        if (estado) {

            if (libros.map(x => x.id_libro).includes(libroId)) {
                /* console.log('si esta') */
                seticonoFavorito(true)
            } else {
                /* console.log('no esta') */
                seticonoFavorito(false)
            }
        }
    }
    useEffect(() => {
        loadFavoritos()
    }, [libroId])

    const agregarFavorito = async (libroId) => {
        seticonoFavorito(true)
        await usuarioService.agregarFavorito(localStorage.getItem('usuario_activo'), libroId);
        //agregar libroId al array de libros
        const vector = libros
        vector.push({id_libro: libroId})
        //hacer el setLibros sincrono para que se actualice antes de que se cargue el componente
        setlibros(()=>vector)
    }

    const eliminarFavorito = async (libroId) => {
        seticonoFavorito(false)
        await usuarioService.eliminarFavorito(localStorage.getItem('usuario_activo'), libroId);
        //eliminar libroId del array de libros
        const vector = libros
        vector.splice(vector.findIndex(x => x.id_libro === libroId), 1)
        //hacer el setLibros sincrono para que se actualice antes de que se cargue el componente
        setlibros(()=>vector)
    }
    
    return (
                (iconoFavorito === true) ?
                    <IconButton size='large' sx={{ with: '4em' }}  onClick={() => eliminarFavorito(libroId)}>
                        <FavoriteIcon fontSize="large" sx={{ with: '4em', height: 'auto', color: 'whitesmoke' }} />
                    </IconButton>
                    :
                    <IconButton size='large' sx={{ with: '4em' }} onClick={() => agregarFavorito(libroId)}>
                        <FavoriteBorderIcon fontSize="large" sx={{ with: '4em', height: 'auto', color: 'whitesmoke' }} />
                    </IconButton>
            
    );
}
