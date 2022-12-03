import { useState, useEffect } from 'react';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/system';
import { Link } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar, IconButton, makeStyles, Grid, Container } from '@material-ui/core';

import * as libroService from '../Libros/LibroService'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        'background': '#99cfbf',
    },
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
        width: "1.7em",
        height: "1.7em",
        color: "white",
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
    botonClicked: {
        'font-weight': 'bold',
        'margin': '0',
        'display': 'flex',
        'color': '#FFFFFF',
        'fontSize': '1rem',
        'background-color': '#055743',
        'width': '15.5rem',
        '&:hover': {
            'background': '#32695f',
            'color': '#FFFFFF',
        },
    },
    fondo: {
        'minHeight': '95vh',
        'minWidth': ' 95vh'
    }
}));

export default function TitlebarImageList({columnas,altura,anchoImageList}) {

    const classes = useStyles();
    const [libros, setlibros] = useState([])
    const [librosPublicados, setLibrosPublicados] = useState([])
    const [open, setOpen] = useState(false);
    const [idLibro, setIdLibro] = useState(0);

    /* Carga los libros leidos y publicados del usuario y luego los guarda en 2 vectores para poder mostrarlos */
    const loadLibros = async () => {
        const auth0id = localStorage.getItem('usuario_activo');
        if (!librosPublicados.length > 0) {
            const resUsuario = await usuarioService.getUsuario(auth0id)
            let aux = resUsuario.data.libros_publicados
            setLibrosPublicados(aux)
        }
        const res = await libroService.getLibros();
        setlibros(res.data);
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        loadLibros()
    }, [])

    const LibroLeido = async (libroId) => {
        const usuario_id = localStorage.getItem("usuario_activo")
        const libroData = {
            'auth0id': usuario_id,
            'idLibro': libroId,
            'finLectura': false,
        }
        await usuarioService.usuarioLibroLeido(libroData);
    }

    const EliminarLibro = async (libroId) => {
        const libroNuevosPublicados = librosPublicados.filter(libro => libro.id_libro !== libroId)
        setLibrosPublicados(libroNuevosPublicados)
        setOpen(false);
        await libroService.deleteLibro(libroId);
    }
    const handleClickOpen = (id) => {
        setIdLibro(id)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container style={{ minHeight:'28.47em' }}>
            <Grid container spacing={1}>
                    {libros.length > 0 ? (
                        <ImageList rowHeight={300} className={classes.imageList} style={{width:anchoImageList,justifyContent:'initial'}} gap={15}>
                            {libros.map((item) => (
                                (((librosPublicados.findIndex(x => x.id_libro == item._id)) > -1) ? (
                                    <ImageListItem key={item._id} style={{ width: altura/6.6, height: altura/4 }} >
                                        <img src={item.imagenPath} alt={item.titulo} style={{ objectFit: 'cover' }}/>
                                        <ImageListItemBar
                                            title={item.titulo}
                                            position='bottom'
                                            actionIcon={
                                                <Stack direction="row" spacing={-2}>
                                                    <IconButton aria-label={`info about ${item.titulo}`} title={"Leer este libro"}>
                                                        <Link onClick={() => { LibroLeido(item._id) }} to={"/Lectura/" + item._id} >
                                                            <AutoStoriesOutlinedIcon fontSize="large" className={classes.icono} />
                                                        </Link>
                                                    </IconButton>
                                                    <IconButton aria-label={`star ${item.titulo}`} style={{ color: "black" }}>
                                                        <Link onClick={() => { handleClickOpen(item._id) }}>
                                                            <DeleteForeverOutlinedIcon fontSize="large" className={classes.icono} />
                                                        </Link>
                                                    </IconButton>
                                                </Stack>
                                            }
                                        >
                                        </ImageListItemBar>
                                    </ImageListItem>
                                ) : (
                                    null
                                ))
                            ))}
                        </ImageList>
                    ) : (
                        //fondo sin nada para que no se vea tan vacio
                        <div className={classes.fondo}></div>
                    )}
            </Grid>
            <Dialog
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle >
                    ¿Está seguro que desea eliminar este libro?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={() => { EliminarLibro(idLibro) }}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}