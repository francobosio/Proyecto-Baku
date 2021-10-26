import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper} from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import ListaImagenes from '../ListaImagenes/ListaImagenes.jsx';
import Image from 'material-ui-image';
import {MiDrawer} from "../Drawer/Drawer.jsx"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
    },
    link: {
        color: "white",
        "text-decoration": "none",
    },
    content: {
        'background': '#99cfbf',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    }
}));

export default function MiniDrawer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MiDrawer/>
            <main className={classes.content}>
                <AppBar />
                <ListaImagenes/>
                <Footy/>
            </main>
        </div>
    );
}
