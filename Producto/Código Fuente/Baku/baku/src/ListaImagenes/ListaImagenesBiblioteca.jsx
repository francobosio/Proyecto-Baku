import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import {Link} from "react-router-dom";

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
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        img: imagen2,
        title: 'El regreso de Sherlok Holmes',
        author: 'Arthur Conan Doyle',
    },
    {
        pdf: 'Biografia_Leonardo_daVinci-CVerdejo.pdf',
        img: imagen3,
        title: 'Leonardo',
        author: 'C. Verdejo',
    },
    {
        pdf: 'El_maravilloso_Mago_de_Oz-L._Frank_Baum.pdf',
        img: imagen4,
        title: 'El maravilloso mago de OZ',
        author: 'Frank Baum',
    },
    {
        pdf: 'El_Necronomicon-H.P_Lovecraft.pdf',
        img: imagen5,
        title: 'El necronomicron',
        author: 'H.P Lovecraft',
    },
    {
        pdf: 'El_mundo_perdido-Conan_Doyle_Arthur.pdf',
        img: imagen6,
        title: 'El mundo perdido',
        author: 'Arthur Conan Doyle',
    },
    {
        pdf: 'Bodas_de_Sangre-Garcia_Lorca_Federico.pdf',
        img: imagen7,
        title: 'Bodas de sangre',
        author: 'Federico Garcia Lorca',
    },
    {
        pdf: 'Heidi-Johanna_Spyri.pdf',
        img: imagen8,
        title: 'Heidi',
        author: 'Johanna Spyri',
    },
    {
        pdf: 'Los_120_dias_de_Sodoma-Marques_de_Sade.pdf',
        img: imagen9,
        title: 'Los 120 días de sodoma',
        author: 'Marqués de Sade',
    },
    {
        pdf: 'La_llamada_de_Cthulhu-H._P._Lovecraft.pdf',
        img: imagen10,
        title: 'La llamada de Cthulhu',
        author: 'H.P. Lovecraft',
    },
    {
        pdf: 'Don_Quijote_de_la_Mancha-Cervantes_Miguel.pdf',
        img: imagen11,
        title: 'Don Quijote de la Mancha',
        author: 'Miguel Cervantes',
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
                                        <Link to={"/Lectura/" + item.pdf} >
                                            <LocalLibraryOutlinedIcon className={classes.icono} />
                                        </Link>
                                    </IconButton>
                                  }
                            /> 
                        </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}