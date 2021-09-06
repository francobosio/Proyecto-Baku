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
import { Container, Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Image from 'material-ui-image';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ComboBox from '../Publicar/ComboBox.jsx'
import TextoMultiple from '../Publicar/TextoMultiple'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
//Iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

//Imagenes
import Logo from '../Imagenes/Logo_baku_blanco.png';




const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    icono: {
        marginLeft: -3,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        alingItems: 'center',
        whiteSpace: 'nowrap',
        background: '#4B9C8E',
    },
    drawerOpen: {
        width: drawerWidth,
        background: '#4B9C8E',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: '#4B9C8E',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    carousel: {
        marginTop: 11,
        marginHorizon: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    link: {
        color: "white",
        "text-decoration": "none",
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        
    },
    slider: {
        marginTop: 500,
    },
    titulo: {
        marginLeft: 20,
    },
    btnPublicar: {
        background: "#4B9C8E",
    },
}));


export default function MiniDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenClose = () => {
        open === true ? setOpen(false) : setOpen(true);
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
                <Link to="/Inicio" className={classes.link}>
                    <ListItem button className={classes.texto} >
                        <ListItemIcon><HomeOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                        <ListItemText primary='Inicio' style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                    <Link to="/Buscar" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><SearchOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                            <ListItemText primary="Buscar" className={classes.texto} style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                    <Link to="/Biblioteca" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><MenuBookOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                        <ListItemText primary='Mi Biblioteca' style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                    <Link to="/Publicar" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><PublishOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                        <ListItemText primary='Publicar' style={{ color: "#FFFFFF" }} />
                    </ListItem>
                    </Link>
                </List>
                <Divider />

            </Drawer>
            <Divider />

            <main className={classes.content}>
                <AppBar />
                <React.Fragment>
                    <Container >

                        <Grid container spacing={3}>
                            <Grid item xl={12}>
                            </Grid>
                            <Grid>
                                <Typography variant="h4" gutterBottom >
                                    Publica tu historia
                                </Typography>
                            </Grid>
                            <Grid item xl={12} >
                                <Typography>Portada</Typography>
                                <input type="file" />
                            </Grid>
                            <Grid item xl={12} >
                                <Typography>Título</Typography>
                                <TextField
                                    required
                                    id="titulo"
                                    name="firstName"
                                    label="Título"
                                    autoComplete="given-name"
                                />
                            </Grid>


                            <Grid item xl={12}>
                                <Typography>Descripcíon</Typography>
                                <TextoMultiple />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Género</Typography>
                                <ComboBox />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                    label="Apto para todo publico "
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography>Cargar contenido del libro</Typography>
                                <input type="file" />

                            </Grid>
                            <Grid item xs={12} >
                                <Button className={classes.btnPublicar} variant="contained">Publicar</Button>
                            </Grid>
                            <Grid item xs={12} >
                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
                <Footy />
            </main>

        </div>
    );
}
