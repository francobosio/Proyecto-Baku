import React, { useState, useEffect } from 'react';
import * as libroService from '../Libros/LibroService'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import { Link } from "react-router-dom";
import { Container } from '@material-ui/core';



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
        "margin-top": "10px",
        "padding-left": "0px",
        color: "black",

    },
    imagen: {
    },
    icono: {
        width: "1.5em",
        height: "1.5em",
        color: "white",
    },

}));

export default function TitlebarImageList() {

    const classes = useStyles();
    const [libros, setlibros] = useState([])
    const loadLibros = async () => {
        const res = await libroService.getLibros();
        setlibros(res.data);
    }

    useEffect(() => {
        loadLibros()
    }, [])
    let array = [];
    
    return (
        <Container className={classes.root} maxWidth="xl">
            
            <div className={classes.root}>
                <ImageList rowHeight={500} className={classes.imageList} cols={5} gap={20}>
                    <ImageListItem key="Subheader" cols={5} style={{ height: 'auto' }}>
                        <ListSubheader component="div" className={classes.titulo}>Mi Biblioteca :</ListSubheader>
                    </ImageListItem>
                    {libros.map((item) => (
                        <ImageListItem key={item.id} style={{ width: "16.8rem", height: "23.5rem"}} >
                            {array=item.archivoTexto.split("/")}
                            <img src={item.imagenPath} alt={item.titulo} />
                            <ImageListItemBar
                                title={item.titulo}
                                //subtitle={<span>por: {item.autor}</span>}
                                position='bottom'
                                actionIcon={
                                    <IconButton aria-label={`info about ${item.titulo}`} title={"Leer este libro"}>
                                        <Link to={"/Lectura/" + array[array.length - 2] + "/" + array[array.length - 1]} >
                                            <LocalLibraryOutlinedIcon  className={classes.icono}/>
                                        </Link>
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </Container>
    );
}