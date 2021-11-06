// Core viewer
import { PageChangeEvent, Viewer, SpecialZoomLevel, RenderPageProps } from '@react-pdf-viewer/core';
import { themePlugin } from '@react-pdf-viewer/theme';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { ReactElement } from 'react';
import { ToolbarProps } from '@react-pdf-viewer/default-layout';

//Worker
import { Worker } from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import '@react-pdf-viewer/bookmark/lib/styles/index.css';

import { makeStyles } from '@material-ui/core/styles';

//------------------------------------------------------------------------------------------------------------
import React, { useRef, useEffect, useState } from 'react';

import AppBar from './AppBarLectura';
import Footy from '../Footy/Footy.jsx';

import { useParams } from "react-router-dom";

//Display reading progress at the top
import ReadingIndicatorPluginP from './Reading_Progress/readingIndicatorPlugin';

//Scroll Mode
import { RenderSwitchScrollModeProps, ScrollMode } from '@react-pdf-viewer/scroll-mode';


//Brillo
import Brillo from './Brillo';


//TipoLetra
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//Marca
import jumpToPagePlugin from './jumpToPagePlugin';
import { pageNavigationPlugin, RenderCurrentPageLabelProps } from '@react-pdf-viewer/page-navigation';

//PAG ACTUAL
import * as libroService from '../Libros/LibroService'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

//GRID
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Button from '@material-ui/core/Button'

//LENGUAJE
import { LocalizationMap } from '@react-pdf-viewer/core';
// Import the localization file
import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';

