import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';

//Imagenes
import imagen1 from "../Imagenes/1.jpg";
import imagen2 from "../Imagenes/2.jpg";
import imagen3 from "../Imagenes/3.jpg";
import imagen6 from "../Imagenes/6.jpg";
import imagen7 from "../Imagenes/7.jpg";
import imagen8 from "../Imagenes/8.jpg";
import imagen5 from "../Imagenes/5.jpg";
import imagen4 from "../Imagenes/4.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: "100%",
        "margin-bottom": "10px !important",
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
    icono: {
        width: "1.5em",
        height: "1.5em",
        color: "white",
    },

}));


const categorias = [
    {
        img: imagen1,
        title: 'Chaplin',
        author: 'tuVieja',
    },
    {
        img: imagen2,
        title: 'Sherlok Holmes',
        author: 'tuVieja',
    },
    {
        img: imagen3,
        title: 'Leonardo',
        author: 'author',
    },
    {
        img: imagen4,
        title: 'El maravilloso mago de OZ',
        author: 'author',
    },
    {
        img: imagen5,
        title: 'El necronomicron',
        author: 'author',

    },
    {
        img: imagen6,
        title: 'Image',
        author: 'author',
    },
    {
        img: imagen7,
        title: 'Image',
        author: 'author',
    },
    {
        img: imagen8,
        title: 'Image',
        author: 'author',
    },
    {
        img: imagen2,
        title: 'Image',
        author: 'author',
    },

];

export default function TitlebarImageList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList rowHeight={400} className={classes.imageList} cols={6} gap={20}>
                <ImageListItem key="Subheader" cols={6} style={{ height: 'auto' }}>
                    <ListSubheader component="div" className={classes.titulo}>Mis libros :</ListSubheader>
                </ImageListItem>
                {categorias.map((item) => (
                        <ImageListItem key={item.img}>
                            <img src={item.img} alt={item.title} />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>por: {item.author}</span>}
                                position='bottom'
                                actionIcon={
                                    <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                      <LocalLibraryOutlinedIcon className={classes.icono} />
                                    </IconButton>
                                  }
                            /> 
                        </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}