import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, FormHelperText, Tooltip, Typography } from '@material-ui/core';
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
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import InfoIcon from '@mui/icons-material/Info';

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
        'width': '30em',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        },
        [theme.breakpoints.down('sm')]: {
            'width': '19em',
        }

    },
    btnPdf2: {
        'background-color': '#4B9C8E',
        'width': '30em',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        },
        [theme.breakpoints.down('sm')]: {
            'width': '19em',
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
            minWidth: '16rem',
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
        justifyContent: 'left',
    },
    imagen: {
        paddingBottom: '1rem'
    },
    fondo: {
        width: '60rem',
        backgroundColor: '#7ec2ae',
        "margin-bottom": "40px",
        "margin-top": "20px",
        [theme.breakpoints.only('xs')]: {
            maxWidth: '23em',
            minWidth: '23em',
            marginLeft: "0.4em",
        },
    },
    textoMultiple: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0),
            'backgroundColor': '#fff',
            'borderRadius': '0.2rem',
        },
        '& .MuiInputBase-input': {
            'color': '#000',
            'backgroundColor': '#fff',
            'borderRadius': '0.2rem',
            margin: theme.spacing(0),
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

    controlCombo2: {
        '& .MuiTextField-root': {
            'backgroundColor': '#FFF',
            'borderRadius': '0.2rem',
        },
        '& .MuiInputBase-input': {
            width: '17.7rem',
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
    const [archivoSubido, setarchivoSubido] = useState(false);
    const [libro, setLibro] = useState({ titulo: "", descripcion: "" });
    const [aceptaTerminos, setAceptaTerminos] = useState(false)
    const [aptoTodoPublico, setAptoTodoPublicos] = useState(false)
    const [estado, setEstado] = useState("Registrado")
    const [bloquearPublicar, setBloquearPublicar] = useState(true)
    const [scroll, setScroll] = useState(true)
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [abrirDialog, setabrirDialog] = React.useState(false);
    const [pdfTitle, setPdfTitle] = useState("");
    let tamaño;
    let ocultar = false;
    if (useMediaQuery(theme.breakpoints.only('xs'))) { tamaño = 100; ocultar = true }
    if (useMediaQuery(theme.breakpoints.only('sm'))) { tamaño = 150; ocultar = true }
    if (useMediaQuery(theme.breakpoints.only('md'))) { tamaño = 300; ocultar = false }
    if (useMediaQuery(theme.breakpoints.only('lg'))) { tamaño = 600; ocultar = false }
    if (useMediaQuery(theme.breakpoints.only('xl'))) { tamaño = 900; ocultar = false }
    const handleCloseDialog = () => {
        setabrirDialog(false);
    };

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

    useEffect(() => {
        let temp = {}
        temp.img = image.raw !== "" ? "" : "Imagen";
        temp.titulo = inputTitulo.current.value.trim() !== "" ? "" : "titulo";
        temp.pdf = pdf !== "" ? "" : "pdf";
        temp.descripcion = inputDescripcion.current.value.trim() !== "" ? "" : "Descripcion";
        temp.select = inputCombo.current.value.length !== 0 ? "" : "select";
        temp.terminos = aceptaTerminos ? "" : "Terminos";

        setBloquearPublicar(!Object.values(temp).every(x => x === ""))
    }, [pdf, libro, aceptaTerminos, categoriaLibro, image])

    const handleSelectChange = (event) => {
        categorias.map((value) => (
            value.disabled = false
        ))
        if (event.target.value.length > 0) {
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
        if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg") {
            if (e.target.files[0].size <= 204800) {
                if (e.target.files.length) {
                    setImage({
                        preview: URL.createObjectURL(e.target.files[0]),
                        raw: e.target.files[0]
                    });
                }
            } else {
                setImage({ preview: "", raw: "" });
                alert.error("Error al subir el archivo, solo se permiten imágenes que pesen menos de 200 Kb");
            }
        }
        else {
            setImage({ preview: "", raw: "" });
            alert.error("Error al subir el archivo, solo se permiten archivos JPG, PNG ó jPEG");
        }
    };

    const handlePdfChange = e => {
        if (e.target.files[0].type === "application/pdf") {
            if (e.target.files[0].size <= 26214400) {
                if (e.target.files.length) {
                    setPdfTitle(e.target.files[0].name)
                    setPdf(e.target.files[0])
                }
                /* si se selecciono un archivo cambiar el boton */
                if (e.target.files[0]) {
                    setarchivoSubido(true)
                } else {
                    setarchivoSubido(false)
                }
            } else {
                setPdf("");
                setPdfTitle("");
                setarchivoSubido(false)
                alert.error("Error al subir el archivo, solo se permiten archivos de texto que pesen menos de 25 Mb")
            }
        } else {
            setPdf("");
            setPdfTitle("");
            setarchivoSubido(false)
            alert.error("Error al subir el archivo, solo se permiten archivos PDF")
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
        setabrirDialog(false)
        if (validate()) {
            e.preventDefault();
            const usuario_auth0Id = localStorage.getItem("usuario_activo")
            const alias = localStorage.getItem("alias")
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
            formData.append("usuario", usuario_auth0Id)
            formData.append("alias", alias)
            formData.append("avatar", avatar)
            await libroServices.createLibro(formData);

            alert.show("El libro se cargó correctamente!", { type: 'success', position: 'top center' });
            resetForm();
        }
    }

    /* Método para resetear todos los campos del formulario. Se ejecuta al cargar un nuevo libro */
    const resetForm = () => {
        setarchivoSubido(false);
        setAceptaTerminos(false);
        setAptoTodoPublicos(false);
        setLibro({});
        setPdf("");
        setPdfTitle("");
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
        setBloquearPublicar(true)
        // creo una variable temporal temp y guardo en ella cadenas vacias si los campos son correctos u otra cadena cualquiera si no lo son
        let temp = {}
        temp.img = image.raw !== "" ? "" : "Imagen"
        temp.titulo = inputTitulo.current.value.trim() !== "" ? "" : "titulo"
        temp.pdf = pdf !== "" ? "" : "pdf"
        temp.descripcion = inputDescripcion.current.value.trim() !== "" ? "" : "Descripcion"
        temp.select = inputCombo.current.value.length !== 0 ? "" : "select"
        temp.terminos = aceptaTerminos ? "" : "Terminos"

        // verifico si existen errores y seteo la variable de correspondiente a true para marcar los campos en rojo
        inputTitulo.current.value.trim() !== "" ? setErrorTitulo(false) : setErrorTitulo(true)
        inputCombo.current.value.length !== 0 ? setErrorSelect(false) : setErrorSelect(true)

        // genero alertas si la portada o el titulo no son correctos
        temp.img !== "" && alert.show("Se debe cargar una portada para continuar!", { type: 'error', position: 'top right' })
        temp.pdf !== "" && alert.show("Se debe cargar un libro para continuar!", { type: 'error', position: 'top right' })

        // verifico si en temp existen cadenas no vacias, en ese caso reorna false y no continua, si todas las cadenas son vacias retorna true y continua
        return (Object.values(temp).every(x => x === "") && aceptaTerminos);
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
        <Grid container direction="row" className={classes.root}>
            <Grid item container direction="column" xs={1}  >
                <MiDrawer pestaña={6} />
            </Grid>
            <Grid item container direction="column" xs={11}>
                <AppBar />
                <Grid item component={'main'}  >
                    <Container fixed className={classes.fondo}>
                        <FormControl onSubmit={handleSubmit} >
                            <Grid container spacing={1} className={classes.centrar}>
                                <Grid item xs={12} className={classes.centrar}>
                                    <Typography className={classes.titulo} variant="h4" gutterBottom >
                                        Publicá tu libro
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography className={classes.textoDestacado}>Portada *</Typography>
                                    <label htmlFor="upload-button" className={classes.centrar} style={{ justifyContent: "center", alignSelf: "center", display: "flex" }}>
                                        {image.preview ? (
                                            <img src={image.preview} alt="dummy" width="215" height="300" className={classes.imagen} />
                                        ) : (
                                            <>
                                                <span className="fa-stack fa-2x mt-3 mb-2">
                                                    <i className="fas fa-circle fa-stack-2x" />
                                                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                                                </span>
                                            </>
                                        )}
                                    </label>
                                    <Grid container xs={12} direction="row" alignItems="center" justify="center" sx={{ marginTop: '2em' }} >
                                        <Button component="label" startIcon={<UploadIcon />} style={{ justifyContent: "center", alignSelf: "center" }} className={classes.btnArchivo + " " + classes.centrar}> Subí tu Portada
                                            <input
                                                type="file"
                                                name="imagenPath"
                                                onChange={handleImageChange}
                                                hidden
                                                accept=".png,.jpg,.jpeg"
                                            />
                                        </Button>
                                        <Tooltip title="El archivo puede estar en formato PNG, JPG o JPEG (Peso máximo 200 Kb)" placement="right" arrow sx={{ fontSize: '1.5em', size: 'large' }}>
                                            <InfoIcon />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.controlTitulo}>
                                    <Typography className={classes.textoDestacado}>Título *</Typography>
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
                                <Grid item xs={10} style={{ width: tamaño }} >
                                    <Typography className={classes.textoDestacado}>Descripción *</Typography>
                                    <TextField
                                        className={classes.textoMultiple}
                                        fullWidth
                                        name="descripcion"
                                        inputRef={inputDescripcion}
                                        rows={7}
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
                                <Grid item xs={12} >
                                    {ocultar ?
                                        <Stack spacing={2} direction="row" alignItems="center" className={classes.controlEditorial}>
                                            <Typography className={classes.textoDestacado}>Género *</Typography>
                                            <Tooltip title="Para quitar un genero haga click encima del mismo nuevamente" placement="right" arrow sx={{ marginLeft: '0.7em', fontSize: '1.5em', size: 'large' }}>
                                                <InfoIcon />
                                            </Tooltip>
                                        </Stack> :
                                        <Typography className={classes.textoDestacado}>Género *</Typography>}
                                    <Stack spacing={2} direction="row" alignItems="center" className={classes.controlCombo2}>
                                        <FormControl className={classes.controlCombo} error={errorSelect} >
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
                                        <InputLabel style={{ minWidth: '23rem' }} id="demo-mutiple-chip-label"></InputLabel>
                                        {!ocultar ? <Tooltip title="Para quitar un genero haga click encima del mismo nuevamente" placement="right" arrow sx={{ marginLeft: '0.7em', fontSize: '1.5em', size: 'large' }}>
                                            <InfoIcon />
                                        </Tooltip> : null}
                                    </Stack>
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
                                        label={`Al subir mi libro acepto los términos y condiciones de Baku *`}
                                    />
                                    <Button variant="outlined" size="small" onClick={handleClickOpen}>Ver términos y condiciones</Button>
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
                                <Grid item xs={12}>
                                    <Typography variant='subtitle2' gutterBottom >Los campos con (*) son obligatorios</Typography>
                                </Grid>
                                {/* grid direction row */}

                                <Grid container xs={12} direction="row" alignItems="center" justify="center" sx={{ marginTop: '2em' }} >
                                    {archivoSubido ?
                                        <Button component="label" style={{ justifyContent: "center" }} startIcon={<CheckCircleTwoToneIcon />} className={classes.btnPdf2 + " " + classes.centrar} >
                                            Libro cargado con éxito
                                            <input
                                                type="file"
                                                name="archivoTexto"
                                                onChange={handlePdfChange}
                                                hidden
                                                accept=".pdf"
                                            />
                                        </Button>
                                        :
                                        <Stack spacing={1} direction="row" alignItems="center" sx={{ left: '8em' }} >
                                            <Button component="label" startIcon={<UploadIcon />} style={{ justifyContent: "center" }} className={classes.btnPdf + " " + classes.centrar}>
                                                Subí el contenido de tu libro
                                                <input
                                                    type="file"
                                                    name="archivoTexto"
                                                    onChange={handlePdfChange}
                                                    hidden
                                                    accept=".pdf"
                                                />
                                            </Button>
                                            <Tooltip title="El archivo debe estar en formato PDF (Peso máximo 25 Mb)" placement="right" arrow sx={{ fontSize: '1.5em', size: 'large' }}>
                                                <InfoIcon />
                                            </Tooltip>
                                        </Stack>
                                    }

                                    {pdfTitle !== "" ?
                                        <Grid container xs={12} direction="row" alignItems="center" justify="center" >
                                            <Typography className={classes.texto}>Libro: {pdfTitle}</Typography>
                                        </Grid>
                                        :
                                        null
                                    }
                                </Grid>

                                <Grid item xs={12} style={{ marginTop: "1rem", justifyContent: "center", display: "flex" }}>
                                    <Button className={classes.btnPublicar + " " + classes.centrar} style={{ marginTop: "1rem", justifyContent: "center", display: "flex" }} onClick={() => setabrirDialog(true)} variant="contained" disabled={(bloquearPublicar)}>
                                        Publicar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} >
                                    {/* CODIGO PARA EL DIALOG */}
                                    {abrirDialog && <Dialog
                                        open={abrirDialog}
                                        onClose={handleCloseDialog}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">¿Está seguro que desea publicar el libro?</DialogTitle>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleCloseDialog} color="primary">
                                                Cancelar
                                            </Button>
                                            <Button onClick={handleSubmit} color="primary" autoFocus>
                                                Aceptar
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    }
                                    <br />
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Container>
                    <Footy />
                </Grid>
            </Grid>
        </Grid >
    );
}
