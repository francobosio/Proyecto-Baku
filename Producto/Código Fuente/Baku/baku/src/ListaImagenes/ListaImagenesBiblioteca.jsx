import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import {Link} from "react-router-dom";

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

export default function TitlebarImageList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList rowHeight={400} className={classes.imageList} cols={6} gap={20}>
                <ImageListItem key="Subheader" cols={6} style={{ height: 'auto' }}>
                    <ListSubheader component="div" className={classes.titulo}>Mi Biblioteca</ListSubheader>
                </ImageListItem>
                {categorias.map((item) => (
                        <ImageListItem key={item.img}>
                            <img src={item.img} alt={item.title} />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>por: {item.author}</span>}
                                position='bottom'
                                actionIcon={
                                    <IconButton aria-label={`info about ${item.title}`} className={classes.icon} title={"Leer este libro"}>
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