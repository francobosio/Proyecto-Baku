import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import logoBaku from '../Imagenes/Logo_baku_blanco.png';
import Grid from '@material-ui/core/Grid';

import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';

//Iconos redes social
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  contenedor: {
    background: '#4B9C8E',
    height: 210,
    width: '100%',
    "margin-top": "1rem",
    textAlign: "center",
    borderTop: "2px solid #E7E7E7",

  },
  contenedorGrilla: {
    textAlign: "left",
    alignContent: "center",
    marginTop: 5,
    marginBottom: 15,
    color: "#FFFFFF"
  },
  imagen: {
    height: 150,
  },
  //no se usa
  cotenedorImagen: {
    alignItems: "center",
  },
  icono: {
    height: 35,
    width: 35,
    color: '#FFFFFF'
  },
}));
function Footy() {
  const classes = useStyles();

  return <Container maxWidth="xl" className={classes.contenedor}>
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
              <Typography>Condiciones de uso</Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs>
            <ButtonBase>
              <Typography>Acuerdos de privacidad</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="row" >
          <Grid item xs>
            <IconButton size='small'>
              <FacebookIcon className={classes.icono} />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton size='small'>
              <InstagramIcon className={classes.icono} />
            </IconButton>
          </Grid>
          <Grid item xs>
            <IconButton size='small'>
              <TwitterIcon className={classes.icono} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
}

export default Footy