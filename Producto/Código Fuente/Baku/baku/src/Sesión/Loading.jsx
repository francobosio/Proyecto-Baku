import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import { useAuth0 } from '@auth0/auth0-react';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    'background': 'linear-gradient(180deg, #076F55 0%, #C2F1E9 100%);',
    'height': '100vh',
  },

  circulo: {
    'color': '#076F55'
  }
}));

export const Loading = () => {
  const classes = useStyles();
  const { user } = useAuth0();
  const validarEstado = async () => {
    if (user !== undefined) {
      const usuario = await usuarioService.getUsuario(user.sub)
      if (usuario.data.estado === 'Inactivo') {
        //alerta de usuario inactivo y redireccionar a login
        alert('Usuario inactivo, por favor contacte al administrador')
        window.location.href = '/'
      }
    }
  }

  useEffect(() => {
    validarEstado()
    }, [] )


  return (<div>
    <Container justifycontent="center" maxWidth="xl" className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3}>
          <CircularProgress className={classes.circulo} size="10rem" />
        </Grid>

      </Grid>
    </Container>
  </div>)
}