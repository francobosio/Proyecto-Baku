import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import {MiDrawer} from "../Drawer/Drawer.jsx"
import EmbedSDK from '@mongodb-js/charts-embed-dom';
import './Estadistica.css';
import Chart from "./Chart";
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
    },
    content: {
        'background': '#99cfbf',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    }
}));

export default function Estadistica() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MiDrawer/>
            <main className={classes.content}>
                <AppBar />
                <h1 className="title">Estadísticas</h1>
                <div className="charts">
                    <Chart height={'500px'} width={'700px'} chartId={'7f88d714-8d67-4b17-97fb-af2405d694b6'}/>
                    <Chart height={'500px'} width={'700px'} chartId={'4473e271-b243-4256-9548-bfbcbce206cd'}/>
                    <Chart height={'500px'} width={'700px'} chartId={'2503f8b3-848b-4feb-b6fc-13af0b5f1456'}/>
                </div>
                <br></br>
                <Footy/>
            </main>
        </div>
    );
}