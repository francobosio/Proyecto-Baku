import { useEffect, useState } from 'react';
import * as libroService from '../Libros/LibroService'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Container, Grid } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import { Link, useParams } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ButtonBase, CardActionArea } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
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

import * as usuarioService from '../Sesión/Usuarios/UsuarioService';

const useStyles = makeStyles((theme) => ({
    root: {
        'background': '#99cfbf',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        overflow: 'hidden',
        "margin-bottom": "2rem",
        "align-content": "flex-start",
        minHeight: '100vh',
    },
    imageList: {
        width: "70rem",
        "margin-bottom": "0px",
    },
    titulo: {
        "font": "210% sans-serif",
        "margin-top": "10px",
        "padding-left": "0px",
        color: "black",
        "marginBottom": "1rem",
        'font-weight': 'bold',

    },
    divider: {
        padding: '2vh 0 2vh 0',
        backgroundColor: '#fff',
    },
    imagen: {

        width: "100%",
        "position": "relative",
    },
    grid: {
        display: "flex",
        "place-items": "center",
        "justify-content": "center",
        "flex-direction": "column",
    },
    search: {
        'display': 'flex',
        'align-items': 'center',
        'text-align': 'center',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#076F55',
        width: '35em',
        height: '3em'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '80%',
        color: '#fff',
        pointerEvents: 'none',
        'display': 'flex',
        'align-items': 'center',
        'text-align': 'center',
    },
    inputInput: {
        color: '#fff',
        opacity: 0.5,
        'display': 'flex',
        'align-items': 'left',
        'text-align': 'left',
        'font-size': '1.5em',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(0.2em + ${theme.spacing(1)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    title: {
        color: '#932121',
        "margin-top": "1.4rem",
        "padding-left": "0px",
    },
    contenedor: {
        display: 'flex',
        width: "100%",
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'space-between',
        'flex-wrap': 'wrap'
    },
    contenedor2: {
        display: 'flex',
        height: "5rem",
        width: "80rem",
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'center',
        'flex-wrap': 'wrap'
    },
    icono: {
        width: "4em",
        height: "3em",
        color: "white",
        //a la izquierda
    },

}));



const categorias = [
    {
        id: "Arte",
        img: arte,
    },
    {
        id: "Ciencia Ficción",
        img: ciencia_ficcion,
    },
    {
        id: "Fantasía",
        img: fantasia,
    },
    {
        id: "Infantil",
        img: infantil,
    },
    {
        id: "Terror",
        img: terror,
    },
    {
        id: "Aventura",
        img: aventura,
    },
    {
        id: "Viajes",
        img: viajes,
    },
    {
        id: "Romántico",
        img: romantico,
    },
    {
        id: "Policial",
        img: policial,
    },
    {
        id: "Poesía",
        img: poesia,
    },
    {
        id: "Teatro",
        img: teatro,
    },
    {
        id: "Biografía",
        img: biografias,
    },
];
let setTimeOutId;
let busquedaVariable = "";
export default function TitlebarImageList() {
    const [buscador, setBuscador] = useState()
    const [error, setError] = useState('')
    const [estado, setEstado] = useState(false)
    const [libroBuscado, setLibroBuscado] = useState(0)
    const classes = useStyles();
    const { busqueda } = useParams();
    let history = useHistory();
    const handleSubmit = async (e) => {
        setEstado(true);
        if (!buscador) {
            setEstado(false);
            return setError('Por favor ingrese un texto válido');
        }
        const res = await libroService.buscarLibro(busquedaVariable);
        setLibroBuscado(res.data, setError(''));
        console.log(res);

        if (!res.data.length) {
            return setError('No se encontraron resultados');
        }
    }

    const handleChange = (e) => {
        setError('');
        busquedaVariable = e.target.value;
        setBuscador(e.target.value);
        clearTimeout(setTimeOutId) //para que no se ejecute el setTimeOutId
        setTimeOutId = setTimeout(() => {
            if (busquedaVariable.length > 0) {
                handleSubmit(busquedaVariable);
            }
        }, 1000);
    }

    const handleClick = async (nombre) => {
        setEstado(true);
        const res = await libroService.buscarLibroGenero(nombre);
        setLibroBuscado(res.data, setError(''));
        console.log(res);
    }
    const cargaIncial = async () => {
        setLibroBuscado(0);
        if (busqueda) {
            setEstado(true);
            const res = await libroService.buscarLibro(busqueda);
            setLibroBuscado(res.data, setError(''));
            console.log(res);
            if (!res.data.length) {
                return setError('No se encontraron resultados');
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        cargaIncial();
    }, [])

    const LibroLeido = async (libroId) => {
        const usuario_id = localStorage.getItem("usuario_activo")
        const libroData = {
            'auth0id': usuario_id,
            'idLibro': libroId,
            'finLectura': false,
        }
        const res = await usuarioService.usuarioLibroLeido(libroData);
    }

    const BotonReset = () => {
        setEstado(false);
        setLibroBuscado(0);
    }

    return (
        <div className={classes.root}>

            <Grid className={classes.grid}>
                <Container className={classes.contenedor2}>
                    {/* alto y ancho mas grandes */}
                   {libroBuscado.length > 0 && <IconButton size={'small'} disableRipple={false} disableFocusRipple={true} onClick={BotonReset}>
                        <RefreshIcon sx={{ height: "auto", width: "2em", color: "#076f55", }} />
                    </IconButton>
                    }
               <div style={{  width: "2em" }}>
                </div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Buscar"
                        classes={{ input: classes.inputInput, }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => handleChange(e)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                console.log('Enter clicked!!!');
                                handleSubmit(e);
                            }
                        }}

                        autoFocus
                    />
                </div>
                </Container>
                <Typography variant="h5" className={classes.title}>
                    {error ? error : ''}
                </Typography>

                {(estado && libroBuscado.length > 0) ?

                    <ImageList rowHeight={500} className={classes.imageList} cols={3} gap={20}>
                        <ImageListItem key="Subheader" cols={3} style={{ height: 'auto' }}>
                            <ListSubheader component="div" className={classes.titulo}>Resultado</ListSubheader>
                        </ImageListItem>
                        {libroBuscado.map((item) => (
                            <ImageListItem key={item.id} style={{ width: "16.8rem", height: "23.5rem" }} >
                                <img src={item.imagenPath} alt={item.titulo} />
                                <ImageListItemBar
                                    title={item.titulo}
                                    //subtitle={<span>por: {item.autor}</span>}
                                    position='bottom'
                                    actionIcon={
                                        <IconButton aria-label={`info about ${item.titulo}`} title={"Leer este libro"}>
                                            <Link onClick={() => { LibroLeido(item._id) }} to={"/Lectura/" + item._id} >
                                                <AutoStoriesOutlinedIcon fontSize="large" className={classes.icono} />
                                            </Link>
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    :
                    <Container className={classes.contenedor} onR  >
                        <Container>
                            <ListSubheader component="div" className={classes.titulo}>Explorar todo</ListSubheader>
                            <br />
                        </Container>
                        <Container className={classes.contenedor}>

                            {categorias.map((item) =>
                            (
                                <Card style={{ maxWidth: 345, width: "18rem", background: "#99cfbf", "margin-top": "10px" }}>
                                    <CardActionArea onClick={() => handleClick(item.id)}  >
                                        <CardMedia
                                            component="img"
                                            height="auto"
                                            image={item.img}
                                            style={{ "margin-top": "-2px" }}
                                        />
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Container>
                    </Container>
                }
            </Grid>
        </div >
    );

}