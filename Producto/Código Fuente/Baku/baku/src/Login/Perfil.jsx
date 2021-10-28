<<<<<<< HEAD
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar.js";
import Footy from "../Footy/Footy.jsx";
import { MiDrawer } from "../Drawer/Drawer.jsx";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
=======
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Image from 'material-ui-image';
import { Link } from 'react-router-dom';    
import Profile from  './Profile.jsx'
//Iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
>>>>>>> main

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

<<<<<<< HEAD
export default function Perfil() {
  const classes = useStyles();
=======
export default function MiniDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenClose = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <Image src={Logo} aspectRatio={2.4} color={"#4B9C8E"} />
                    <IconButton className={classes.icono} onClick={handleDrawerOpenClose} style={{ color: "#FFFFFF" }} >
                        {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                <Link to="/Inicio">
                    <ListItem button className={classes.texto} >
                        <ListItemIcon><HomeOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                        <ListItemText primary='Inicio' style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                    <Link to="/Buscar">
                    <ListItem button>
                        <ListItemIcon><SearchOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                            <ListItemText primary="Buscar" className={classes.texto} style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                    <Link to="/Biblioteca">
                    <ListItem button>
                        <ListItemIcon><MenuBookOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                        <ListItemText primary='Mi Biblioteca' style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                    <Link to="/Publicar">
                    <ListItem button>
                        <ListItemIcon><PublishOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                        <ListItemText primary='Publicar' style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                </List>
                <Divider />

            </Drawer>
            <Divider />
>>>>>>> main

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
