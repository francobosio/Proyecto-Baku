import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Footy from '../Footy/Footy';
import Inicio from '../Inicio/Inicio'

//Rutas
import {  BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
//Imagenes
import logoBaku from '../Imagenes/Logo_baku_blanco.png';

import { Grid } from '@material-ui/core';

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

  typography: {
    'font-size': '1rem',
    fontFamily: [
      'Kaushan Script',
    ].join(','),
    'mix-blend-mode': 'normal',
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size': '2rem',
    'line-height': '14rem',
    'display': 'flex',
    'align-items': 'center',
    'text-align': 'center',
    'font-weight': '400',
    'line-height': '1.5',
    'letter-spacing': '0.00938em',

    color: '#FFFFFF',
  },

  grid: {
    display: "flex",
    height: "93vh",
    "place-items": "center",
    "flex-direction": "column",
    'background': 'linear-gradient(180deg, #076F55 0%, #FFFFFF 110%);',
  },

  boton:{
    'font-weight': 'bold',
    'margin': '0 auto', 
    'display': 'flex',
    'borderRadius': '5em',
    top:40,
  },
  botonVerde:{
    'background-color': '#4B9C8E',
    'color': '#FFFFFF',
    '&:hover':{
        background:'#076F55',
        color: '#FFFFFF',
    }
  },
  imagen: {
    height: 75,
    top: -15 ,
    position: "absolute",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

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
                 
                  <Button color="inherit" >Registrate</Button>
                <Button color="inherit">Iniciar Sesión</Button>
               
               
            </Toolbar>
        </AppBar>
        
        <Grid className={classes.grid}>
          <Typography className={classes.typography}>Leer es Soñar</Typography>
          <Typography className={classes.typography}>No dejes para mañana lo que puedes leer hoy.</Typography>
          <Typography className={classes.typography}>Accede a cientos de libros originales en forma gratuita</Typography>
          <Button variant="contained" className={classes.boton + ' ' +classes.botonVerde}>Obtener Baku Gratis</Button>
        </Grid> 
        <Footy/>
    </div> 
  );
}

