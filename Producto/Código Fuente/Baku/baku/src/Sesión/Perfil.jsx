import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar.js";
import Footy from "../Footy/Footy.jsx";
import { MiDrawer } from "../Drawer/Drawer.jsx";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";

import * as usuarioService from './Usuarios/UsuarioService';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#99cfbf",
    display: "flex",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    'min-height': '100vh'
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    paddingLeft: "1rem",
  },
  fondo: {
    width: "60rem",
    backgroundColor: "#7ec2ae",
    minHeight: "75vh",
  },
  grid: {
    padding: "1.5rem",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: "2rem",
    padding: "1rem 0 0 1rem",
  },
  texto: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
}));

export default function Perfil() {
  const { user } = useAuth0();
  const [userDB, setUserDB] = useState(null);
  const classes = useStyles();

  const loadUsuario = async () => {
    const usuario_auth0 = localStorage.getItem("usuario_activo");
    const res = await usuarioService.getUsuario(usuario_auth0);
    let usuario = res.data;
    if (usuario == null) {
      console.log("No se pudo cargar el usuario");
    } else {
      setUserDB(usuario);
      console.log(user);
    }
  }
  useEffect(() => {
    loadUsuario()
  }, [])

  return (
    <div className={classes.root}>
      <MiDrawer />
      {userDB != null ? (
        <div className={classes.content}>
          <AppBar />
          <Typography className={classes.titulo}>Tu Perfil</Typography>
          <Container className={classes.fondo}>
            <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" className={classes.grid}>
              <Grid item xs={10}>
                <img
                  alt="complex"
                  src={user.picture}
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.texto}>Nombre:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDB.nombre}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.texto}>Apellido:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDB.apellido}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.texto}>Email:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDB.correo_electronico}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.texto}>Fecha de Nacimiento:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography></Typography>
              </Grid>
              <Grid item xs={12}>
                <Button>Guardar Cambios</Button>
              </Grid>
            </Grid>
          </Container>
          <Footy />
        </div>) : null}
    </div>
  );
}
