import React, { useEffect, useState } from 'react';
import AppBar from '../AppBar/AppBarLectura.jsx';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

// PLUGINS
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
    //Worker
    import { Worker } from '@react-pdf-viewer/core';
    // Core viewer
    import { PageChangeEvent, Viewer, SpecialZoomLevel} from '@react-pdf-viewer/core';
    //Lenguaje
    import { LocalizationMap } from '@react-pdf-viewer/core';
    import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/bookmark/lib/styles/index.css';

//BRILLO
import Brillo from './Brillo';

//RENDER TOOLBAR
import renderToolbar from './RenderToolbar';

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
import { Button, DocumentLoadEvent, PdfJs, Position, PrimaryButton, Tooltip} from '@react-pdf-viewer/core';
import {
    HighlightArea,
    highlightPlugin,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightTargetProps,
    RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';

interface Note {
    // El identificador único generados
    id: number;
    // El contenido de la nota
    content: string;
    // La lista de highlight areas
    highlightAreas: HighlightArea[];
    // El texto seleccionado
    quote: string;
}

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

    const [libro, setLibro] = useState({archivoTexto: "https://res.cloudinary.com/bakulibros/image/upload/v1636148992/blank_dynpwv.pdf", titulo: ''});
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

    
    //HIGHLIGHT----------------------------------------------------------------------------------------------------------------------------------
        const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(null);

        const handleDocumentLoad = (e: DocumentLoadEvent) => {
            setCurrentDoc(e.doc);
            if (currentDoc && currentDoc !== e.doc) {
                // User opens new document
                setNotes([]);
            }
        };

        // El siguiente código de ejemplo, muestra un botón después de que el usuario selecciona texto en el documento:
        const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
            <div
                style={{
                    background: '#eee',
                    display: 'flex',
                    position: 'absolute',
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    transform: 'translate(0, 8px)',
                }}
            >
                <Tooltip
                    position={Position.TopCenter}
                    target={
                        <Button onClick={props.toggle}> {/*Al hacer click resalta el texto*/}
                            <MessageIcon /> {/*Icono del mensaje*/}
                        </Button>
                    }
                    content={() => <div style={{ width: '100px' }}>Agregar una nota</div>} //Título del Tooltip
                    offset={{ left: 0, top: -8 }}
                />
            </div>
        );

        const [notes, setNotes] = React.useState<Note[]>([]); //Array "notes"
        const [message, setMessage] = React.useState(''); //Mensaje que escribe el usuario que luego se guardará como nota
        let noteId = notes.length; //Tamaño del Array "notes"
    
        //Para hacerlo simple, solo mostramos un área de texto para que el usuario ingrese el mensaje de la nota:
        const renderHighlightContent = (props: RenderHighlightContentProps) => {

            const addNote = () => {
                //Agrega el mensaje solo si no está vacío
                if (message !== '') { 
                    //Se crea el objeto nota:
                    const note: Note = {
                        id: ++noteId, //Incrementa el id manualmente
                        content: message,
                        highlightAreas: props.highlightAreas,
                        quote: props.selectedText,
                    };
    
                    //Agrega la nota al Array "notes"
                    setNotes(notes.concat([note]));
                    activateTab(3);
    
                    //Una vez agregada la nota, cierra el formulario:
                    props.cancel(); 
                }
            };
    
            return (
                <div
                    style={{ //Reemplaza al elemento del renderHighlightTarget
                        background: '#fff',
                        border: '1px solid rgba(0, 0, 0, .3)',
                        borderRadius: '2px',
                        padding: '8px',
                        position: 'absolute',
                        left: `${props.selectionRegion.left}%`,
                        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                        zIndex: 1,
                    }}
                >
                    <div>
                        <textarea //Área de texto
                            rows={3} //3 renglones en el área
                            style={{
                                border: '1px solid rgba(0, 0, 0, .3)',
                            }}
                            onChange={(e) => setMessage(e.target.value)} //guarda lo escrito por el usuario en la variable "message"
                        ></textarea>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '8px',
                        }}
                    >
                        <div style={{ marginRight: '8px' }}>
                            {/*Al hacer Clic en el botón "Agregar", se llamará a la función `addNote`.*/}
                            <PrimaryButton onClick={addNote}>Agregar</PrimaryButton>
                        </div>
                        {/*Cierra el formulario*/}
                        <Button onClick={props.cancel}>Cancelar</Button>
                    </div>
                </div>
            );
        };
    
        const noteEles: Map<number, HTMLElement> = new Map();
        const notesContainerRef = React.useRef<HTMLDivElement | null>(null);
        
        // Al hacer clic en un resaltado, se abrirá la pestaña y se
        // saltará a su nota en la barra lateral:
        const jumpToNote = (note: Note) => {
            activateTab(3); //Abre la pestaña
            const noteEle = noteEles.get(note.id);
            const notesContainer = notesContainerRef.current;
            if (noteEles.has(note.id) && notesContainer && noteEle) {
                notesContainer.scrollTop = noteEle.getBoundingClientRect().top;
            }
        };
    
        // Listing all highlights on page is simple as following:
        const renderHighlights = (props: RenderHighlightsProps) => (
            <div>
                {/*Usa cada una de las notas en el Array "notes"*/}
                {notes.map((note) => (
                    <React.Fragment key={note.id}>
                        {note.highlightAreas
                            .filter((area) => area.pageIndex === props.pageIndex)
                            .map((area, idx) => (
                                <div
                                    key={idx}
                                    style={Object.assign(
                                        {},
                                        {
                                            background: 'yellow', //Color del área resaltada
                                            opacity: 0.4,
                                        },
                                        props.getCssProperties(area, props.rotation)
                                    )}
                                    // El mapa se actualizará cuando un highlight es renderizado
                                    onClick={() => jumpToNote(note)}
                                />
                            ))}
                    </React.Fragment>
                ))}
            </div>
        );
    
        const highlightPluginInstance = highlightPlugin({
            renderHighlightTarget,
            renderHighlightContent,
            renderHighlights,
        });
    
        const { jumpToHighlightArea } = highlightPluginInstance;
    
        React.useEffect(() => {
            return () => {
                noteEles.clear();
            };
        }, []);
    
        //Nos gustaría enumerar las notas en una barra lateral (sidebar):
        const sidebarNotes = (
            <div
                ref={notesContainerRef}
                style={{
                    overflow: 'auto',
                    width: '100%',
                }}
            >
                {notes.length === 0 && <div style={{ textAlign: 'center' }}>No hay notas agregadas</div>}
                {notes.map((note) => {
                    return (
                        <div
                            key={note.id}
                            style={{
                                borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                cursor: 'pointer',
                                padding: '8px',
                            }}
                            // Saltar a un área resaltada al hacer clic en una nota:
                            onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
                            ref={(ref): void => {
                                noteEles.set(note.id, ref as HTMLElement);
                            }}
                        >
                            <blockquote
                                style={{
                                    borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                                    fontSize: '.75rem',
                                    lineHeight: 1.5,
                                    margin: '0 0 8px 0',
                                    paddingLeft: '8px',
                                    textAlign: 'justify',
                                }}
                            >
                                {note.quote}
                            </blockquote>
                            {note.content}
                        </div>
                    );
                })}
            </div>
        );
    
    /*
    Integración con Default Layout plugin:
            Para mover la lista de notas al sidebar, creamos una nueva pestaña:
    */
    //DEFAULT LAYOUT
        const defaultLayoutPluginInstance = defaultLayoutPlugin({
            renderToolbar,
            sidebarTabs: (defaultTabs) =>
                defaultTabs.concat({
                    content: sidebarNotes,
                    icon: <MessageIcon />,
                    title: 'Notas',
                }),
        });
        const { activateTab } = defaultLayoutPluginInstance;
        

    return (
        <div className={classes.root}>
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
                    <Grid item xs={4}>
                        <Typography variant="h5" gutterBottom component="div" align= 'center'>
                            Título: {libro.titulo}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            { /*CARGA DE PLUGINS*/}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                <div className={classes.viewer}>
                    <Viewer
                        fileUrl={ libro.archivoTexto }
                        defaultScale={SpecialZoomLevel.PageFit}
                        theme={currentTheme} onSwitchTheme={handleSwitchTheme}
                        initialPage={initialPage} onPageChange={handlePageChange}
                        localization={es_ES as unknown as LocalizationMap}
                        plugins={[
                            highlightPluginInstance,
                            defaultLayoutPluginInstance,
                            ]}
                        onDocumentLoad={handleDocumentLoad}
                            
                    >{currentTheme}</Viewer>
                </div>
            </Worker>
        </div>
    )
};

export default Lectura;