
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Slider from '../CarouselPrincipal';
import { MiDrawer } from "../Drawer/Drawer.jsx";
import * as libroService from '../Libros/LibroService'
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

const imagenesCarrusel=[
    {id:1, img: imgCarrusel1},
    {id:2, img: imgCarrusel2}
]

function Item(props) {
    return (
        <img src={props.item} alt="" style={{'object-fit': 'contain', justifyContent: 'center', alignItems: 'center' }} />
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
    }, [])

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MiDrawer />
            <main className={classes.content}>
                <AppBar />
                <Carousel className={classes.carousel}  >
                    {
                        imagenesCarrusel.map((item) => {return <Item key={item.id} item={item.img}/>})
                    }
                </Carousel>

                <Typography variant='h4' className={classes.titulo} >Leídos recientemente</Typography>
                <Slider >
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                        //ordenar aleatoriamente
                    )).sort(() => Math.random() - 0.5)}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Populares en Baku</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Tendencias</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo}>Elegidos por los editores</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie._id}></Slider.Item>
                    ))}
                </Slider>
                <Footy />
            </main>
        </div>
    );
}
