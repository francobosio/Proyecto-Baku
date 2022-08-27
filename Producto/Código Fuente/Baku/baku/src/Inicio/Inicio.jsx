import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Slider from '../CarouselPrincipal';
import SliderRanked from '../CarouselPrincipalRanked';
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
        alignSelf: 'center',
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
        <img src={props.item} alt="" style={{ 'objectFit': 'contain', justifyContent: 'center', alignItems: 'center' }} />
    )
}
export default function Inicio() {
    const [libros, setlibros] = useState([])
    const [librosGenero, setLibrosGenero] = useState([])
    const [librosFavoritos, setLibrosFavoritos] = useState([])
    const [favoritosComponente, setFavoritosComponente] = useState([])
    const [flagScroll, setFlagScroll] = useState(true)
    const [librosRankeados, setlibrosRankeados] = useState([])
    const [flagActualizar, setFlagActualizar] = useState(true)
    const [numeroRandom, setNumeroRandom] = useState(Math.random())
    /* Carga todos los libros desde la base de datos y los guarda en la variable libros como un array */
    const loadLibros = async () => {
        const res = await libroService.getLibrosPublicado();
        const res2 = await libroService.obtenerRanking();
        setlibros(res.data);
        setlibrosRankeados(res2.data);
        console.log(res.data)
        console.log(res2.data)
    }
    useEffect(() => {
        loadLibros()
        window.scrollTo(0, 0)
    }, [])

    const loadUsuario = async () => {
        const res = await usuarioService.getUsuario(user.sub);
        let usuario = res.data;

        if (usuario === null || usuario === undefined) {
            const usuarioData = {
                'auth0_id': user.sub,
                'apellido': user.family_name ? user.family_name : user.nickname,
                'nombre': user.given_name ? user.given_name : user.nickname,
                'tipo': '1',
                'avatar': user.picture,
                'usuario': user.nickname,
                'correo_electronico': user.email
            }
            const res = await usuarioService.createUsuario(usuarioData)
            usuario = res.data.usuario
        }
        localStorage.setItem('usuario_estado', usuario.estado)
        localStorage.setItem("usuario_activo", usuario.auth0_id)
        localStorage.setItem("usuario_id", usuario._id)
        localStorage.setItem("tipoUsuario", usuario.tipoUsuario)
        localStorage.setItem("usuario", usuario.usuario)
        localStorage.setItem("avatar", usuario.avatar)
        //Para favoritos
        const favoritos = await usuarioService.obtenerFavoritos(usuario.auth0_id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
        //----------------------------------------------------------------------------------------------
        if (usuario.estado === 'Inactivo') {
            //no mostrar el componente de inicio 
            window.alert("Su cuenta se encuentra inactiva, consulte con el administrador")
            window.location.href = "/";
        }
    }
    useEffect(() => {
        loadUsuario()
    }, [])

    window.onscroll = async function () {
        var y = window.scrollY;
        if (y > 900 && flagScroll === true) {
            setFlagScroll(false);
            console.log("Se disparo el scroll")
            const res2 = await libroService.buscarLibroGenero("Terror");
            const res3 = await libroService.obtenerLibrosFavoritos();
            setLibrosGenero(res2.data);
            setLibrosFavoritos(res3.data);
        };
    }
    
    const { user } = useAuth0();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MiDrawer pestaña={1} />
            <main className={classes.content}>
                <AppBar />
                <Carousel className={classes.carousel}  >
                    {
                        imagenesCarrusel.map((item) => { return <Item key={item.id} item={item.img} /> })
                    }
                </Carousel>
                {/* <Container disableGutters={true} maxWidth="xl"> CONSULTAR!*/}
                <div>
                    <Typography variant='h4' className={classes.titulo} >Subidos recientemente</Typography>
                    {libros.length > 0 ? (
                        <Slider >
                            {libros.map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            )).reverse()}
                        </Slider>) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo} >Populares en Baku</Typography>
                    {libros.length > 0 ? (
                        //ordenar por cantidad de visitas 
                        <Slider className={classes.slider}>
                            {libros.sort((a, b) => b.visitas - a.visitas).map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            ))}
                        </Slider>) :
                        (<Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo} >Tendencias</Typography>
                    {libros.length > 0 && flagActualizar===true ? (
                        <Slider className={classes.slider}>
                            {libros.sort((a, b) => b.visitas24Horas - a.visitas24Horas).map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            )).sort(() => numeroRandom - 0.5)}
                        </Slider>
                        ) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo} >Ranking</Typography>
                    {librosRankeados.length > 0 ? (
                        <SliderRanked className={classes.slider}>
                            {librosRankeados.map(movie => (
                                <SliderRanked.Item movie={movie} key={movie._id}></SliderRanked.Item>
                            )).reverse()}
                        </SliderRanked>
                        ) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo}>Elegidos por los editores</Typography>
                    {libros.length > 0 ? (
                        <Slider className={classes.slider}>
                            {libros.map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            )).sort(() => numeroRandom - 0.5)}
                        </Slider>) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo}>Para una noche de terror</Typography>
                    {librosGenero.length > 0 ? (
                        <Slider className={classes.slider}>
                            {librosGenero.map(movie => (
                                <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                            )).sort(() => Math.random() - 0.5)}
                        </Slider>) : (
                        <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'86.5vw'} height={'30vh'} />)
                    }
                    <Typography variant='h4' className={classes.titulo}>Más favoritos por la comunidad</Typography>
                    {librosFavoritos.length > 0 ? (
                        <Slider className={classes.slider}>
                            {librosFavoritos.map(movie => (
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
