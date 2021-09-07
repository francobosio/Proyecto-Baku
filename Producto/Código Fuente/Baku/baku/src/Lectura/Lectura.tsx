// Core viewer
import { PageChangeEvent, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { themePlugin } from '@react-pdf-viewer/theme';
import { ThemeContext } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';

//Worker
import { Worker } from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { makeStyles } from '@material-ui/core/styles';

//------------------------------------------------------------------------------------------------------------
import React, { useRef, useEffect } from 'react';

import AppBar from './AppBarLectura.jsx';
import Footy from '../Footy/Footy.jsx';

import {useParams } from "react-router-dom";
import e from 'express';

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
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const classes = useStyles();
    const {pdf} = useParams<QuizParams>();
    
    //Viewer
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;
    const themePluginInstance = themePlugin();
    const { SwitchThemeButton } = themePluginInstance;

    //Theme
    const handleSwitchTheme = (theme: string) => {
        localStorage.setItem('theme', theme);
    };
    const theme = localStorage.getItem('theme') || 'light';

    //BookMark
    const bookmarkPluginInstance = bookmarkPlugin();



    const handlePageChange = (e: PageChangeEvent) => {
        localStorage.setItem('current-page', `${e.currentPage}`);
    };

    const initialPage = localStorage.getItem('current-page') ? parseInt(localStorage.getItem('current-page')!, 10) : 0;

    return (
      <div className={classes.root}>
      
        <AppBar/>
        <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    padding: '4px',
                }}
            >
                <Toolbar>
                    
                    {(props: ToolbarSlot) => {
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
                        } = props;
                        return (
                            <>
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
                                    <ThemeContext.Provider value={themeContext}>
                                        <SwitchThemeButton />
                                    </ThemeContext.Provider>
                                </div>
                                
                                {/*
                                <div style={{ padding: '0px 2px' }}>
                                    <Download />
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <Print />
                                </div>
                                */
                                }
                            </>
                        );
                    }}
                </Toolbar>
            </div>
            <div
                style={{
                    flex: 1,
                    overflow: 'hidden',
                }}
            ></div>

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            
            <div className={classes.viewer}>
                <Viewer
                    defaultScale={SpecialZoomLevel.PageFit}
                    theme={currentTheme} onSwitchTheme={handleSwitchTheme} 
                    initialPage={initialPage} onPageChange={handlePageChange}
                    fileUrl={"/"+pdf}
                    plugins={[
                        // Register plugins
                        toolbarPluginInstance,
                        bookmarkPluginInstance,
                        themePluginInstance
                        ]}
                />
            </div>
        </Worker>

        <Footy/>

      </div>
    )
};

export default Lectura;