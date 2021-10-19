import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ComboBox from '../Publicar/ComboBox.jsx'
import TextoMultiple from '../Publicar/TextoMultiple'
import Button from '@material-ui/core/Button';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import UploadIcon from '@material-ui/icons/Publish';
import FormControl from '@material-ui/core/FormControl'
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
    container: {
        'background': 'linear-gradient(180deg, #076F55 0%, #C2F1E9 100%);',
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
    },
    controlCombo: {
        '& .MuiInputBase-input': {
            'backgroundColor': '#fff',
            'borderRadius': '0.2rem',
        },
        '& .MuiChip-root': {
            'color': '#000',
            'backgroundColor': '#4B9C8E',
            'fontSize': '1rem'
        },
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
}));


export default function MiniDrawer() {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [pdf, setPdf] = useState("");
    const [libro, setLibro] = useState({ titulo: "", descripcion: "" });

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
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("imagenPath",image.raw);
        formData.append("titulo",libro.titulo);
        formData.append("descripcion",libro.descripcion);
        formData.append("archivoTexto",pdf)
        const res = await libroServices.createLibro(formData);
       console.log(res)
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
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} className={classes.controlTitulo}>
                                    <Typography className={classes.textoDestacado}>Título</Typography>
                                    <TextField
                                        required
                                        name="titulo"
                                        autoFocus
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.textoDestacado}>Descripción</Typography>
                                    {/* <TextoMultiple onChange={handleInputChange} /> */}
                                    <TextField
                                        name="descripcion"
                                        rows={8}
                                        multiline
                                        onChange={handleInputChange}
                                    />

                                </Grid>
                                <Grid item xs={12} className={classes.controlCombo} >
                                    <Typography className={classes.textoDestacado}>Género</Typography>
                                    <ComboBox />
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
