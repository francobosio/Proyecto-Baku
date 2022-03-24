import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Slider from '../CarouselPrincipal';
import { useAuth0 } from '@auth0/auth0-react'
import Skeleton from '@mui/material/Skeleton';

import { MiDrawer } from "../Drawer/Drawer.jsx";
import * as libroService from '../Libros/LibroService'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'
import imgCarrusel1 from '../Imagenes/CarruselBaku1.png'
import imgCarrusel2 from '../Imagenes/CarruselBaku2.png'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    icono: {
        marginLeft: -3,
    },
    toolbar: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    carousel: {
        paddingTop: "1.5em",
        marginTop: 11,
        marginHorizon: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    slider: {
        marginTop: 500,
    },
    titulo: {
        marginLeft: 20,
        'font-weight': 'bold',
        'color': '#000',
    },
    link: {
        color: "white",
        "text-decoration": "none",
    }
}));

const imagenesCarrusel = [
    { id: 1, img: imgCarrusel1 },
    { id: 2, img: imgCarrusel2 }
]

function Item(props) {
    return (
        <img src={props.item} alt="" style={{ 'object-fit': 'contain', justifyContent: 'center', alignItems: 'center' }} />
    )
}
export default function Inicio() {
    const [libros, setlibros] = useState([])
    const loadLibros = async () => {
        const res = await libroService.getLibros();
        setlibros(res.data);
    }

    useEffect(() => {
        loadLibros()
        window.scrollTo(0, 0)
        
    }, [])

    const loadUsuario = async () => {
        const res = await usuarioService.getUsuario(user.sub);
        let usuario = res.data;
        if (usuario == null) {
            const usuarioData = {
                'auth0_id': user.sub,
                'apellido': user.family_name ? user.family_name : user.nickname,
                'nombre': user.given_name ? user.given_name : user.nickname,
                'tipo':'1',
                'correo_electronico': user.email
            }
            console.log(usuarioData);
            const res = await usuarioService.createUsuario(usuarioData)
            usuario = res.data.usuario
            console.log('usuario creado: ', usuario)
        }
        localStorage.setItem("usuario_activo", usuario.auth0_id)
        localStorage.setItem("usuario_id", usuario._id)
        localStorage.setItem("tipoUsuario", usuario.tipoUsuario)
    }
    useEffect(() => {
        loadUsuario()
        console.log(localStorage.getItem('tipoUsuario'))  
        console.log(localStorage.getItem('usuario_id'))
    }, [])

    const { user } = useAuth0();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MiDrawer />
            <main className={classes.content}>
                <AppBar />
                <Carousel className={classes.carousel}  >
                    {
                        imagenesCarrusel.map((item) => { return <Item key={item.id} item={item.img} /> })
                    }
                </Carousel>
                <div>
                    <Typography variant='h4' className={classes.titulo} >Subidos recientemente</Typography>
                    {libros.length > 0 ? (
                        <Slider >
                            {[...libros].reverse().map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            ))}
                        </Slider>) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo} >Populares en Baku</Typography>
                    {libros.length > 0 ? (
                        <Slider className={classes.slider}>
                            {libros.map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            )).sort(() => Math.random() - 0.5)}
                        </Slider>) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo} >Tendencias</Typography>
                    {libros.length > 0 ? (
                        <Slider className={classes.slider}>
                            {libros.map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            )).sort(() => Math.random() - 0.5)}
                        </Slider>) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo}>Elegidos por los editores</Typography>
                    {libros.length > 0 ? (
                    <Slider className={classes.slider}>
                        {libros.map(movie => (
                            <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                        )).sort(() => Math.random() - 0.5)}
                    </Slider>) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                </div>
                <Footy />
            </main>
        </div>
    );
}
