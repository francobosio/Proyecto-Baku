import React, { useState, useEffect } from 'react';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import Skeleton from '@mui/material/Skeleton';
import { Link } from "react-router-dom";
import { Container, Button, ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton, makeStyles, Typography, Grid } from '@material-ui/core';

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
        "marginBottom": "1rem",
        'font-weight': 'bold',
        "padding-left": "0",
        color: "black",
    },
    imagen: {
    },
    icono: {
        width: "1.5em",
        height: "1.5em",
        color: "white",
    },
    boton: {
        'font-weight': 'bold',
        'margin': '0',
        'display': 'flex',
        'color': '#FFFFFF',
        'fontSize': '1rem',
        'background-color': '#3a7a6f',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        }
    },
    fondo: {
        'background': '#76bfa9',
        'minHeight': '100vh',
        'minWidth': ' 95vh'
    }
}));

export default function TitlebarImageList() {

    const classes = useStyles();
    const [libros, setlibros] = useState([])
    const [librosLeidos, setLibrosLeidos] = useState([])
    const [librosPublicados, setLibrosPublicados] = useState([])
    const [flagBiblioteca, setFlagBiblioteca] = useState(true)

    const loadLibros = async () => {
        const auth0id = localStorage.getItem('usuario_activo');
        if (!librosLeidos.length > 0 && !librosPublicados.length > 0) {
            const resUsuario = await usuarioService.getUsuario(auth0id)
            let aux = resUsuario.data.libros_leidos
            console.log(aux)
            setLibrosLeidos(aux)
            aux = resUsuario.data.libros_publicados
            setLibrosPublicados(aux)
            console.log(librosLeidos)
            console.log(librosPublicados);
        }
        const res = await libroService.getLibros();
        setlibros(res.data);
        console.log(libros)
    }

    useEffect(() => {
        loadLibros()
    }, [])
    let array = [];

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

    return (
        <Container className={classes.root} maxWidth="xl">
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography className={classes.titulo}> Mi Biblioteca </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.boton} onClick={() => setFlagBiblioteca(true)}> Cargar Mis libros leidos </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.boton} onClick={() => setFlagBiblioteca(false)}> Cargar Mis libros Subidos </Button>
                    </Grid>
                    <Grid className={classes.fondo} item xs={12}>
                        {libros.length > 0 ? (
                            <ImageList rowHeight={500} className={classes.imageList} cols={5} gap={20}>
                                {libros.map((item) => (
                                    (flagBiblioteca) ? (((librosLeidos.findIndex(x => x.id_libro == item._id)) > -1) ? (
                                        <ImageListItem key={item._id} style={{ width: "16.8rem", height: "23.5rem" }} >
                                            <img src={item.imagenPath} alt={item.titulo} />
                                            <ImageListItemBar
                                                title={item.titulo}
                                                //subtitle={<span>por: {item.autor}</span>}
                                                position='bottom'
                                                actionIcon={
                                                    <IconButton aria-label={`info about ${item.titulo}`} title={"Leer este libro"}>
                                                        <Link onClick={() => { LibroLeido(item._id) }} to={"/Lectura/" + item._id} >
                                                            <LocalLibraryOutlinedIcon className={classes.icono} />
                                                        </Link>
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ) : (
                                        null
                                    )) : (((librosPublicados.findIndex(x => x.id_libro == item._id)) > -1) ? (
                                        <ImageListItem key={item._id} style={{ width: "16.8rem", height: "23.5rem" }} >
                                            <img src={item.imagenPath} alt={item.titulo} />
                                            <ImageListItemBar
                                                title={item.titulo}
                                                //subtitle={<span>por: {item.autor}</span>}
                                                position='bottom'
                                                actionIcon={
                                                    <IconButton aria-label={`info about ${item.titulo}`} title={"Leer este libro"}>
                                                        <Link onClick={() => { LibroLeido(item._id) }} to={"/Lectura/" + item._id} >
                                                            <LocalLibraryOutlinedIcon className={classes.icono} />
                                                        </Link>
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ) : (
                                        null
                                    ))
                                ))}
                            </ImageList>
                        ) : (
                            <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'95vw'} height={'100vh'} />
                        )}
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}