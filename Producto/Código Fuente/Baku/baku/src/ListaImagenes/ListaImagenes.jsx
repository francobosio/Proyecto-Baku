import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

//Imagenes
import arte from "./Categorias/categoria_arte.png";
import ciencia_ficcion from "./Categorias/categoria_ciencia_ficcion.png";
import fantasia from "./Categorias/categoria_fantasia.png";
import infantil from "./Categorias/categoria_infantil.png";
import terror from "./Categorias/categoria_terror.png";
import aventura from "./Categorias/categoria_aventura.png";
import viajes from "./Categorias/categoria_viajes.png";
import romantico from "./Categorias/categoria_romantico.png";
import policial from "./Categorias/categoria_policial.png";
import poesia from "./Categorias/categoria_poesia.png";
import teatro from "./Categorias/categoria_teatro.png";
import biografias from "./Categorias/categoria_biografias.png";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 900,
        "margin-bottom": "0px",
    },
    titulo: {
        "font": "200% sans-serif",
        "margin-top": "10px",
        "padding-left": "0px",
        color: "black",

    },
    imagen: {
        top: "50%",
        width: "100%",
        "position": "relative",
        transform: "translateY(-50%)",
    },

}));


const categorias = [
    {
        img: arte,
    },
    {
        img: ciencia_ficcion,
    },
    {
        img: fantasia,
    },
    {
        img: infantil,
    },
    {
        img: terror,
    },
    {
        img: aventura,
    },
    {
        img: viajes,
    },
    {
        img: romantico,
    },
    {
        img: policial,
    },
    {
        img: poesia,
    },
    {
        img: teatro,
    },
    {
        img: biografias,
    },
];

export default function TitlebarImageList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList rowHeight={320} className={classes.imageList} cols={3} gap={20}>
                <ImageListItem key="Subheader" cols={3} style={{ height: 'auto' }}>
                    <ListSubheader component="div" className={classes.titulo}>Explorar todo:</ListSubheader>
                </ImageListItem>
                {categorias.map((item) => (
                    <ImageListItem key={item.img}>
                        <img src={item.img} alt={item.title} />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}