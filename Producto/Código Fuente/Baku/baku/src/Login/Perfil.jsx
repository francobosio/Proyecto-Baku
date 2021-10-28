import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar.js";
import Footy from "../Footy/Footy.jsx";
import { MiDrawer } from "../Drawer/Drawer.jsx";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#99cfbf",
    display: "flex",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
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
    minHeight: "60vh",
  },
  grid: {
    padding: "1.5rem",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: "2rem",
    padding: "1rem 0 0 1rem",
  },
  texto:{
      fontWeight: "bold",
      fontSize: "1.1rem",
  },
}));

export default function Perfil() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <MiDrawer />
        <div className={classes.content}>
          <AppBar />
          <React.Fragment>
            <Container className={classes.fondo}>
              <Typography className={classes.titulo}>Tu Perfil</Typography>
              <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" className={classes.grid}>
                <Grid item xs={10}>
                  <img
                    alt="complex"
                    className={classes.img}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.texto}>Nombre y apellido:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography></Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.texto}>Email:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography></Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.texto}>Nombre de usuario:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography></Typography>
                </Grid>
              </Grid>
            </Container>
          </React.Fragment>
          <Footy />
        </div>
      </div>
    
  );
}
