import React, { useState, useRef } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, FormHelperText, Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import UploadIcon from '@material-ui/icons/Publish';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {useAlert} from 'react-alert'

import * as libroServices from '../Libros/LibroService.ts'

const useStyles = makeStyles((theme) => ({
    root: {
        'background': '#99cfbf',
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    icono: {
        marginLeft: -3,
    },
    toolbar: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    carousel: {
        marginTop: 11,
        marginHorizon: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    link: {
        color: "white",
        "text-decoration": "none",
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    slider: {
        marginTop: 500,
    },
    titulo: {
        marginLeft: 20,
    },
    btnPublicar: {
        'background-color': '#4B9C8E',
        'borderRadius': '5rem',
        width: '15rem',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        }
    },
    titulo: {
        'fontSize': '2.5em',
        'fontWeight': 'bold',
    },
    textoDestacado: {
        'fontSize': '1.5rem',
    },
    btnArchivo: {
        'background-color': '#4B9C8E',
        'width': '20rem',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        },

    },
    btnPdf: {
        'background-color': '#4B9C8E',
        'width': '25rem',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        }
    },
    customCheckbox: {
        'color': '#076F55',
    },
    controlLabel: {
        '& > .MuiCheckbox-colorSecondary.Mui-checked': {
            'color': '#076F55',
        },
    },
    controlTitulo: {
        '& .MuiTextField-root': {
            'backgroundColor': '#FFF',
            'borderRadius': '0.2rem',
        },
        '& .MuiInputBase-input': {
            width: '20rem',
            'color': '#000',
            'fontWeight': 'bold',
        },
        '& .MuiFormHelperText-root.Mui-error': {
            fontSize: '1.2rem',
            background: '#7ec2ae',
            color: '#f00'
        }
    },
    controlCombo: {
        '& .MuiInputBase-input': {
            'backgroundColor': '#fff',
            'borderRadius': '0.2rem',
            minWidth: '20rem',
            maxWidth: '35rem',
        },
        '& .MuiChip-root': {
            'color': '#000',
            'backgroundColor': '#4B9C8E',
            'fontSize': '1rem'
        },
        '& .MuiFormHelperText-root.Mui-error': {
            fontSize: '1.2rem',
            background: '#7ec2ae',
            color: '#f00'
        }
    },
    texto: {
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    centrar: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
    },
    imagen: {
        paddingBottom: '1rem'
    },
    fondo: {
        width: '60rem',
        backgroundColor: '#7ec2ae'
    },
    textoMultiple: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0),
            width: '35rem',
            'backgroundColor': '#fff',
            'borderRadius': '0.2rem',
        },
        '& .MuiInputBase-input': {
            'color': '#000',
            'backgroundColor': '#fff',
            'borderRadius': '0.2rem',
            margin: theme.spacing(0),
            width: '35rem',
        }
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const categorias = [
    { nombre: 'Aventura', conflictos: ["Arte", "Biografia"], disabled: false },
    { nombre: 'Ciencia Ficción', disabled: false },
    { nombre: 'Policial', disabled: false },
    { nombre: 'Fantasía', disabled: false },
    { nombre: 'Romántico', disabled: false },
    { nombre: 'Arte', disabled: false },
    { nombre: 'Biografía', disabled: false },
    { nombre: 'Poesía', disabled: false },
    { nombre: 'Teatro', disabled: false },
    { nombre: 'Infantil', disabled: false },
];


export default function MiniDrawer() {
    const theme = useTheme();
    const [categoriaLibro, setCategoriaLibro] = React.useState([]);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [pdf, setPdf] = useState("");
    const [libro, setLibro] = useState({ titulo: "", descripcion: "" });

    // Estas variables son para el control de los errores en el form
    const [errorTitulo, setErrorTitulo] = useState(null);
    const [errorSelect, setErrorSelect] = useState(null);
    const inputTitulo = useRef("");
    const inputCombo = useRef();

    // Esta variable es para los mensajes de alerta
    const alert = useAlert();

    const handleSelectChange = (event) => {
        setCategoriaLibro(event.target.value);
    };

    const handleImageChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };
    
    const handlePdfChange = e => {
        if (e.target.files.length) {
            setPdf(e.target.files[0])
        }
    };

    const handleInputChange = e => {
         setLibro({...libro , [e.target.name]: e.target.value })
    } 

    const handleSubmit = async e => {
        if (validate()){
            e.preventDefault();
            const formData = new FormData();    //formdata object
            formData.append("imagenPath",image.raw);
            formData.append("titulo",libro.titulo);
            formData.append("descripcion",libro.descripcion);
            formData.append("archivoTexto",pdf)
            const res = await libroServices.createLibro(formData);
           console.log(res)
        }
    }

    const validate = () => {
        // creo una variable temporal temp y guardo en ella cadenas vacias si los campos son correctos u otra cadena cualquiera si no lo son
        let temp = {}
        temp.img = image.raw != "" ? "" : "Imagen"
        temp.titulo = inputTitulo.current.value.trim() != "" ? "" : "titulo"
        temp.pdf = pdf != "" ? "" : "pdf"
        temp.select = inputCombo.current.value.length != 0 ? "" : "select"

        // verifico si existen errores y seteo la variable de correspondiente a true para marcar los campos en rojo
        inputTitulo.current.value.trim() != "" ? setErrorTitulo(false) : setErrorTitulo(true)
        inputCombo.current.value.length != 0 ? setErrorSelect(false) : setErrorSelect(true)
        
        // genero alertas si la portada o el titulo no son correctos
        temp.img != "" && alert.show("Se debe cargar una portada para continuar")
        temp.pdf != "" && alert.show("Se debe cargar un libro para continuar")

        // verifico si en temp existen cadenas no vacias, en ese caso reorna false y no continua, si todas las cadenas son vacias retorna true y continua
        return Object.values(temp).every(x => x == "")
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MiDrawer />
            <main className={classes.content}>
                <AppBar />
                <React.Fragment>
                    <Container className={classes.fondo}>
                        <FormControl onSubmit={handleSubmit} >
                            <Grid container spacing={2} className={classes.centrar}>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12} className={classes.centrar}>
                                    <Typography className={classes.titulo} variant="h4" gutterBottom >
                                        Publicá tu historia
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.textoDestacado}>Portada</Typography>
                                    <label htmlFor="upload-button" className={classes.centrar}>
                                        {image.preview ? (
                                            <img src={image.preview} alt="dummy" width="230" height="300" className={classes.imagen} />
                                        ) : (
                                            <>
                                                <span className="fa-stack fa-2x mt-3 mb-2">
                                                    <i className="fas fa-circle fa-stack-2x" />
                                                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                                                </span>
                                            </>
                                        )}
                                    </label>
                                    <Grid item xs={12} >
                                    </Grid>
                                    <Button component="label" startIcon={<UploadIcon />} className={classes.btnArchivo + " " + classes.centrar}> Subí tu Portada
                                        <input
                                            type="file"
                                            name="imagenPath"
                                            onChange={handleImageChange}
                                            hidden
                                            accept=".png,.jpg,.raw,.jpeg"
                                            error
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} className={classes.controlTitulo}>
                                    <Typography className={classes.textoDestacado}>Título</Typography>
                                    <TextField
                                        required
                                        name="titulo"
                                        inputRef={inputTitulo}
                                        autoFocus
                                        onChange={handleInputChange}
                                        error={errorTitulo}
                                        helperText={errorTitulo && "El libro debe tener un titulo"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.textoDestacado}>Descripción</Typography>
                                    <TextField
                                        className={classes.textoMultiple}
                                        name="descripcion"
                                        rows={8}
                                        multiline
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.textoDestacado}>Género</Typography>
                                    <FormControl className={classes.controlCombo} error={errorSelect}>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            inputRef={inputCombo}
                                            value={categoriaLibro}
                                            onChange={handleSelectChange}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value.nombre} label={value.nombre} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {categorias.map((categoria) => (
                                                <MenuItem key={categoria.nombre} value={categoria} disabled={categoria.disabled}>
                                                    {categoria.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errorSelect && <FormHelperText>{"Se debe seleccionar al menos una categoria"}</FormHelperText>}
                                    </FormControl>
                                    <InputLabel id="demo-mutiple-chip-label"></InputLabel>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        className={classes.controlLabel}
                                        control={<Checkbox className={classes.customCheckbox} color="secondary" name="saveAddress" value="yes" />}
                                        label="Apto para todo público "
                                    />
                                </Grid >
                                <Grid item xs={12} >
                                    <Button component="label" startIcon={<UploadIcon />} className={classes.btnPdf + " " + classes.centrar}> Cargar contenido del libro
                                        <input
                                            type="file"
                                            name="archivoTexto"
                                            onChange={handlePdfChange}
                                            hidden
                                            accept=".pdf"
                                        />
                                    </Button>
                                    <label htmlFor="archivoTexto">
                                        {pdf.preview ? (
                                            <Typography className={classes.centrar + " " + classes.texto}>{pdf.preview}</Typography>
                                        ) : (
                                            <>
                                                <span className="fa-stack fa-2x mt-3 mb-2">
                                                    <i className="fas fa-circle fa-stack-2x" />
                                                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </Grid>
                                <Grid item xs={12} >
                                    <Button className={classes.btnPublicar + " " + classes.centrar} onClick={handleSubmit} variant="contained">Publicar</Button>
                                </Grid>
                                <Grid item xs={12} >
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Container>
                </React.Fragment>
                <Footy />
            </main>

        </div >
    );
}
