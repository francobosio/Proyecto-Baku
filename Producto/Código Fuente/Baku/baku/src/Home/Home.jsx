import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Image from 'material-ui-image';
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
import imagenFondo from '../Imagenes/book_fantasy_5k.jpg';
import logoBaku from '../Imagenes/Logo_Baku_Negro_sin_fondo.png';
import {Box } from '@mui/system';
import './home.css'

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
    'justify-content': 'center',
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
    'justify-content': 'center',
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
    [theme.breakpoints.down('830')]: {
      'font-size': '1.7rem',
    },
    [theme.breakpoints.down('706')]: {
      'font-size': '1.5rem',
    },
    [theme.breakpoints.down('623')]: {
      'font-size': '1.3rem',
    },
    [theme.breakpoints.down('540')]: {
      'font-size': '1.1rem',
      'margin-top': '10px'
    },
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
  },
  logo: {
    backgroundImage: `url(${logoBaku})`,
    'background-size': 'cover',
    backgrountPosition: 'center',
    backgroundColor: 'transparent',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Grid container direction="column" minHeight="100vh"  xs={12} >
      <Grid item xl={12}>
        {/* hacer los componentes responsivos  */}
        <AppBar position="static" className={classes.color}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h1" xs={12}  className={classes.title}>
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem light />
            <LoginButton text="Iniciar Sesión"></LoginButton>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item container justifyContent="center" alignItems="center"  >
        <Box className={classes.divImagen} sx={{display: 'flex',flexGrow: 1,minHeight:'70vh',imageOrientation: 'from-image',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}}>
        <Grid container  spacing={0} direction="column" alignItems="center"  justifyContent="center"  style={{ minHeight: '70vh',display: 'flex',marginBottom: '2rem'}} >
        {/* /* el grid item debe ocupar todo el espacio  */}
         <Grid  item  xs={10}  justify="center" alignItems="center" direction="column" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Grid item  xs={4}  justify="center" alignItems="center" direction="column" style={{ minHeight: '30%',minWidth:'100%',flexGrow:1, flex:1, }} >
            <Image className='imgLogo' src={logoBaku} responsive aspectRatio={2.8} style={{backgroundColor: 'transparent',}}/>
          </Grid>
            <Typography className={classes.typographyKsText}>No dejes para mañana lo que puedes leer hoy.</Typography>
            <Typography className={classes.typographyKsText}>Accedé a cientos de libros originales en forma gratuita</Typography>
            <LoginButton text="Ingresá a Baku" sx={{marginBottom: '2rem'}}>
            </LoginButton>
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