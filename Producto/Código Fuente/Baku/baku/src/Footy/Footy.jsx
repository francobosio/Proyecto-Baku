import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import logoBaku from '../Imagenes/Logo_baku_blanco.png';
import Grid from '@material-ui/core/Grid';

import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';

//Iconos redes social
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  contenedor: {
    background: '#4B9C8E',
    height: 210,
    width: '100%',
    textAlign: "center"

  },
  contenedorGrilla: {
    textAlign: "left",
    alignContent: "center",
    marginBottom: 15,
    color: "#FFFFFF"
  },
  imagen: {
    height: 150,
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
      <Container maxWidth="xl" className={classes.contenedor}>
        <Grid container spacing={3} className={classes.contenedorGrilla}>
          <Grid item xs={12} sm container >
            <img src={logoBaku} alt="" className={classes.imagen} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <ButtonBase>
                  <Typography>Para escritores</Typography>
                </ButtonBase>
              </Grid>
              <Grid item xs>
                <ButtonBase>
                  <Typography>Reglas para publicar libros</Typography>
                </ButtonBase>
              </Grid>
              <Grid item xs>
                <ButtonBase>
                  <Typography>Publicidad</Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" >
              <Grid item xs>
                <ButtonBase>
                  <Typography>Ayuda</Typography>
                </ButtonBase>
              </Grid>
              <Grid item xs>
                <ButtonBase>
                  <Typography>Condiciones de Uso</Typography>
                </ButtonBase>
              </Grid>
              <Grid item xs>
                <ButtonBase>
                  <Typography>Acuerdos de Privacidad</Typography>
                </ButtonBase>
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
