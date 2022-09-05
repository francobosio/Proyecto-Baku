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
import { LoginButton } from "../Sesión/LoginMetodo"
import { Grid } from '@material-ui/core';
import Image from 'material-ui-image';
import imagenFondo from '../Imagenes/book_fantasy_5k.jpg';
import logoBaku from '../Imagenes/Logo_Baku_Negro_sin_fondo.png';
import { Container,Box } from '@mui/system';

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
    color: '#00',
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
    color: '#000',
  },
  grid: {
    display: "flex",
    height: "100vh",
    "place-items": "center",
    "justify-content": "center",
    "flex-direction": "column",
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
  divImagen: {
    backgroundImage: `url(${imagenFondo})`,
    'background-size': '100vh'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Grid container direction="column" minHeight="100vh"  xl={12} lg={12} md={12} sm={12} xs={12} >
      <Grid item xl={12}>
        {/* hacer los componentes responsivos  */}
        <AppBar position="static" className={classes.color}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h1" xs={12} sm={12} md={12} lg={12} xl={12} className={classes.title}>
            </Typography>
            <Button className={classes.boton + ' ' + classes.botonVerde}>
              <Link className={classes.link} to="/">Premium</Link>
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem light />
            <LoginButton text="Iniciar Sesión"></LoginButton>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item  justifyContent="center" >
        <Box className={classes.divImagen} sx={{ flexGrow: 1,minHeight:'73vh',imageOrientation: 'from-image',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}}>
        <Grid container  spacing={0} direction="column" alignItems="center"  justifyContent="center" style={{ minHeight: '60vh' }} >
        {/* /* el grid item debe ocupar todo el espacio  */}
          <Grid item  xs={9} lg={3} xl={3} justifyContent="center" alignItems="center" >
            <Typography className={classes.typographyKsText}>No dejes para mañana lo que puedes leer hoy.</Typography>
            <Typography className={classes.typographyKsText}>Accedé a cientos de libros originales en forma gratuita</Typography>
            <LoginButton text="Ingresa a Baku"></LoginButton>

          </Grid>
        </Grid>
        </Box>
      </Grid>
      <Grid item xl={12}>
        <Footy></Footy>
      </Grid>
    </Grid>
  );
}