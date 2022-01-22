import React, { useState, useEffect } from 'react';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import Skeleton from '@mui/material/Skeleton';
import { Link } from "react-router-dom";
import { Container, Button, ImageList, ImageListItem, ImageListItemBar, IconButton, makeStyles, Typography, Grid } from '@material-ui/core';

import * as libroService from '../Libros/LibroService';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService';

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
        'width': '15.5rem',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        },
    },
    fondo: {
        'minHeight': '100vh',
        'minWidth': ' 95vh'
    }
}));

export default function TitlebarImageList() {

    const classes = useStyles();
    const [libros, setlibros] = useState([])
    const [librosLeidos, setLibrosLeidos] = useState([])
    const [flagBiblioteca, setFlagBiblioteca] = useState(true)
    const [libroSeleccionado, setLibroSeleccionado] = useState(true)

    const loadLibros = async () => {
        const res = await libroService.getLibroRegistrado();
        setlibros(res.data);
        console.log(libros)
    }
    useEffect(() => {
        loadLibros()
    }, [])

    return (
        <Container className={classes.root} maxWidth="xl">
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography className={classes.titulo}> Mi Biblioteca </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.boton} onClick={() => setFlagBiblioteca(true)}> Libros a revisar </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.boton} onClick={() => setFlagBiblioteca(false)}> Libros revisados </Button>
                    </Grid>

                    {/* Aca englobo la lista de libros a revisar */}
                    <Grid className={classes.fondo} item xs={12}>
                        {(libroSeleccionado && libros.length) > 0 ?
                            (
                                <ImageList rowHeight={500} className={classes.imageList} cols={5} gap={20}>
                                    {libros.map((item) => (
                                        <ImageListItem key={item._id} style={{ width: "16.8rem", height: "23.5rem" }} >
                                            <img src={item.imagenPath} alt={item.titulo} />
                                            <ImageListItemBar
                                                title={"REVISAR"}
                                                position='bottom'
                                                actionIcon={
                                                    <IconButton aria-label={`info about ${item.titulo}`} title={"Revisar este libro"}>
                                                        {/* <Link onClick={() => { LibroLeido(item._id) }} to={"/Lectura/" + item._id} >
                                                        </Link> */}
                                                        <SpellcheckOutlinedIcon fontSize='large' className={classes.icono} onClick={() => { setLibroSeleccionado(item) }} />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ))}

                                </ImageList>
                            ) : (
                                <Skeleton variant="rectangular" sx={{ bgcolor: '#76bfa9' }} width={'95vw'} height={'100vh'} />
                            )
                        }
                    </Grid>

                </Grid>
            </div>
        </Container>
    );
}