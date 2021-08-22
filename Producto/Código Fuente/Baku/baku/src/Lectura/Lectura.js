import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import "@fontsource/roboto";

//Imagenes
import logoBaku from '../Imagenes/Logo_baku_blanco.png';

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

    webviewer: {
        height: '100vh',
    },

    imagen: {
        height: 75,
        top: -15 ,
        position: "absolute",
    },
}));

const Lectura = () => {
    const classes = useStyles();
    const viewer = useRef(null);

    useEffect(() => {
        WebViewer(
        {
            path: 'lib',
            initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
            //initialDoc: 'Me-llaman-Artemio-Furia-Florencia-Bonelli.pdf',
            fullAPI: true
        },
        viewer.current,
        ).then((instance) => {
            instance.UI.setLanguage('es'); // set the language to Spanish
            instance.UI.enableElements(['readerPageTransitionButton']);

        });
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.color}>   
                <Toolbar>
                    <img src={logoBaku} alt="" className={classes.imagen} />

                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        
                    </IconButton>
                    <Typography variant="h1" className={classes.title}>
                    </Typography>

                    
                    <Button color="inherit">Premium</Button>
                    <Button color="inherit">Descarga</Button>
                    <Divider orientation="vertical" variant="middle" flexItem light/>
                    <Button color="inherit">Registrate</Button>
                    <Button color="inherit">Iniciar Sesión</Button>
                </Toolbar>
            </AppBar>

            <div className={classes.webviewer} ref={viewer}></div>
        </div>
    );
};

export default Lectura;