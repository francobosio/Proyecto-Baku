// Core viewer
import { PageChangeEvent, Viewer, SpecialZoomLevel} from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

//Worker
import { Worker } from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import '@react-pdf-viewer/bookmark/lib/styles/index.css';

import { makeStyles } from '@material-ui/core/styles';

//------------------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';

import AppBar from '../AppBar/AppBarLectura.jsx';

import { useParams } from "react-router-dom";

//Display reading progress at the top
import ReadingIndicatorPluginP from './Reading_Progress/readingIndicatorPlugin';

//Brillo
import Brillo from './Brillo';

//PAG ACTUAL
import * as libroService from '../Libros/LibroService'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

//GRID
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonMui from '@material-ui/core/Button';

//LENGUAJE
import { LocalizationMap } from '@react-pdf-viewer/core';
// Import the localization file
import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';

//COMBOBOX
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useHistory } from "react-router-dom";

import renderToolbar from './RenderToolbar';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        'paddingBottom':'0.7rem',
        'margin': '0 auto',
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


const Lectura = () => {
    let history = useHistory()
    type QuizParams = {
        id: string;
    }

    // Create new plugin instance
    const classes = useStyles();
    let { id } = useParams<QuizParams>();

    //TIPO DE LETRA
    const cbTipoLetra = ['', 'sans-serif', 'calibri', 'Comic Sans MS']

    const [tipoLetra2, setTipoLetra2] = React.useState<string | null>(cbTipoLetra[0]);
    const [inputValue, setInputValue] = React.useState('');

    //TEMA
    const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('theme') || 'light');

    //Almacenar Tema
    const handleSwitchTheme = (theme: string) => {
        localStorage.setItem('theme', theme)
        setCurrentTheme(theme);
    };

    //PORCENTAJE DE LECTURA (No funciona con lo de MARCADORES)
    const readingIndicatorPluginInstance = ReadingIndicatorPluginP();
    const { ReadingIndicator } = readingIndicatorPluginInstance;

    //PAGINA ACTUAL
    const handlePageChange = (e: PageChangeEvent) => {
        localStorage.setItem('current-page', `${e.currentPage}`);
    };

    const terminaLectura = async () => {
        const usuario_id = localStorage.getItem("usuario_activo");
        const paginaActual = localStorage.getItem('current-page');
        const libroData = {
            'auth0id': usuario_id,
            'idLibro': id,
            'ultimaPaginaLeida': paginaActual,
            'finLectura': true,
        }
        const res = await usuarioService.usuarioLibroLeido(libroData);
        console.log(res);
    }

    const [libro, setLibro] = useState({archivoTexto: "https://res.cloudinary.com/bakulibros/image/upload/v1636148992/blank_dynpwv.pdf"});
    const [initialPage, setInitialPage] = useState(1);
    const comienzaLectura = async () => {
        setInitialPage(1);
        const usuario_id = localStorage.getItem("usuario_activo");
        if (usuario_id != null){
            const resPagina = await usuarioService.usuarioUltimaPagina(usuario_id, id);
            setInitialPage(resPagina.data);
            const resLibro = await libroService.getLibro(id);
            setLibro(resLibro.data);
        }
    }

    useEffect(() => {
        comienzaLectura();
    },[])

    
    //DEFAULT LAYOUT
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar
    });

    return (
        <div className={classes.root}>
            { /*TIPO DE LETRA*/}
            <style>
                {   
                    `
                        .rpv-core__text-layer {
                        }
                        .rpv-core__text-layer-text {
                            font-family: "${tipoLetra2}" !important;
                        }
                    `
                }
            </style>
            
            { /*APPBAR*/}
            <AppBar />

            { /*BARRA DE HERRAMIENTAS*/}
            <Box sx={{ width: '100%' }} style={{ paddingTop: '10px', backgroundColor: '#99cfbf' }}>
                <Grid className={classes.grid} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid item xs={2}>
                        <ButtonMui className={classes.boton} variant="contained">
                            <ButtonMui className={classes.link} onClick={() => {terminaLectura(); history.goBack()}}>Atrás</ButtonMui>
                        </ButtonMui>
                    </Grid>
                    <Grid item xs={6}>
                        <Brillo />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            size="small"
                            value={tipoLetra2}
                            onChange={(event: any, newValue: string | null) => {
                                setTipoLetra2(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={cbTipoLetra}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Tipo de Letra" />}
                        />
                    </Grid>
                </Grid>
                <div style={{ margin: '4px -4px -4px -4px' }}>
                    <ReadingIndicator />
                </div>
            </Box>

            { /*CARGA DE PLUGINS*/}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <div className={classes.viewer}>
                    <Viewer
                        fileUrl={ libro.archivoTexto }
                        defaultScale={SpecialZoomLevel.PageFit}
                        theme={currentTheme} onSwitchTheme={handleSwitchTheme}
                        initialPage={initialPage} onPageChange={handlePageChange}
                        localization={es_ES as unknown as LocalizationMap}

                        plugins={[
                            // Register plugins
                            readingIndicatorPluginInstance,
                            defaultLayoutPluginInstance,
                            ]}
                            
                    >{currentTheme}{tipoLetra2}</Viewer>
                </div>
            </Worker>
        </div>
    )
};

export default Lectura;