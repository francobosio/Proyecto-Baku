import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
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
import { useAlert } from 'react-alert';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import * as libroServices from '../Libros/LibroService.ts';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'
import * as notificacionService from '../Notificacion/NotificacionService'
import Termino from './Termino'

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
        marginLeft: 20,
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
        backgroundColor: '#7ec2ae',
        "margin-bottom": "40px",
        "margin-top": "20px",
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
    controlEditorial: {
        '& .MuiTextField-root': {
            'backgroundColor': '#FFF',
            'borderRadius': '0.2rem',
        },
        '& .MuiInputBase-input': {
            width: '20rem',
            'color': '#000',
        },
    },
}));

let categorias = [
    { nombre: 'Aventura', disabled: false },
    { nombre: 'Ciencia Ficción', disabled: false },
    { nombre: 'Policial', disabled: false },
    { nombre: 'Fantasía', disabled: false },
    { nombre: 'Romántico', disabled: false },
    { nombre: 'Arte', disabled: false },
    { nombre: 'Biografía', disabled: false },
    { nombre: 'Poesía', disabled: false },
    { nombre: 'Teatro', disabled: false },
    { nombre: 'Infantil', disabled: false },
    { nombre: 'Terror', disabled: false },
];
const conflictos = {
    'Aventura': ['Arte', 'Biografía'],
    'Terror': ['Biografía', 'Arte', 'Romántico'],
    'Ciencia Ficción': ['Arte', 'Biografía'],
    'Policial': ['Arte', 'Biografía', 'Infantil'],
    'Fantasía': ['Arte', 'Biografía'],
    'Romántico': ['Arte', 'Biografía', 'Infantil'],
    'Arte': ['Aventura', 'Ciencia Ficción', 'Policial', 'Romántico', 'Fantasía', 'Poesía', 'Teatro'],
    'Biografía': ['Aventura', 'Ciencia Ficción', 'Policial', 'Romántico', 'Fantasía', 'Poesía', 'Infantil'],
    'Poesía': ['Arte', 'Biografía'],
    'Teatro': ['Arte'],
    'Infantil': ['Biografía', 'Policial', 'Romántico'],
}