//COMBOBOX
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        flexGrow: 1,
    },

    color: {
        background: '#4B9C8E',
    },

    imagen: {
        height: 75,
        top: -15,
        position: "absolute",
    },

    viewer: {
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '100vh',
    },

    ocultar: {
        display: "none",
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
    grid: {
        'paddingBottom':'0.7rem',
        'margin': '0 auto',
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
    const cbTipoLetra = ['', 'sans-serif', 'italic', 'calibri']

    const [tipoLetra2, setTipoLetra2] = React.useState<string | null>(cbTipoLetra[0]);
    const [inputValue, setInputValue] = React.useState('');

    //TEMA
    const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('theme') || 'light');
    const themeContext = { currentTheme, setCurrentTheme };

    //Almacenar Tema
    const themePluginInstance = themePlugin();
    const { SwitchThemeButton } = themePluginInstance;

    const handleSwitchTheme = (theme: string) => {
        localStorage.setItem('theme', theme)
        setCurrentTheme(theme);
    };
    const theme = localStorage.getItem('theme') || 'light';

    //PORCENTAJE DE LECTURA (No funciona con lo de MARCADORES)
    const readingIndicatorPluginInstance = ReadingIndicatorPluginP();
    const { ReadingIndicator } = readingIndicatorPluginInstance;

    //BOOKMARK
    const bookmarkPluginInstance = bookmarkPlugin();
    const { Bookmarks } = bookmarkPluginInstance;

    //PAGINA ACTUAL
    const handlePageChange = (e: PageChangeEvent) => {
        localStorage.setItem('current-page', `${e.currentPage}`);
    };

    /*const [pagActual, setPagActual] = React.useState();
    const [prueba, setPrueba] = React.useState("");

    const loadUltimaPagina = async () => {
        const res = await libroService.getLibro("617099b5e446091643930f25");
        console.log(res);
        setPagActual(res.data.ultimaPagina);
        setPrueba(res.data.public_id_pdf)
    }
    const handlePageChange = async (e: PageChangeEvent|any) => {
        await libroService.updateUltPag("617099b5e446091643930f25", e.currentPage);
        //localStorage.setItem('current-page', `${e.currentPage}`);
    };

    const initialPage = pagActual
    */

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

    //TOOLBAR
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
        <>
            <Toolbar>
                {(slots: ToolbarSlot) => {
                    const {
                        CurrentPageInput,
                        EnterFullScreen,
                        GoToNextPage,
                        GoToPreviousPage,
                        NumberOfPages,
                        ShowSearchPopover,
                        Zoom,
                        ZoomIn,
                        ZoomOut,
                        SwitchTheme,
                        SwitchScrollMode,
                    } = slots;
                    return (
                        <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            <div style={{ padding: '0px 2px' }}>
                                <ShowSearchPopover />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomOut />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Zoom />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomIn />
                            </div>
                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                <GoToPreviousPage />
                            </div>
                            <div style={{ padding: '0px 2px', width: '4rem' }}>
                                <CurrentPageInput />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                / <NumberOfPages />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <GoToNextPage />
                            </div>
                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                <EnterFullScreen />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchTheme />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Horizontal} />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Vertical} />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <SwitchScrollMode mode={ScrollMode.Wrapped} />
                            </div>
                            {/*
                            <div style={{ padding: '0px 2px' }}>
                                <ThemeContext.Provider value={themeContext}>
                                    <SwitchThemeButton />
                                </ThemeContext.Provider>
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Download />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Print />
                            </div>
                            */}
                        </div>
                    );
                }}
            </Toolbar>
            <div style={{ margin: '4px -4px -4px -4px' }}>
                <ReadingIndicator />
            </div>
        </>
    );

    //LAYOUT - BARRA VERTICAL IZQUIERDA
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: defaultTabs => [
            // Elimina la pestaña de archivos adjuntos (\ `defaultTabs [2] \`)
            defaultTabs[0], // pestaña Marcadores 
            defaultTabs[1], // pestaña Miniaturas 
        ],
        renderToolbar,
    });

    //GRID
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    //MIS MARCADORES
    //Saltar a una página
    const jumpToPagePluginInstance = jumpToPagePlugin();
    const { jumpToPage } = jumpToPagePluginInstance;

    //Label para mostrar la página actual
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { CurrentPageLabel } = pageNavigationPluginInstance;

    //Página Actual
    const [actualPagina, setActualPagina] = React.useState(0);

    //Guardar página actual
    function showCurrentPage(e: RenderCurrentPageLabelProps) {
        setActualPagina(e.currentPage + 1);
        return <span>{`${e.currentPage + 1} of ${e.numberOfPages}`}</span>;
    }

    //TEXTO SELECCIONADO
    const [textSelected, setTextSelected] = React.useState("-");

    //Referencia al DIV que muestra el Texto Seleccionado
    const div_text_selec = React.useRef<HTMLInputElement>(null)

    //Guardar el Texto Seleccionado (Botón)
    function guardarTextoSeleccionado() {
        //setTextSelected(div_text_selec.current?.textContent!);
        setTextSelected(String(selection()));
    }

    //Tomar el Texto Seleccionado de la pantalla
    function selection() {
        if (window.getSelection) {
            var selectedText = window.getSelection();
            return selectedText;
        }
    }

    return (
        <div className={classes.root}>
            <style>
                {
                    `
            .rpv-core__text-layer{
            }
            .rpv-core__text-layer-text {
                font-family: ${tipoLetra2} !important;
                white-space: pre !important;
              }
            `
                }
            </style>
            <div className={classes.ocultar}>
                <CurrentPageLabel>
                    {(e: RenderCurrentPageLabelProps) => (showCurrentPage(e))}
                </CurrentPageLabel>
            </div >
            <AppBar />
            <div className={classes.ocultar}>
                <button
                    style={{
                        background: 'rgba(0, 0, 0, .1)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '16px',
                        padding: '8px',
                    }}
                    onClick={() => jumpToPage(4)}
                >
                    Jump to page {actualPagina}
                </button>
                <div className="div1" ref={div_text_selec}>
                    {textSelected}
                </div>
                <button type="button" id="mybtntext" className="btn btn-primary" onClick={guardarTextoSeleccionado}>
                    Guardar Texto Seleccionado
                </button>
            </div>
            <Box sx={{ width: '100%' }} style={{ paddingTop: '10px', backgroundColor: '#99cfbf' }}>
                <Grid className={classes.grid} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid item xs={2}>
                        <Button className={classes.boton} variant="contained">
                            <Button className={classes.link} onClick={() => {terminaLectura(); history.goBack()}}>Atrás</Button>
                        </Button>
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
            </Box>

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
                            defaultLayoutPluginInstance,
                            jumpToPagePluginInstance,
                            readingIndicatorPluginInstance
                        ]}
                    >{currentTheme}{tipoLetra2}</Viewer>
                </div>
            </Worker>


        </div>
    )
};

export default Lectura;
