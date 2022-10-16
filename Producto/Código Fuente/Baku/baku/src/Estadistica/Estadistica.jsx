import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import './Estadistica.css';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import {MiDrawer} from "../Drawer/Drawer.jsx"

import BarChart from './BarChart.jsx';
import ColumnChart from './ColumnChart.jsx';
import Reporte from './Reporte';
import ReporteFechas from './ReporteFechas';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
    },
    content: {
        width: '100%',
        'background': '#99cfbf',
        position: 'relative',
        paddingBottom: '12em',
        minHeight: '100vh'
    },
    title3: {
        paddingTop: '30px',
        margin: '0',
        fontSize: '30px',
        color: '#333',
        paddingBottom: '0.5em',
    },
    title2: {
        paddingTop: '5px',
        margin: '0',
        fontSize: '30px',
        color: '#333',
    }
}));

export default function Estadistica() {

    const classes = useStyles();

    //Contador de un determinado elemento en un Array
    Array.prototype.countCertainElements = function (value) {
        return this.filter((arrayElement) => arrayElement == value).length;
    };

    return (
        <div className={classes.root}>
            
            
            <MiDrawer pestaña={5}/>
            <main className={classes.content}>
                <AppBar />
                
                <h1 className="title">REPORTE DE ESTADÍSTICAS</h1>
                <div className="chartsA" 
                    style={{ 
                        display: "flex",
                        justifyContent: "space-around",

                }}>
                    <div className="chart1" 
                        style={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                    }}>
                        {/* <Paper variant="outlined" elevation={7} sx={{backgroundColor:"#4b9c8e",padding:"2em"}} > */}
                        <h3 className={classes.title3}>Porcentaje de libros por género</h3>
                        <BarChart />
                         {/* </Paper> */}
                    </div>
                    <div className="chart2" 
                        style={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: 600,
                            width: 600
                    }}>
                        <h3 className={classes.title3}>Ranking - 10 libros más leídos</h3>
                        <ColumnChart />
                    </div>
                </div>
                <div className="chartsB" 
                    style={{ 
                        display: "flex",
                        justifyContent: "space-around",

                }}>
                    <div className="chart3" 
                        style={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 450,
                            width: 600
                    }}>
                        <h3 className={classes.title3}>Libros leídos por usuario</h3>
                        <Reporte />
                        {/* <ReporteFechasCopy /> */}
                    </div>
                    <div className="chart4" 
                        style={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 600,
                            width: 600
                    }}>
                        <h3 className={classes.title3}>Cantidad de Libros Publicados por Día</h3>
                
                        <ReporteFechas />
                    </div>
                </div>
                <br></br>
                <footer style={{position: "absolute", bottom: 0, width: "100%"}}>
                    <Footy />
                </footer>
                
            </main>
        </div>
    );
}