export default function MiniDrawer() {
    const [categoriaLibro, setCategoriaLibro] = useState([]);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [pdf, setPdf] = useState("");
    const [libro, setLibro] = useState({ titulo: "", descripcion: "" });
    const [aceptaTerminos, setAceptaTerminos] = useState(false)
    const [aptoTodoPublico, setAptoTodoPublicos] = useState(false)
    const [estado, setEstado] = useState("Registrado")
    const [scroll, setScroll] = useState(true)
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Estas variables son para el control de los errores en el form
    const [errorTitulo, setErrorTitulo] = useState(null);
    const [errorSelect, setErrorSelect] = useState(null);
    const inputTitulo = useRef("");
    const inputCombo = useRef();
    const inputDescripcion = useRef("")
    const inputEditorial = useRef("")

    // Esta variable es para los mensajes de alerta
    const alert = useAlert();

    /* metodo para deshabilitar los géneros que tengan conflictos entre si */
   
    const handleSelectChange = (event) => {
        categorias.map((value) => (
            value.disabled = false
        ))
        if (event.target.value.length > 0) {
            console.log(event.target.value)
            for (let i = 0; i < event.target.value.length; i++) {
                const nombre = event.target.value[i].nombre;
                for (let j = 0; j < conflictos[nombre].length; j++) {
                    let con = conflictos[nombre][j];
                    for (let k = 0; k < categorias.length; k++) {
                        if (categorias[k].nombre === con) {
                            categorias[k].disabled = true;
                            break;
                        }
                    }
                }
            }
        }
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
        setLibro({ ...libro, [e.target.name]: e.target.value })
    }

    const handleAceptaTerminoChange = e => {
        setAceptaTerminos(e.target.checked)
    }

    const handleParaTodoPublicoChange = e => {
        setAptoTodoPublicos(e.target.checked)
    }

    /* Método para realizar la carga de un nuevo libro a la base de datos. Primero valida los campos, luego sin son válidos crea un archivo que contiene todos los campos del
    libro y los manda a la BD. luego recibe por parámetro el id del libro y se le asigna ese id a los libros publicados del usuario */
    const handleSubmit = async e => {
        if (validate()) {
            e.preventDefault();
            const usuario_auth0Id = localStorage.getItem("usuario_activo")
            const usuario = localStorage.getItem("usuario")
            const avatar = localStorage.getItem("avatar")
            const formData = new FormData();    //formdata object
            formData.append("imagenPath", image.raw);
            formData.append("titulo", libro.titulo);
            formData.append("descripcion", libro.descripcion);
            formData.append("archivoTexto", pdf)
            categoriaLibro.map((value) => {
                return formData.append('genero', value.nombre);
            })
            formData.append("aptoTodoPublico", aptoTodoPublico);
            formData.append("aceptaTerminos", aceptaTerminos);
            formData.append("estado", estado)
            formData.append("editorial", libro.editorial)
            formData.append("autor", libro.autor)
            formData.append("usuario", usuario)
            formData.append("avatar", avatar)
            const res = await libroServices.createLibro(formData);
            const idData = {
                'auth0id': usuario_auth0Id,
                'idLibro': res.data.libro._id
            };
            const nuevaNotificacion = {
                'auth0usuario': localStorage.getItem("usuario_activo"),
                'titulo': "El usuario " + localStorage.getItem("usuario") + " ha subido:",
                'descripcion': libro.descripcion,
                'avatar': localStorage.getItem("avatar"),
                'tipo': "subidaLibro",
                'esNoleido': true,
                'id_libro': res.data.libro._id
            }
            await usuarioService.usuarioLibroCargado(idData);
            console.log(nuevaNotificacion)
             await notificacionService.createNotificacion(nuevaNotificacion);
            alert.show("El libro se cargó correctamente!", { type: 'success', position: 'top center' });
            resetForm();
        }
    }

    /* Método para resetear todos los campos del formulario. Se ejecuta al cargar un nuevo libro */
    const resetForm = () => {
        setAceptaTerminos(null);
        setAptoTodoPublicos(null);
        setLibro({});
        setPdf("");
        setImage({ preview: "", raw: "" });
        setCategoriaLibro([]);
        setErrorSelect(null);
        setErrorTitulo(null);
        inputTitulo.current.value = "";
        inputCombo.current.value = [];
        inputDescripcion.current.value = "";
        inputEditorial.current.value = "";
        categorias.map((value) => (
            value.disabled = false
        ))
    }

    /* Método para validar todos los campos del formulario. Se ejecuta al intentar cargar un nuevo libro */
    const validate = () => {
        // creo una variable temporal temp y guardo en ella cadenas vacias si los campos son correctos u otra cadena cualquiera si no lo son
        let temp = {}
        temp.img = image.raw !== "" ? "" : "Imagen"
        temp.titulo = inputTitulo.current.value.trim() !== "" ? "" : "titulo"
        temp.pdf = pdf !== "" ? "" : "pdf"
        temp.select = inputCombo.current.value.length !== 0 ? "" : "select"
        temp.terminos = aceptaTerminos ? "" : "Terminos"

        // verifico si existen errores y seteo la variable de correspondiente a true para marcar los campos en rojo
        inputTitulo.current.value.trim() !== "" ? setErrorTitulo(false) : setErrorTitulo(true)
        inputCombo.current.value.length !== 0 ? setErrorSelect(false) : setErrorSelect(true)

        // genero alertas si la portada o el titulo no son correctos
        temp.img !== "" && alert.show("Se debe cargar una portada para continuar!", { type: 'error', position: 'top right' })
        temp.pdf !== "" && alert.show("Se debe cargar un libro para continuar!", { type: 'error', position: 'top right' })

        // verifico si en temp existen cadenas no vacias, en ese caso reorna false y no continua, si todas las cadenas son vacias retorna true y continua
        return Object.values(temp).every(x => x === "")
    }
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const esElFinal = () => {
        let element = document.getElementById("contenido");

        if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
            setScroll(false)
        }
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
                            <Grid container spacing={1} className={classes.centrar}>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12} className={classes.centrar}>
                                    <Typography className={classes.titulo} variant="h4" gutterBottom >
                                        Publicá tu libro
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
                                        inputRef={inputDescripcion}
                                        rows={8}
                                        multiline
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.controlEditorial}>
                                    <Typography className={classes.textoDestacado}>Editorial</Typography>
                                    <TextField
                                        name="editorial"
                                        inputRef={inputEditorial}
                                        autoFocus
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.controlEditorial}>
                                    <Typography className={classes.textoDestacado}>Autor</Typography>
                                    <TextField
                                        name="autor"
                                        inputRef={inputEditorial}
                                        autoFocus
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.textoDestacado}>Género</Typography>
                                    <FormControl className={classes.controlCombo} error={errorSelect}>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            name="genero"
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
                                        control={<Checkbox className={classes.customCheckbox} color="secondary" name="aptoTodoPublico" onChange={handleParaTodoPublicoChange} />}
                                        label="Apto para todo público "
                                    />
                                </Grid >
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        className={classes.controlLabel}
                                        control={<Checkbox className={classes.customCheckbox} color="secondary" name="AceptaTerminosCondiciones" checked={aceptaTerminos} onChange={handleAceptaTerminoChange} />}
                                        label={`Al subir mi libro acepto los términos y condiciones de Baku`}
                                    />
                                    <Button size="small" onClick={handleClickOpen}>Ver términos y condiciones</Button>
                                    <div>
                                        <Dialog
                                            fullScreen={fullScreen}
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="responsive-dialog-title"
                                        >
                                            <DialogTitle id="responsive-dialog-title">
                                                {"Términos y condiciones de Baku"}
                                            </DialogTitle>
                                            <DialogContent id="contenido" onScroll={esElFinal}>
                                                <Termino />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleClose} disabled={scroll} >
                                                    Cerrar
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </Grid >
                                <Grid item xs={12} >
                                    <Button component="label" startIcon={<UploadIcon />} className={classes.btnPdf + " " + classes.centrar}> Subí el contenido de tu libro
                                        <input
                                            type="file"
                                            name="archivoTexto"
                                            onChange={handlePdfChange}
                                            hidden
                                            accept=".pdf"
                                        />
                                    </Button>
                                </Grid>

                                <Grid item xs={12} style={{ marginTop: "1rem" }}>
                                    <Button className={classes.btnPublicar + " " + classes.centrar} onClick={handleSubmit} variant="contained" disabled={!aceptaTerminos}>Publicar</Button>
                                </Grid>
                                <Grid item xs={12} >
                                    <br />
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
