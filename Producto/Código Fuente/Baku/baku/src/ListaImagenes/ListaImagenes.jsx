import { useState } from 'react';
import * as libroService from '../Libros/LibroService'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Grid } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Typography from '@material-ui/core/Typography';
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
        'background': '#99cfbf',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        "margin-bottom": "2rem"
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
    divider: {
        padding: '2vh 0 2vh 0',
        backgroundColor: '#fff',
    },
    imagen: {
        top: "50%",
        width: "100%",
        "position": "relative",
        transform: "translateY(-50%)",
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
        color: '#932121'
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
let setTimeOutId;
let busquedaVariable = "";
export default function TitlebarImageList() {
    const [buscador, setBuscador] = useState()
    const [error, setError] = useState('')
    const [estado, setEstado] = useState(false)
    const [libroBuscado, setLibroBuscado] = useState(0)
    const classes = useStyles();

    const handleSubmit = async (e) => {
        setEstado(true);
        if (!buscador) {
            return setError('Por favor ingrese un texto valido');
        }
        const res = await libroService.buscarLibro(busquedaVariable);
        setLibroBuscado(res.data, setError(''));
        console.log(res);

        if (!res.data.length) {
            return setError('No se encontraron resultados');
        }
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        busquedaVariable = e.target.value;
        setBuscador(e.target.value);
        console.log(busquedaVariable)
        clearTimeout(setTimeOutId) //para que no se ejecute el setTimeOutId
        setTimeOutId = setTimeout(() => {
            if (busquedaVariable.length > 0) {
                console.log('Se esta buscando');
                handleSubmit(busquedaVariable);
            }
        }, 1000);
    }
    let array = [];
    return (
        <div className={classes.root}>
            <Grid className={classes.grid}>
                <Divider className={classes.divider} />
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
                <Typography variant="h5" className={classes.title}>
                    {error ? error : ''}
                </Typography>

                {(estado && libroBuscado.length > 0) ?

                    <ImageList rowHeight={500} className={classes.imageList} cols={5} gap={20}>
                        <ImageListItem key="Subheader" cols={5} style={{ height: 'auto' }}>
                            <br />
                        </ImageListItem>
                        {libroBuscado.map((item) => (
                            <ImageListItem key={item.id} style={{ width: "16.8rem", height: "23.5rem" }} >
                                {array = item.archivoTexto.split("/")}
                                <img src={item.imagenPath} alt={item.titulo} />
                                <ImageListItemBar
                                    title={item.titulo}
                                    //subtitle={<span>por: {item.autor}</span>}
                                    position='bottom'
                                    actionIcon={
                                        <IconButton aria-label={`info about ${item.titulo}`} title={"Leer este libro"}>
                                            <Link to={"/Lectura/" + array[array.length - 2] + "/" + array[array.length - 1]} >
                                                <LocalLibraryOutlinedIcon className={classes.icono} />
                                            </Link>
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>

                    :
                    <ImageList rowHeight={320} className={classes.imageList} cols={3} gap={20} >
                        <ImageListItem key="Subheader" cols={3} style={{ height: 'auto' }}>
                            <ListSubheader component="div" className={classes.titulo}>Explorar todo:</ListSubheader>
                        </ImageListItem>
                        {categorias.map((item) => (
                            <ImageListItem key={item.img}>
                                <img src={item.img} alt={item.title} />
                            </ImageListItem>
                        ))}
                    </ImageList>

                }
            </Grid>
        </div >
    );

}