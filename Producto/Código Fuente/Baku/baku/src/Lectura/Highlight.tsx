import React, { useEffect, useState } from 'react';
import { Trigger } from '@react-pdf-viewer/highlight';
import * as lecturaService from '../Lectura/LecturaService';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

//RENDER TOOLBAR
import renderToolbar from './RenderToolbar';

//Highlight
import { Button, DocumentLoadEvent, PdfJs, Position, PrimaryButton, Tooltip } from '@react-pdf-viewer/core';
import {
    HighlightArea,
    highlightPlugin,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightTargetProps,
    RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';

import DeleteIcon from '@mui/icons-material/Delete';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

interface Note {
    // El identificador único generados
    _id: string;
    // El contenido de la nota
    content: string;
    // La lista de highlight areas
    highlightAreas: HighlightArea[];
    // El texto seleccionado
    quote: string;
}

const HighlightPluginComponent = (id: String, usuario_id: String, habilitado: Boolean, handleClickAlert: any) => {

    const [notes, setNotes] = React.useState<Note[]>([]); //Array "notes"

    const obtenerNotasPorUsuarioLibro = async () => {
        //console.log(usuario_id, id)
        const res = await lecturaService.obtenerNotaPorUsuarioLibro(usuario_id, id)
        const notesArray = res.data.respuesta.filter(function(props: { usuario?: String; id_libro?: String; createdAt?: String; updatedAt?: String;}) {
            delete props.usuario;
            delete props.id_libro;
            delete props.createdAt;
            delete props.updatedAt;
            return true;
        });
        //console.log(notesArray )
        setNotes(notesArray)
    }

    useEffect(() => {
        obtenerNotasPorUsuarioLibro();
    }, [])


    //HIGHLIGHT----------------------------------------------------------------------------------------------------------------------------------
    const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(null);

    const handleDocumentLoad = (e: DocumentLoadEvent) => {
        setCurrentDoc(e.doc);
        if (currentDoc && currentDoc !== e.doc) {
            // User opens new document
            //setNotes([]);
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
                zIndex: 1,
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



    
    const [message, setMessage] = React.useState(''); //Mensaje que escribe el usuario que luego se guardará como nota
    let noteId = notes.length; //Tamaño del Array "notes"

    //Para hacerlo simple, solo mostramos un área de texto para que el usuario ingrese el mensaje de la nota:
    const renderHighlightContent = (props: RenderHighlightContentProps) => {

        const addNote = () => {
            //Agrega el mensaje solo si no está vacío
            if (message !== '') {
                //Se crea el objeto nota:
                const note: Note = {
                    _id: (++noteId).toString(), //Incrementa el id manualmente _ VER SI NO ROMPE NADAAA
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                };


                const usuario: string = localStorage.getItem("usuario_id")!;

                //Manda 5 elementos: el contenido de la nota, la lista de highlight areas, el texto seleccionado "quote",
                //el id del usuario, y el id del libro """type QuizParams = { id: string;}"" linea 98
                //lecturaService.guardarNota(note.content, note.highlightAreas, note.quote, usuario, id).then(val => note._id = val.data.marcador._id)
                
                const guardarNotaIdMongo = async () => {
                    //Coloco el await para esperar a que se termine de ejecutar el save del marcador.controller, así me envía los datos del nuevo marcador
                    const res = await lecturaService.guardarNota(note.content, note.highlightAreas, note.quote, usuario, id)
                    //Cambio el ID de la nota por el id que se crea en mongo
                    note._id = res.data.marcador._id
                    console.log(note)
                    //Agrega la nota al Array "notes"
                    setNotes(notes.concat([note]));
                    console.log(notes)
                    //Abre la pestaña de las notas
                    activateTab(3);
                    // //Una vez agregada la nota, cierra el form:
                    props.cancel();
                }
                guardarNotaIdMongo()
                // setNotes(notes.concat([note])); //despues ver si no se pisa con lo que traemos del BACK
                // activateTab(3);
                // props.cancel();
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

    const noteEles: Map<string, HTMLElement> = new Map();
    const notesContainerRef = React.useRef<HTMLDivElement | null>(null);

    // Al hacer clic en un resaltado, se abrirá la pestaña y se
    // saltará a su nota en la barra lateral:
    const jumpToNote = (note: Note) => {
        activateTab(3); //Abre la pestaña
        const noteEle = noteEles.get(note._id);
        const notesContainer = notesContainerRef.current;
        if (noteEles.has(note._id) && notesContainer && noteEle) {
            notesContainer.scrollTop = noteEle.getBoundingClientRect().top;
        }
    };
    //console.log(notes)
    // Listing all highlights on page is simple as following:
    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {/* {console.log('185 - notas:')}
            {console.log(notes)}  */}
            {/*Usa cada una de las notas en el Array "notes"*/}
            {notes.map((note) => (
                    <React.Fragment key={note._id}>
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
                ))
            }
        </div>
    );

    const highlightPluginInstance = highlightPlugin(habilitado?{
        trigger: Trigger.TextSelection,
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights,
    }:{});

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
            {notes.length > 0 && <div style={{ 
                        textAlign: 'center', 
                        borderBottom: '1px solid rgba(0, 0, 0, .3)',
                        padding: '8px',
                        display: 'flex',
                        justifyContent: 'space-between' }}>
                            <ReportGmailerrorredIcon/>
                            Los Marcadores se visualizarán cuando Tipo de Color sea Ninguno
                        </div>}

            {/*console.log('339 - notas:'+ notes)*/}
            {notes.map((note) => {
                const deleteNote = () => {
                    lecturaService.eliminarNota(note._id);
                    const filtrarNotas = notes.filter((item) => item !== note)
                    setNotes(filtrarNotas)
                };
                return (
                    <div
                    onClick={() => handleClickAlert({vertical: 'bottom', horizontal: 'right',})}
                    style={{
                        borderBottom: '1px solid rgba(0, 0, 0, .3)',
                        cursor: 'pointer',
                        padding: '8px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div
                            style={{
                                width: '100%',
                            }}
                            key={note._id}
                            // Saltar a un área resaltada al hacer clic en una nota:
                            onClick={() => jumpToHighlightArea(note.highlightAreas[0])} //va al primer objeto de la lista de marcadores
                            ref={(ref): void => {
                                noteEles.set(note._id, ref as HTMLElement);
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
                        <div 
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Button onClick={deleteNote}>
                                <DeleteIcon />
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    /*
    Integración con Default Layout plugin:
            Para mover la lista de notas al sidebar, creamos una nueva pestaña:
    */
    const defaultLayoutPluginInstance = defaultLayoutPlugin(habilitado?{
        renderToolbar,
        sidebarTabs: (defaultTabs) => [
            defaultTabs[0], // Bookmarks tab
            {
                content: sidebarNotes,
                icon: <MessageIcon />,
                title: 'Notas',
            }
        ],
    }:{
        renderToolbar,
        sidebarTabs: (defaultTabs) => [],
    });

    const { activateTab } = defaultLayoutPluginInstance;

    return {defaultLayoutPluginInstance, highlightPluginInstance, handleDocumentLoad};
};

export default HighlightPluginComponent;