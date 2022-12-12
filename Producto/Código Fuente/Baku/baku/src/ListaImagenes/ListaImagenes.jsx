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
import ReplyIcon from '@mui/icons-material/Reply';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { ButtonBase, CardActionArea } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import { useTheme } from '@mui/material/styles';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService';
import { Box } from '@mui/system';

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
        height: '3em',
        maxWidth: '26em',
        marginTop: '2.5em',
        marginBottom: '1.5em',

        [theme.breakpoints.only('xs')]: {
            maxWidth: '18em',
            marginRight: '410px'
        }
    },
    searchIcon: {
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
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'space-between',
        'flex-wrap': 'wrap',
        [theme.breakpoints.only('xs')]: {
            maxWidth: '30em',
            paddingLeft: '3em',
            paddingRight: '3em',
        }
    }, contenedor3: {
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'space-between',
        'flex-wrap': 'wrap',
        [theme.breakpoints.only('xs')]: {
            maxWidth: '30em',
            paddingLeft: '4.2em',
            paddingRight: '3em',
        }
    },
    contenedor2: {
        display: 'flex',
        width: "75rem",
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

function useWidth() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}

const calculo = (width) => {
    if (width > 1100) {
        const ancho = width;
        return ancho
    } else if (width <= 1100) {
        const ancho = 1000;
        return ancho
    }
}
export default function TitlebarImageList() {
    const [ejecuto, setEjecuto] = useState(false)
    const [buscador, setBuscador] = useState()
    const [error, setError] = useState('')
    const [estado, setEstado] = useState(false)
    const [libroBuscado, setLibroBuscado] = useState(0)
    const classes = useStyles();
    const { busqueda } = useParams();
    const theme = useTheme();
    const valor = theme.breakpoints.values[useWidth()];
    let columnas = 5;
    let distanciReturn = 430;
    let tamañoReturn, flagReturn = false;
    let PaddingTitulo;
    let altura
    if (useMediaQuery(theme.breakpoints.only('xs'))) { altura = 1000; columnas = 2; distanciReturn = 89; flagReturn = false; tamañoReturn = '1.5em'; PaddingTitulo = '1.9em' }
    if (useMediaQuery(theme.breakpoints.only('sm'))) { altura = 1000; columnas = 3; distanciReturn = 150; flagReturn = false; }
    if (useMediaQuery(theme.breakpoints.only('md'))) { altura = 1000; columnas = 4; distanciReturn = 220; flagReturn = true; }
    if (useMediaQuery(theme.breakpoints.only('lg'))) { altura = 1200; columnas = 5; distanciReturn = 380; flagReturn = true; }
    if (useMediaQuery(theme.breakpoints.only('xl'))) { altura = 1536; columnas = 5; distanciReturn = 430; flagReturn = true; }
    const width = calculo(valor);
    const handleSubmit = async (e) => {
        setEstado(true);
        if (!buscador) {
            setEstado(false);
            return setError('Por favor ingrese un texto válido');
        }
        const res = await libroService.buscarLibro(busquedaVariable);
        setLibroBuscado(res.data, setError(''));

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
        setEjecuto(true)
    }

    let avisoVisible = false
    if(ejecuto){
        if(libroBuscado.length !== 0){
            avisoVisible = false
        }
        else {
            avisoVisible = true
        }
    }

    const cargaIncial = async () => {
        setLibroBuscado(0);
        if (busqueda) {
            setEstado(true);
            const res = await libroService.buscarLibro(busqueda);
            setLibroBuscado(res.data, setError(''));
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
        await usuarioService.usuarioLibroLeido(libroData);
    }

    const BotonReset = () => {
        setEstado(false);
        setLibroBuscado(0);
    }

    return (
        <div className={classes.root}>

            <Grid className={classes.grid}>
                <Container className={classes.contenedor2}>
                    {estado && !flagReturn && <Container style={{ display: 'flex', marginBottom: '-40px' }}>
                        <IconButton disableRipple={false} disableFocusRipple={true} onClick={BotonReset} style={{ left: '22em' }}>
                            <ReplyIcon sx={{ fontSize: "2em", height: "1.1em", color: "#111111" }} />
                        </IconButton>
                    </Container>}
                    <Container fixed className={classes.search} style={{ marginRight: 'auto' }}>
                        {estado && (flagReturn) && <IconButton size={'large'} disableRipple={false} disableFocusRipple={true} onClick={BotonReset}
                            style={{ left: (-distanciReturn), marginRight: -84.3 }}>
                            <ReplyIcon sx={{ fontSize: "2.5em", height: "auto", color: "#076f55" }} />
                        </IconButton>
                        }
                        <SearchIcon className={classes.searchIcon} />
                        <InputBase
                            placeholder="Autor, Título, Editorial"
                            classes={{ input: classes.inputInput, }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => handleChange(e)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(e);
                                }
                            }}
                            autoFocus
                        />
                    </Container>
                </Container>
                <Typography variant="h5" className={classes.title}>
                    {error ? error : ''}
                </Typography>
                {(estado) ? ( libroBuscado.length > 0 ? 
                        <Container fixed className={classes.contenedor3} sx={{ marginLeft: '2.5em' }}>
                            <ImageList rowHeight={width / 4.1} style={{ width: (width * 1.5), marginLeft: '2.5em' }} cols={columnas} gap={20}>
                                <ImageListItem key="Subheader" cols={columnas} style={{ height: 'auto' }}>
                                    <ListSubheader component="div" className={classes.titulo} style={{ paddingLeft: PaddingTitulo }}>Resultado</ListSubheader>
                                </ImageListItem>
                                {libroBuscado.map((item) => (
                                    <ImageListItem key={item.id} style={{ width: altura / 6.6, height: altura / 4 }}>
                                        <img src={item.imagenPath} alt={item.titulo} style={{ objectFit: 'cover' }} />
                                        <ImageListItemBar
                                            title={item.titulo}
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
                        </Container> 
                        :
                        <div>
                            {avisoVisible && (
                                <Typography variant={flagReturn ? "h4" : "h6"} className={classes.title}>
                                    "No hay libros para este género"
                                </Typography>
                            )}
                        </div>
                    )
                    :
                    <Container className={classes.contenedor} fixed >
                        <Container >
                            <ListSubheader component="div" className={classes.titulo} style={{ paddingLeft: PaddingTitulo }}>Explorar todo</ListSubheader>
                            <br />
                        </Container>
                        <Container className={classes.contenedor} fixed>
                            {categorias.map((item) =>
                            (
                                <Box sx={{ minWidth: "7em", width: "23.3%", margin: "0.5em", }}>
                                    <Card style={{ background: "#99cfbf", "margin-top": "10px" }}>
                                        <CardActionArea onClick={() => handleClick(item.id)} >
                                            <CardMedia
                                                component="img"
                                                height="70%"
                                                image={item.img}
                                                style={{ "margin-top": "-2px" }}
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            ))}
                        </Container>
                    </Container>
                    
                }
            </Grid>
        </div >
    );

}