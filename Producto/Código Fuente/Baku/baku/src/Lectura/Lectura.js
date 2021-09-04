// Core viewer
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';

//Worker
import { Worker } from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { makeStyles } from '@material-ui/core/styles';

//------------------------------------------------------------------------------------------------------------
import React, { useRef, useEffect } from 'react';

import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';


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
    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const classes = useStyles();

    const handleSwitchTheme = (theme) => {
        localStorage.setItem('theme', theme);
    };
    const theme = localStorage.getItem('theme') || 'light';

    //BookMark
    const bookmarkPluginInstance = bookmarkPlugin();

    return (
      <div className={classes.root}>
      
        <AppBar/>

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <div className={classes.viewer}>
                <Viewer
                    defaultScale
                    theme={theme} onSwitchTheme={handleSwitchTheme} 
                    fileUrl='Me-llaman-Artemio-Furia-Florencia-Bonelli.pdf'
                    plugins={[
                        // Register plugins
                        defaultLayoutPluginInstance,
                        bookmarkPluginInstance,
                        ]}
                />
            </div>
        </Worker>

        <Footy/>

      </div>
    )
};

export default Lectura;