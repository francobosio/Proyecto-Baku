import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Slider from '../CarouselPrincipal';
import Image from 'material-ui-image';
import {MiDrawer} from "../Drawer/Drawer.jsx"

//Imagenes
import imagen1 from "../Imagenes/1.jpg";
import imagen2 from "../Imagenes/El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur-md.jpg";
import imagen3 from "../Imagenes/3.jpg";
import imagen6 from "../Imagenes/6.jpg";
import imagen7 from "../Imagenes/7.jpg";
import imagen8 from "../Imagenes/8.jpg";
import imagen5 from "../Imagenes/5.jpg";
import imagen4 from "../Imagenes/4.jpg";
import imagen9 from "../Imagenes/Los_120_dias_de_Sodoma-Marques_de_Sade-md.png";
import imagen10 from "../Imagenes/La_llamada_de_Cthulhu-H._P._Lovecraft-md.jpg"
import imagen11 from "../Imagenes/Don_Quijote_de_la_Mancha-Cervantes_Miguel-md.png"
import imagen12 from "../Imagenes/Alicia_en_el_pais_de_las_maravillas-Carroll_Lewis-md.png"
import imagen13 from "../Imagenes/El_arte_de_la_guerra-Sun_Tzu-md.png"
import imagen14 from "../Imagenes/El_traje_nuevo_del_emperador-Hans_Christian_Andersen-md.jpg"
import imagen15 from "../Imagenes/La_divina_comedia-Dante_Alighieri-md.png"

const libros = [
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen12,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen2,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'Biografia_Leonardo_daVinci-CVerdejo.pdf',
        image: imagen3,
        title: 'Leonardo',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen13,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_maravilloso_Mago_de_Oz-L._Frank_Baum.pdf',
        image: imagen4,
        title: 'El maravilloso mago de OZ',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen14,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_Necronomicon-H.P_Lovecraft.pdf',
        image: imagen5,
        title: 'El necronomicron',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen15,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_mundo_perdido-Conan_Doyle_Arthur.pdf',
        image: imagen6,
        title: 'El mundo perdido',

    },
    {
        pdf: 'Bodas_de_Sangre-Garcia_Lorca_Federico.pdf',
        image: imagen7,
        title: 'Bodas de sangre',

    },
    {
        pdf: 'Heidi-Johanna_Spyri.pdf',
        image: imagen8,
        title: 'Heidi',

    },
    {
        pdf: 'Los_120_dias_de_Sodoma-Marques_de_Sade.pdf',
        image: imagen9,
        title: 'Los 120 días de sodoma',

    },
    {
        pdf: 'La_llamada_de_Cthulhu-H._P._Lovecraft.pdf',
        image: imagen10,
        title: 'La llamada de Cthulhu',

    },
    {
        pdf: 'Don_Quijote_de_la_Mancha-Cervantes_Miguel.pdf',
        image: imagen11,
        title: 'Don Quijote de la Mancha',

    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    },
    link: {
        color: "white",
        "text-decoration": "none",
    }
}));

function Item(props) {
    return (
        <Paper>
            <Image src={props.item.imagen} style={{ width: 180, height: 100, 'object-fit': 'contain', justifyContent: 'center', alignItems: 'center' }} />
        </Paper>
    )
}
export default function MiniDrawer() {
    const classes = useStyles();
    const items = [
        { imagen: imagen1 },
        { imagen: imagen4 },
        { imagen: imagen5 },
    ]

    return (
        <div className={classes.root}>
            <MiDrawer />
            <main className={classes.content}>
                <AppBar />

                <Carousel className={classes.carousel}  >
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
                <Typography variant='h4' className={classes.titulo} >Leídos recientemente</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Populares en Baku</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Tendencias</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo}>Elegidos por los editores</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Footy />
            </main>

        </div>
    );
}
