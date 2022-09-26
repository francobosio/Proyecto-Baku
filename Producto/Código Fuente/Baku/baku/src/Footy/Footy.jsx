import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import logoBaku from '../Imagenes/Logo_baku_blanco.png';
import Grid from '@material-ui/core/Grid';

import { Link, useParams } from "react-router-dom";

import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';

//Iconos redes social
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { color } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  contenedor: {
    background: '#4B9C8E',
    height: '14em',
    width: 'auto',
    textAlign: "center"

  },
  contenedorGrilla: {
    textAlign: "left",
    alignContent: "center",
    paddingTop: "1.5em",
    marginBottom: '1em',
    color: "#FFFFFF"
  },
  imagen: {
    height: '10em',
    position: "relative",
    top: -20,
  },
  icono: {
    height: 35,
    width: 35,
    color: '#FFFFFF'
  },
}));
function Footy() {
  const classes = useStyles();

  return <React.Fragment>
    <footer>
      <Container maxWidth="xl" className={classes.contenedor}   >
        <Grid container spacing={3} className={classes.contenedorGrilla}>
          <Grid item xs={12} sm container >
            <img src={logoBaku} alt="" className={classes.imagen} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <Link to="/Ayuda/1"  style={{textDecoration: 'none',color:'white'}}>
                  <Typography>Para escritores</Typography>
                </Link>
              </Grid>
              <Grid item xs>
                {/* quitar el color y el subrayado a link */}
                <Link to="/Ayuda/3" style={{textDecoration: 'none',color:'white' }}>
                  <Typography>Reglas para publicar libros</Typography>
                </Link>
              </Grid>
              <Grid item xs>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" >
              <Grid item xs>
                <Link to="/Ayuda/2" style={{textDecoration: 'none',color:'white' }}>
                  <Typography>Ayuda</Typography>
                </Link>
              </Grid>
              <Grid item xs>
                <Link to="/Ayuda/4" style={{textDecoration: 'none',color:'white' }}>
                  <Typography>Términos y Condiciones de Uso</Typography>
                </Link>
              </Grid>
              <Grid item xs>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" >
              <Grid item xs>
                <IconButton size='small' aria-label="Facebook.com/BakuLibros" onClick={() => window.open('https://www.facebook.com/LibrosBaku/')}>
                  <FacebookIcon className={classes.icono} />
                </IconButton>
              </Grid>
              <Grid item xs>
                <IconButton size='small' aria-label="Instagram.com/bakulibros" onClick={() => window.open('https://www.instagram.com/bakulibros/')}>
                  <InstagramIcon className={classes.icono} />
                </IconButton>
              </Grid>
              <Grid item xs>
                <IconButton size='small' aria-label="Youtube.com/BakuLibros" onClick={() => window.open('https://www.youtube.com/channel/UCc0lXcP4y3lFm_358348THw')}>
                  <YouTubeIcon className={classes.icono} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  </React.Fragment>
}

export default Footy
