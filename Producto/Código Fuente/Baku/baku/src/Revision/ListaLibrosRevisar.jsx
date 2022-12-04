import { useState, useEffect } from 'react';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import { Link } from "react-router-dom";
import { Container, ImageList, ImageListItem, ImageListItemBar, IconButton, makeStyles, Typography, Grid } from '@material-ui/core';
import * as libroService from '../Libros/LibroService';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
    imageList: {
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
    botonAnimado: {
        //mover a la izquierda el icono 

        'margin-right': '40px'

    },

}));

export default function TitlebarImageList() {

    const classes = useStyles();
    const [libros, setlibros] = useState([])
    const [libroSeleccionado] = useState(true)
    const theme = useTheme();
    let banderaTab = false;
    let anchoImageList = 0;
    let altura;
    if (useMediaQuery(theme.breakpoints.only('xs'))) { altura = 1000; banderaTab = true; anchoImageList = 360 }
    if (useMediaQuery(theme.breakpoints.only('sm'))) { altura = 1000; banderaTab = true; anchoImageList = "120%" }
    if (useMediaQuery(theme.breakpoints.only('md'))) { altura = 1000; banderaTab = true; anchoImageList = "85%" }
    if (useMediaQuery(theme.breakpoints.only('lg'))) { altura = 1200; banderaTab = false; anchoImageList = "95%" }
    if (useMediaQuery(theme.breakpoints.only('xl'))) { altura = 1536; banderaTab = false; anchoImageList = "100%" }
    
    const loadLibros = async () => {
        const res = await libroService.getLibroRegistrado();
        setlibros(res.data);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        loadLibros()
    }, [])

    return (
        <Box sx={{ p: 3 }}>
            <Container style={{ minHeight: '28.47em' }}>
                <Grid container spacing={1}  >
                    {(libroSeleccionado && libros.length) > 0 ?
                        (
                            <ImageList rowHeight={300} className={classes.imageList} style={{ width: anchoImageList, justifyContent: 'initial' }} gap={15}>
                                {libros.map((item) => (
                                    <ImageListItem key={item._id} style={{ width: altura / 6.6, height: altura / 4 }} >
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
                                        />
                                    </ImageListItem>
                                ))}

                            </ImageList>
                        ) : (
                            null
                        )
                    }
                </Grid>
            </Container>
        </Box>
    );
}