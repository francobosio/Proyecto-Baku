import React, { useState, useEffect } from 'react';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';

import Skeleton from '@mui/material/Skeleton';
import { Link } from "react-router-dom";
import { Container, ImageList, ImageListItem, ImageListItemBar, IconButton, makeStyles, Typography, Grid } from '@material-ui/core';

import * as libroService from '../Libros/LibroService';

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
        '&:hover': {
            //hacer que el transform scale se ejecute mas lento y cambie de color color 0.8s linear 0.2s
            transition: 'transform 0.3s ease-in-out , color linear 0.4s',
            transform: 'scale(1.3)',
            color: '#99cfbf',
            
        },
    },
    barra: {
        //si se activa el hover del hijo oscurecer el fondo
        
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
    ,
    botonAnimado: {
        //mover a la izquierda el icono 

        'margin-right': '40px'
        
    },

}));

export default function TitlebarImageList() {

    const classes = useStyles();
    const [libros, setlibros] = useState([])
    const [libroSeleccionado, setLibroSeleccionado] = useState(true)

    const loadLibros = async () => {
        const res = await libroService.getLibroRegistrado();
        setlibros(res.data);
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        loadLibros()
    }, [])


    return (
        <Container className={classes.root} maxWidth="xl">
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography className={classes.titulo}> Revisión de libros</Typography>
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
                                                title="Revisar libro"
                                                position='bottom'
                                                /* Iconos */
                                                actionIcon={
                                                    <IconButton className='botonAnimado' aria-label={`info about ${item.titulo}`} title={"Revisar este libro"}>
                                                        <Link to={"/Revision/" + item._id} >
                                                            <SpellcheckOutlinedIcon fontSize='large' className={classes.icono} />
                                                        </Link>
                                                    </IconButton>
                                                }
                                                className={classes.barra}
                                            />
                                        </ImageListItem>
                                    ))}

                                </ImageList>
                            ) : (
                                null
                            )
                        }
                    </Grid>

                </Grid>
            </div>
        </Container>
    );
}