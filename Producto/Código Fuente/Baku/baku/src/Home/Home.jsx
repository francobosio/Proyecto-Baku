import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import "@fontsource/roboto";
import "typeface-kaushan-script";
import Footy from '../Footy/Footy';
import { LoginButton } from "../Login/LoginMetodo"
import { LogoutButton } from "../Login/Logout"

//Imagenes
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

  typographyKsTitle: {
    'font-size': '1rem',
    fontFamily: [
      'Kaushan Script',
    ].join(','),
    'mix-blend-mode': 'normal',
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size': '5rem',
    'line-height': '9.063rem',
    'display': 'flex',
    'align-items': 'center',
    'text-align': 'center',
    'font-weight': '400',
    'line-height': '1.2',
    'letter-spacing': '0.00938em',
    color: '#FFFFFF',
  },
  typographyKsText: {
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
    'line-height': '1.9',
    'letter-spacing': '0.00938em',

    color: '#FFFFFF',
  },

  grid: {
    display: "flex",
    height: "93vh",
    "place-items": "center",
    "justify-content": "center",
    "flex-direction": "column",
    'background': 'linear-gradient(180deg, #076F55 0%, #FFFFFF 110%);',
  },

  boton: {
    'font-weight': 'bold',
    'margin': '0 auto',
    'display': 'flex',
    'color': '#FFFFFF',
    'borderRadius': '5rem',
  },
  link: {
    color: "white",
    "text-decoration": "none",
  },
  botonVerde: {
    'background-color': '#4B9C8E',
    '&:hover': {
      'background': '#076F55',
      'color': '#FFFFFF',
    }
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position="static" className={classes.color}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h1" className={classes.title}>
          </Typography>
          <Button className={classes.boton + ' ' + classes.botonVerde}>
            <Link className={classes.link} to="/">Premium</Link>
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem light />
          <LoginButton text="Iniciar Sesión"></LoginButton>

        </Toolbar>
      </AppBar>
      <Grid className={classes.grid}>
        <Typography className={classes.typographyKsTitle}>Leer es Soñar</Typography>
        <Typography className={classes.typographyKsText}>No dejes para mañana lo que puedes leer hoy.</Typography>
        <Typography className={classes.typographyKsText}>Accede a cientos de libros originales en forma gratuita</Typography>

        <LoginButton text="Ingresa a Baku"></LoginButton>
      </Grid>
      <Footy />
    </div>
  );
}