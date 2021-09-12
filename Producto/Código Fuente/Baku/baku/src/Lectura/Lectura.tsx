// Core viewer
import { PageChangeEvent, Viewer, SpecialZoomLevel, RenderPageProps } from '@react-pdf-viewer/core';
import { themePlugin } from '@react-pdf-viewer/theme';
import { ThemeContext } from '@react-pdf-viewer/core';

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
import React, { useRef, useEffect } from 'react';

import AppBar from '../AppBar/AppBarLectura';
import Footy from '../Footy/Footy.jsx';

import {useParams } from "react-router-dom";

//Display reading progress at the top
import ReadingIndicatorPluginP from './Reading_Progress/readingIndicatorPlugin';

//Scroll Mode
import { RenderSwitchScrollModeProps, ScrollMode } from '@react-pdf-viewer/scroll-mode';

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
        top: -15 ,
        position: "absolute",
    },

    viewer: {
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '100vh',
    }
}));


const Lectura = () => {

    type QuizParams = {
        pdf: string;
      }

    const [currentTheme, setCurrentTheme] = React.useState(localStorage.getItem('theme') || 'light');
    const themeContext = { currentTheme, setCurrentTheme };

    // Create new plugin instance
    const classes = useStyles();
    const {pdf} = useParams<QuizParams>();
    
    //Toolbar
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    //Reading Indicator
    const readingIndicatorPluginInstance = ReadingIndicatorPluginP();
    const { ReadingIndicator } = readingIndicatorPluginInstance;

    //Alamacenar Theme
    const themePluginInstance = themePlugin();
    const { SwitchThemeButton } = themePluginInstance;
    
    const handleSwitchTheme = (theme: string) => {
        localStorage.setItem('theme', theme);
    };
    const theme = localStorage.getItem('theme') || 'light';

    //BookMark
    const bookmarkPluginInstance = bookmarkPlugin();
    const { Bookmarks } = bookmarkPluginInstance;


    //Página actual
    const handlePageChange = (e: PageChangeEvent) => {
        localStorage.setItem('current-page', `${e.currentPage}`);
    };

    const initialPage = localStorage.getItem('current-page') ? parseInt(localStorage.getItem('current-page')!, 10) : 0;

    const renderPage = (props: RenderPageProps) => {
        return (
            <>
                {props.canvasLayer.children}
                <div style={{backgroundColor: '#ffffff',}}>
                    {props.textLayer.children}
                </div>
                {props.annotationLayer.children}
            </>
        );
    };

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
                            */
                            }
                        </div>
                    );
                }}
            </Toolbar>
            <div style={{ margin: '4px -4px -4px -4px' }}>
                <ReadingIndicator />
            </div>
        </>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs : defaultTabs => [   
            // Elimina la pestaña de archivos adjuntos (\ `defaultTabs [2] \`)
            defaultTabs [ 0 ] , // pestaña Marcadores 
            defaultTabs [ 1 ] , // pestaña Miniaturas 
        ] ,
        renderToolbar,
    });

    return (
      <div className={classes.root}>
      
        <AppBar/>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <div className={classes.viewer}>
                <Viewer
                    fileUrl={"/"+pdf}

                    renderPage={renderPage}
                    defaultScale={SpecialZoomLevel.PageFit}
                    theme={currentTheme} onSwitchTheme={handleSwitchTheme} 
                    initialPage={initialPage} onPageChange={handlePageChange}
                    
                    plugins={[
                        // Register plugins
                        defaultLayoutPluginInstance,
                        readingIndicatorPluginInstance
                        ]}
                />
            </div>
        </Worker>

        <Footy/>

      </div>
    )
};

export default Lectura;
