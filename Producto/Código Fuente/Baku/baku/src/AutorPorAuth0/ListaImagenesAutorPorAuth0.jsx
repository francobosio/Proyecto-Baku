import React, { useState, useEffect } from 'react';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Skeleton from '@mui/material/Skeleton';
import { Link } from "react-router-dom";
import { Container, Button, ImageList, ImageListItem, ImageListItemBar, Typography, IconButton, makeStyles, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import * as libroService from '../Libros/LibroService'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

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
        "marginBottom": "0",
        'font-weight': 'bold',
        "padding-left": "0",
        color: "black",
    },
    suscriptores:
    {
        color: "#606060"
    },
    icono: {
        width: "1.7em",
        height: "1.7em",
        color: "white",
    },
    btnSuscribir: {
        'font-weight': 'bold',
        'margin': '0',
        'display': 'flex',
        'color': '#000000',
        'fontSize': '1rem',
        'background-color': '#E5A65E',
        'width': '12rem',
        '&:hover': {
            'background': '#FFCA8C',
        },
    },
    btnDesuscribir: {
        'font-weight': 'bold',
        'margin': '0',
        'display': 'flex',
        'color': '#FFFFFF',
        'fontSize': '1rem',
        'background-color': 'green',
        'width': '12rem',
        '&:hover': {
            'background': '#029d02',
            'color': '#FFFFFF',
        },
    },
    alinearCentro:
    {
        'align-self': 'center',
    },
    fondo: {
        'minHeight': '100vh',
        'minWidth': ' 95vh'
    }
}));

export default function TitlebarImageList() {

    const usuario_id = localStorage.getItem('usuario_id')
    const classes = useStyles();
    const [libros, setlibros] = useState([])
    const [nombre, setNombre] = useState('Cargando...')
    const [flagBoton, setFlagBoton] = useState(true)
    const [autor, setAutor] = useState('')
    const [suscriptores, setSuscriptores] = useState(0)
    const { Id } = useParams();
    const [flagEsperaMensaje, setFlagEsperaMensaje] = useState(false)

    const loadLibros = async () => {
        console.log(Id)
        const autorRes = await usuarioService.getUsuariosPorId(Id)
        const autor = autorRes.data
        console.log(autor)
        //usar el setAutor sincrono para que no se pierda el valor
        setAutor(autor)
        const buscarNombreSuscripcion = await usuarioService.buscarNombreSuscripcion(usuario_id, autor._id)
        if (buscarNombreSuscripcion.data.estaSuscripto) {
            setNombre('Suscripto')
            setFlagBoton(true)
        }
        else {
            setNombre('Suscribirse')
            setFlagBoton(false)
        }
        const libros = await libroService.buscarLibros(autor._id)
        const suscriptores = await usuarioService.obtenerSuscripciones(autor.auth0_id)
        setSuscriptores(suscriptores.data.suscriptores)
        //guardar el libro en el estado sincrono
        console.log(libros.data)
        setlibros(libros.data)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        esperar()
        loadLibros()
    }, [])


    //al hacer click en el boton cambiar el nombre Suscribirse por Desuscribirse y viceversa 
    const suscripcion = async () => {
        const autor2 = autor._id
        console.log(usuario_id)
        console.log(autor2)
        if (nombre === 'Suscribirse') {
            setNombre('Suscripto')
            setSuscriptores(suscriptores + 1)
            const res = await usuarioService.suscribirUsuario(usuario_id, autor2)

        } else {
            console.log("estoy en desuscribirse")
            setNombre('Suscribirse')
            setSuscriptores(suscriptores - 1)
            const res = await usuarioService.desuscribirUsuario(usuario_id, autor2)
            window.alert('Se ha anulado su suscripción')
        }
    }

    const LibroLeido = async (libroId) => {
        const usuario_id = localStorage.getItem("usuario_activo")
        const libroData = {
            'auth0id': usuario_id,
            'idLibro': libroId,
            'finLectura': false,
        }
        const res = await usuarioService.usuarioLibroLeido(libroData);
        console.log(res);
    }
    //funcion que espera 3 segundos y si no hay libros muestra un mensaje de que no hay libros 
    const esperar = () => {
        setTimeout(() => {
            setFlagEsperaMensaje(true)
        }, 2000)
    }
    //componente que espera 3 segundos y si no hay libros muestra un mensaje de que no hay libros
    const Esperar = () => {
        if (flagEsperaMensaje) {
            return (
                <div>
                    <Typography variant="h5" className={classes.titulo}>No hay libros disponibles</Typography>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Typography variant="h5" className={classes.titulo}>Cargando...</Typography>
                </div>
            )
        }
    }



    console.log(libros.length)
    return (
        <Container className={classes.root} maxWidth="xl">
            {libros.length > 0 ?
                (
                    <Grid className={classes.fondo} xs={12}>
                        <Grid item direction='row' xs={12} container  >
                            <Grid item xs={2}>
                                <Typography className={classes.titulo}>{libros[0].autor}</Typography>
                                <Typography className={classes.suscriptores} variant="subtitle1" >{suscriptores} suscriptores</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.alinearCentro}>
                                <Button variant="contained" className={flagBoton ? classes.btnSuscribir : classes.btnDesuscribir} onClick={() => { setFlagBoton(prevCheck => !prevCheck); suscripcion() }} > {nombre} </Button>
                            </Grid>
                        </Grid>
                        <br />
                        <ImageList rowHeight={500} className={classes.imageList} cols={5} gap={20}>
                            {libros.map((item) => (
                                <ImageListItem key={item._id} style={{ width: "16.8rem", height: "23.5rem" }} >
                                    <img src={item.imagenPath} alt={item.titulo} />
                                    <ImageListItemBar
                                        title={item.titulo}
                                        position='bottom'
                                        actionIcon={
                                            <IconButton aria-label={`info about ${item.titulo}`} title={"Leer este libro"}>
                                                <Link onClick={() => { LibroLeido(item._id) }} to={"/Lectura/" + item._id} >
                                                    <AutoStoriesOutlinedIcon fontSize="large" className={classes.icono} />
                                                </Link>
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>

                    </Grid>
                ) : (<Grid className={classes.fondo} xs={6}>
                    <br />
                    <Esperar />
                </Grid>
                )
            }
        </Container>
    );
}