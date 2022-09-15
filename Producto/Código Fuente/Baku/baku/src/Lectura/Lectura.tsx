import React, { JSXElementConstructor, useEffect, useState } from 'react';
import AppBar from '../AppBar/AppBarLectura.jsx';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
//Worker
import { Worker } from '@react-pdf-viewer/core';
// Core viewer
import { PageChangeEvent, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
//Lenguaje
import { LocalizationMap } from '@react-pdf-viewer/core';
import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/bookmark/lib/styles/index.css';

//BRILLO
import Brillo from './Brillo';

//PAG ACTUAL
import * as libroService from '../Libros/LibroService'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

//GRID
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import ButtonMui from '@material-ui/core/Button';

//TITULO
import Typography from '@mui/material/Typography';

//Highlight
import highlightPluginComponent from './Highlight'

//Narrador
import Narrador from './Narrador.jsx';

import jumpToPagePlugin from './jumpToPagePlugin';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    boton: {
        'font-weight': 'bold',
        'margin': '0 auto',
        'display': 'flex',
        'color': '#FFFFFF',
        'borderRadius': '5rem',
        'background-color': '#4B9C8E',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        }
    },
    link: {
        color: "white",
        "text-decoration": "none",
    },
    viewer: {
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '100vh',
    },
    ocultar: {
        display: "none",
    },
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Lectura = () => {
    let history = useHistory()
    type QuizParams = {
        id: string;
    }

    // Create new plugin instance
    const classes = useStyles();
    let { id } = useParams<QuizParams>();

    //TEMA
    const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('theme') || 'light');

    //Almacenar Tema
    const handleSwitchTheme = (theme: string) => {
        localStorage.setItem('theme', theme)
        setCurrentTheme(theme);
    };

    //PORCENTAJE DE LECTURA (No funciona con lo de MARCADORES)
    //const readingIndicatorPluginInstance = ReadingIndicatorPluginP();
    //const { ReadingIndicator } = readingIndicatorPluginInstance;

    //PAGINA ACTUAL
    const [currentPage, setCurrentPage] = React.useState(0)
    const handlePageChange = (e: PageChangeEvent) => {
        localStorage.setItem('current-page', `${e.currentPage}`);
        //console.log('Pagina Actual: ' + e.currentPage)
        setCurrentPage(e.currentPage)
    };

    //************************************************************************************
  
    const contador = () => {
        setTimeout(() => {
            console.log("Entro al contador 1")
            setMostrarAlerta(true)
            handleClickOpen();
            contadorCerrar();
        }, 1800000);
        clearTimeout();
    }
    const contadorCerrar = () => {
        console.log("Entro al contador 2")
        setTimeout(() => {
            handleClose();
            contador();
        }, 3000);
        clearTimeout();
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //*************************************************************************************


    const terminaLectura = async () => {
        //Presiona el BOTON DE PAUSE del Narrador al salir
        let element: HTMLElement = document.getElementsByClassName('pause')[0] as HTMLElement;
        element.click();
                
        const usuario_activo = localStorage.getItem("usuario_activo");
        const paginaActual = localStorage.getItem('current-page');
        const libroData = {
            'auth0id': usuario_activo,
            'idLibro': id,
            'ultimaPaginaLeida': paginaActual,
            'finLectura': true,
        }
        await usuarioService.usuarioLibroLeido(libroData);
        setInitialPage(1);
        await libroService.eliminarLibroRevision(libro.titulo);
    }

    const [libro, setLibro] = useState({ archivoTexto: "https://res.cloudinary.com/bakulibros/image/upload/v1636148992/blank_dynpwv.pdf", titulo: '' });
    const [initialPage, setInitialPage] = useState<number>();
    const usuario_id = localStorage.getItem("usuario_id")!;
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const comienzaLectura = async () => {
        contador();
        /*  contadorCerrar(); */
        setInitialPage(1);
        const usuario_activo = localStorage.getItem("usuario_activo")
        if (usuario_activo != null) {
            const resPagina = await usuarioService.usuarioUltimaPagina(usuario_activo, id);
            //console.log(resPagina.data)
            setInitialPage(resPagina.data);
            //console.log(initialPage)
            const resLibro = await libroService.getLibro(id);
            setLibro(resLibro.data);
        }
    }

    const [habilitado, setHabilitado] = useState(false)
    const cargarUsuario = async () => {
        const usuario_activo = localStorage.getItem("usuario_activo");
        const res = await usuarioService.getUsuario(usuario_activo!);
        console.log(res.data)
        if(res.data.tipoUsuario == 1)
        {
            
            console.log("El USUARIO es FREE")
        }
        else{
            setHabilitado(true)
            console.log("El USUARIO es PREMIUM o ADMINISTRADOR")
        }
    }


    useEffect(() => {
        comienzaLectura();
        cargarUsuario()
    }, [])

    //PLUGINS
    
    const object = highlightPluginComponent(id, usuario_id, habilitado)
    const highlightPluginInstance = object.highlightPluginInstance
    const defaultLayoutPluginInstance = object.defaultLayoutPluginInstance
    const handleDocumentLoad = object.handleDocumentLoad

    var isVisible = false
    if(libro.titulo != ""){
        isVisible = true
    }

    const jumpToPagePluginInstance = jumpToPagePlugin();
    const { jumpToPage } = jumpToPagePluginInstance;

    return (
        <div className={classes.root}>
            { /*APPBAR*/}
            <AppBar />

            { /*BARRA DE HERRAMIENTAS*/}
            <Box sx={{ width: '100%', flexGrow: 1 }} style={{ paddingTop: '10px', backgroundColor: '#99cfbf' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid xs={1.5}>
                        <ButtonMui className={classes.boton} variant="contained">
                            <ButtonMui className={classes.link} onClick={() => { terminaLectura(); history.goBack() }}>Atrás</ButtonMui>
                        </ButtonMui>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant="h6" gutterBottom component="div">
                            Título: {libro.titulo}
                        </Typography>
                    </Grid>
                    <Grid xs={5}>
                        {habilitado &&
                            <Brillo />
                        }
                    </Grid>
                    <Grid xs={2}>
                        {habilitado && 
                            isVisible && (
                                <div style={{ 
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                }}>
                                    <Narrador 
                                        idLibro={id} 
                                        currentPage={currentPage} 
                                        titulo={libro.titulo}
                                        jumpToPage = {jumpToPage}
                                    />
                                
                                </div>
                            )
                        }
                        
                    </Grid>
                    
                </Grid>

                {mostrarAlerta === true &&
                    <div>
                        <Dialog
                            /* text in dialog with color red  */
                            sx={{ '& .MuiDialog-paper': { bgcolor: '#ceffed' }, '& .MuiButton-root ': { color: 'black' } }}
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>ALERTA DE DESCANSO</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <Typography variant="h6" gutterBottom component="div" align='center'>
                                        Hola! ,te recomendamos que descanse un poco, para que puedas seguir disfrutando de la lectura.
                                    </Typography>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} size="large" >Cerrar</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
            </Box>
            { /*CARGA DE PLUGINS*/}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                <div className={classes.viewer}>
                    <Viewer
                        fileUrl={libro.archivoTexto}
                        defaultScale={SpecialZoomLevel.PageFit}
                        theme={currentTheme} onSwitchTheme={handleSwitchTheme}
                        initialPage={initialPage} onPageChange={handlePageChange}
                        localization={es_ES as unknown as LocalizationMap}
                        plugins={[
                            highlightPluginInstance,
                            defaultLayoutPluginInstance,
                            jumpToPagePluginInstance
                        ]}
                        onDocumentLoad={handleDocumentLoad}

                    >{currentTheme}</Viewer>
                </div>
            </Worker>
        </div>
    )
};

export default Lectura;