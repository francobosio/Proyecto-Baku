import React, { JSXElementConstructor, useEffect, useState } from 'react';
import AppBarWe from '../AppBar/AppBarLectura.jsx';
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

//TIPO DE LETRA
import TipoLetra from './TipoLetra';

//PAG ACTUAL
import * as libroService from '../Libros/LibroService'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

//GRID
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonMui from '@material-ui/core/Button';

//TITULO
import Typography from '@mui/material/Typography';

//Highlight
import highlightPluginComponent from './Highlight'

//Narrador
import Narrador from './Narrador.jsx';

import jumpToPagePlugin from './jumpToPagePlugin';

//TABS
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import AbcIcon from '@mui/icons-material/Abc';
import ExposureIcon from '@mui/icons-material/Exposure';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

//RESPONSIVE
import useMediaQuery from '@mui/material/useMediaQuery';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

//--------------------------------------------------------------------------

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
    tabs: {
        'background': '#076F55',
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

    const [habilitado, setHabilitado] = useState(false)

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
    const contadorCerrar = () => {
        console.log("Entro al contador 2")
        
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //TERMINA LECTURA
    const terminaLectura = async () => {
        //Presiona el BOTON DE PAUSE del Narrador al salir
        if(habilitado){
            let element: HTMLElement = document.getElementsByClassName('pause')[0] as HTMLElement;
            element.click();
        }
        
                
        const usuario_activo = localStorage.getItem("usuario_activo");
        const paginaActual = localStorage.getItem('current-page');
        console.log("🚀 ~ file: Lectura.tsx ~ line 154 ~ terminaLectura ~ paginaActual", paginaActual)
        
        const libroData = {
            'auth0id': usuario_activo,
            'idLibro': id,
            'ultimaPaginaLeida': paginaActual,
            'finLectura': true,
        }
        await usuarioService.usuarioLibroLeido(libroData);
        //setInitialPage(1);
    }

    //COMIENZA LECTURA
    const [libro, setLibro] = useState({ archivoTexto: "https://res.cloudinary.com/bakulibros/image/upload/v1636148992/blank_dynpwv.pdf", titulo: '' });
    const [initialPage, setInitialPage] = useState<number>();
    const usuario_id = localStorage.getItem("usuario_id")!;
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const comienzaLectura = async () => {
        setInitialPage(1);
        const usuario_activo = localStorage.getItem("usuario_activo")
        if (usuario_activo != null) {
            const resPagina = await usuarioService.usuarioUltimaPagina(usuario_activo, id);
            //console.log(resPagina.data)
            setInitialPage(parseInt(resPagina.data, 10));
            
            const resLibro = await libroService.getLibro(id);
            setLibro(resLibro.data);
        }
    }

    //PERMISOS DE USUARIO
    const cargarUsuario = async () => {
        const usuario_activo = localStorage.getItem("usuario_activo");
        const res = await usuarioService.getUsuario(usuario_activo!);
        //console.log(res.data)
        if(res.data.tipoUsuario == 1)
        {
            
            //console.log("El USUARIO es FREE")
        }
        else{
            setHabilitado(true)
            //console.log("El USUARIO es PREMIUM o ADMINISTRADOR")
        }
    }

    useEffect(() => {
        comienzaLectura();
        cargarUsuario()
        const t = setInterval(() => {
            setMostrarAlerta(true)
            handleClickOpen();
            contadorCerrar();
            setTimeout(() => {
                handleClose();
            }, 10000);
        }, 1800000);
        return () => clearTimeout(t);
    }, [])

    //LECTURA SE ENCARGA DE TRAER EL TEXTO DEL LIBRO Y SE LO DA AL NARRADOR
    const [textoLibro, setTextolibro] = useState(""); //TEXTO DEL NARRADOR
    const obtenerTextoLibro = async () => {
        const url = encodeURIComponent(libro.archivoTexto)
        const res = await libroService.getLibroNarrador(url, 1, libro.titulo);
        //console.log(res.data)
        setTextolibro(res.data.arrayLimpio)
    }

    useEffect(() => {
        obtenerTextoLibro()
    }, [libro])

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

    //HIJO A PADRE - BRILLO
    const [tipoColor1, setTipoColor1] = React.useState<string>('Ninguno');
    const [value, setValue] = React.useState<number>(0);

    const [important, setImportant] = React.useState('');

    const [rojo, setRojo] = React.useState<number>(0);
    const [verde, setVerde] = React.useState<number>(0);
    const [azul, setAzul] = React.useState<number>(0);

    const setTipoColor1new = (name: string):void => {
        setTipoColor1(name)
    }

    const setValuenew = (name: number):void => {
        setValue(name)
    }

    const setImportantnew = (name: string):void => {
        setImportant(name)
    }

    const setRojonew = (name: number):void => {
        setRojo(name)
    }

    const setVerdenew = (name: number):void => {
        setVerde(name)
    }
    
    const setAzulnew = (name: number):void => {
        setAzul(name)
    }

    //HIJO A PADRE - TIPO DE LETRA
    const [tipoLetra2, setTipoLetra2] = React.useState('Ninguno');
    const [scaleX, setScaleX] = React.useState<number>(0);
    const [importantTL, setImportantTL] = React.useState('');
    const [important2, setImportant2] = React.useState('');

    const setTipoLetra2new = (name: string):void => {
        setTipoLetra2(name)
    }

    const setScaleXnew = (name: number):void => {
        setScaleX(name)
    }

    const setImportantTLnew = (name: string):void => {
        setImportantTL(name)
    }

    const setImportant2new = (name: string):void => {
        setImportant2(name)
    }

    //HIJO A PADRE - NARRADOR
    const [estadoNarrador , setEstadoNarrador] = useState("En Pausa")

    //TABS
    const theme = useTheme();
    const [valueTab, setValueTab] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValueTab(newValue);
    };
  
    const handleChangeIndex = (index: number) => {
      setValueTab(index);
    };

    //RESPONSIVE
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <div className={classes.root}>
            { /*APPBAR*/}
            <AppBarWe />

            { /*BARRA DE HERRAMIENTAS*/}
            
            {matches ?
            <Box sx={{ width: '100%', flexGrow: 1 }} style={{ paddingTop: '10px', backgroundColor: '#99cfbf' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid item xs={12} xl={1.5}>
                        <div style={{ 
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        height: "4rem",
                                        justifyContent: "center"
                                }}>
                            <ButtonMui className={classes.boton} variant="contained">
                                <ButtonMui className={classes.link} onClick={() => { terminaLectura(); history.goBack() }}>Atrás</ButtonMui>
                            </ButtonMui>
                        </div>
                    </Grid>
                    <Grid item xs={12} xl={2} >
                        <div style={{ 
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                        }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {libro.titulo}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        {habilitado &&
                            <Brillo 
                                tipoColor1={tipoColor1} 
                                setTipoColor1={setTipoColor1new}
                                value={value}
                                setValue={setValuenew}
                                important={important}
                                setImportant={setImportantnew}
                                rojo={rojo}
                                setRojo={setRojonew}
                                verde={verde}
                                setVerde={setVerdenew}
                                azul={azul}
                                setAzul={setAzulnew}
                                tipoLetra2={tipoLetra2}
                                scaleX={scaleX}
                                importantTL={importantTL}
                                important2={important2}
                            />
                        }
                    </Grid>
                    <Grid item xs={12} md={3} xl={2}>
                        {habilitado &&
                            <TipoLetra 
                                tipoColor1={tipoColor1}
                                value={value}
                                rojo={rojo}
                                verde={verde}
                                azul={azul}
                                important={important}
                                tipoLetra2={tipoLetra2}
                                setTipoLetra2={setTipoLetra2new}
                                scaleX={scaleX}
                                setScaleX={setScaleXnew}
                                importantTL={importantTL}
                                setImportantTL={setImportantTLnew}
                                important2={important2}
                                setImportant2={setImportant2new}
                            />
                        }
                    </Grid>
                    <Grid item xs={12} md={3} xl={2}>
                        {habilitado && 
                            isVisible && (
                                    <Narrador
                                        currentPage = {currentPage}
                                        textoLibro = {textoLibro}
                                        jumpToPage = {jumpToPage}
                                        tipoColor1={tipoColor1}
                                        value={value}
                                        rojo={rojo}
                                        verde={verde}
                                        azul={azul}
                                        important={important}
                                        tipoLetra2={tipoLetra2}
                                        scaleX={scaleX}
                                        importantTL={importantTL}
                                        important2={important2}
                                        estadoNarrador={estadoNarrador}
                                        setEstadoNarrador={setEstadoNarrador}
                                    />
                            )
                        }
                    </Grid>
                </Grid>
            </Box>:
            <Box sx={{ width: '100%', flexGrow: 1 }} style={{ paddingTop: '10px', backgroundColor: '#99cfbf' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid item xs={12} xl={1.5}>
                        <div style={{ 
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        height: "4rem",
                                        justifyContent: "center"
                                }}>
                            <ButtonMui className={classes.boton} variant="contained">
                                <ButtonMui className={classes.link} onClick={() => { terminaLectura(); history.goBack() }}>Atrás</ButtonMui>
                            </ButtonMui>
                        </div>
                    </Grid>
                    <Grid item xs={12} xl={3}>
                        <div style={{ 
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                        }}>
                            <Typography variant="h5" gutterBottom component="div">
                                {libro.titulo}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            
                <Box sx={{ width: '100%' }}>
                    <AppBar position="static">
                        <style>
                            {   
                                `
                                    .MuiTabs-indicator {
                                        background-color: #83B7AA;
                                    }
                                `
                            }
                        </style>
                        <Tabs
                            className={classes.tabs}
                            value={valueTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                        <Tab icon={<ExposureIcon fontSize='medium'/>} {...a11yProps(0)} disabled={estadoNarrador == "Reproduciendo" ? true : false} wrapped/>
                        <Tab icon={<AbcIcon fontSize='large' />} {...a11yProps(1)} disabled={estadoNarrador == "Reproduciendo" ? true : false} wrapped/>
                        <Tab icon={<RecordVoiceOverIcon fontSize='medium' />} {...a11yProps(2)} wrapped/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={valueTab} index={0}>
                        <Grid item xs={12} xl={4}>
                            {habilitado &&
                                <Brillo 
                                    tipoColor1={tipoColor1} 
                                    setTipoColor1={setTipoColor1new}
                                    value={value}
                                    setValue={setValuenew}
                                    important={important}
                                    setImportant={setImportantnew}
                                    rojo={rojo}
                                    setRojo={setRojonew}
                                    verde={verde}
                                    setVerde={setVerdenew}
                                    azul={azul}
                                    setAzul={setAzulnew}
                                    tipoLetra2={tipoLetra2}
                                    scaleX={scaleX}
                                    importantTL={importantTL}
                                    important2={important2}
                                />
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value={valueTab} index={1}>
                        <Grid item xs={12} xl={2}>
                            {habilitado &&
                                <TipoLetra 
                                    tipoColor1={tipoColor1}
                                    value={value}
                                    rojo={rojo}
                                    verde={verde}
                                    azul={azul}
                                    important={important}
                                    tipoLetra2={tipoLetra2}
                                    setTipoLetra2={setTipoLetra2new}
                                    scaleX={scaleX}
                                    setScaleX={setScaleXnew}
                                    importantTL={importantTL}
                                    setImportantTL={setImportantTLnew}
                                    important2={important2}
                                    setImportant2={setImportant2new}
                                />
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value={valueTab} index={2}>
                        <Grid item xs={12} xl={2}>
                            {habilitado && 
                                isVisible && (
                                    <div style={{ 
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                    }}>
                                        <Narrador
                                            currentPage = {currentPage}
                                            textoLibro = {textoLibro}
                                            jumpToPage = {jumpToPage}
                                            tipoColor1={tipoColor1}
                                            value={value}
                                            rojo={rojo}
                                            verde={verde}
                                            azul={azul}
                                            important={important}
                                            tipoLetra2={tipoLetra2}
                                            scaleX={scaleX}
                                            importantTL={importantTL}
                                            important2={important2}
                                            estadoNarrador={estadoNarrador}
                                            setEstadoNarrador={setEstadoNarrador}
                                        />
                                    </div>
                                )
                            }
                            
                        </Grid>
                    </TabPanel>
                </Box>
            </Box>
            }
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
                                    Hola!, te recomendamos que descanse un poco para que puedas seguir disfrutando de la lectura.
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} size="large" >Cerrar</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            } 
            { /*CARGA DE PLUGINS*/}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                <div className={classes.viewer}>
                    <Viewer
                        fileUrl={libro.archivoTexto}
                        defaultScale={SpecialZoomLevel.PageFit}
                        theme={currentTheme} onSwitchTheme={handleSwitchTheme}
                        initialPage={initialPage! - 1} onPageChange={handlePageChange}
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
