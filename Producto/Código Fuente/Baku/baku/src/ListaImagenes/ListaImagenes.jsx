import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ButtonBase from '@material-ui/core/ButtonBase';

//Imagenes
import imagen1 from "../Imagenes/1.jpg";
import imagen2 from "../Imagenes/2.jpg";
import imagen3 from "../Imagenes/3.jpg";
import imagen6 from "../Imagenes/6.jpg";
import imagen7 from "../Imagenes/7.jpg";
import imagen8 from "../Imagenes/8.jpg";
import imagen5 from "../Imagenes/5.jpg";
import imagen4 from "../Imagenes/4.jpg";
import { Button } from '@material-ui/core';

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
        img: imagen1,
        title: 'Arte',
    },
    {
        img: imagen2,
        title: 'Ciencia Ficcion',

    },
    {
        img: imagen3,
        title: 'Aventura',

    },
    {
        img: imagen4,
        title: 'Policial',

    },
    {
        img: imagen5,
        title: 'Fantastico',

    },
    {
        img: imagen6,
        title: 'Romantico',
        author: 'Romantico',
    },
    {
        img: imagen7,
        title: 'Infantil',
        author: 'Infantil',
    },
    {
        img: imagen8,
        title: 'Teatro',
        author: 'Teatro',
    },
    {
        img: imagen2,
        title: 'Bibliografico',
        author: 'Bibliografico',
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
                        <ImageListItemBar
                            title={item.title}
                            position='top'
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}