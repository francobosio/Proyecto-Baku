import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Image from 'material-ui-image';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Container, Box } from '@mui/system';
//Iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


//Imagenes
import Logo from '../Imagenes/Logo_baku_blanco.png';
const drawerWidth = "10%";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
    link: {
        color: "white",
        "text-decoration": "none",
    },
}));


export const MiDrawer = (props) => {
    const location = useLocation();
    const [revisar, setrevisar] = React.useState(localStorage.getItem('tipoUsuario') === '3' ? true : false);
    const classes = useStyles();
    const [open, setOpen] = React.useState(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false);
    const [selectedIndex] = React.useState(props.pestaña);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('lg'));
    const handleDrawerOpen = () => {
        console.log("CAMBIO EL TAMAÑO" + matches);
        if (matches) {
            setOpen(false);
            localStorage.setItem('drawer_open', false);
        } else {
            setOpen(true);
            localStorage.setItem('drawer_open', true);
        }
    };

    const handleDrawerOpenClose = () => {
        setOpen((data) => {
            localStorage.setItem('drawer_open', !data)
            return !data
        })
    }

    const handleLink = () => {
        setOpen(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false)
    }

    useEffect(() => {
        setOpen(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false)
        setrevisar(localStorage.getItem('tipoUsuario') === '3' ? true : false)
    }, [location.pathname])

    useEffect(() => {
        handleDrawerOpen()
    }
        , [matches])
    //si el tipo de usuario es 1, se muestra el boton Revisar
    return (
        <Box component="div" className={classes.root}>
            <Drawer
                anchor="left"
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
                <Box component="div" className={classes.toolbar}>
                    {/* si la pantalla es XS asignar open a false */}

                    <Image src={Logo} aspectRatio={2.4} color={"#4B9C8E"} />
                    <IconButton className={classes.icono} onClick={handleDrawerOpenClose} style={{ color: "#FFFFFF" }} >
                        {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    <Link onClick={handleLink} to="/Inicio" className={classes.link} >
                        {/* Crear tooltip por debajo del cursor */}
                        <Tooltip title="Inicio" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                            <ListItem button selected={selectedIndex === 1} sx={{ minWidth: "1rem" }}>
                                <ListItemIcon  ><HomeOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                <ListItemText primary='Inicio' style={{ color: "#FFFFFF" }} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                    <Link onClick={handleLink} to="/Buscar" className={classes.link}>
                        <Tooltip title="Buscar" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                            <ListItem button selected={selectedIndex === 2}>
                                <ListItemIcon><SearchOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                <ListItemText primary="Buscar" style={{ color: "#FFFFFF" }} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                    <Link to="/Usuarios" className={classes.link} >
                        <ListItem button>
                            <ListItemIcon><AccountCircleIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                            <ListItemText primary='Usuarios' style={{ color: "#FFFFFF" }} />
                        </ListItem>
                    </Link>
                    <Link to="/Biblioteca" className={classes.link} >
                        <Tooltip title="Biblioteca" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                            <ListItem button selected={selectedIndex === 3}>
                                <ListItemIcon><MenuBookOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                <ListItemText primary='Mi Biblioteca' style={{ color: "#FFFFFF" }} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                    <Link to="/Publicar" className={classes.link} >
                        <Tooltip title="Publicar" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                            <ListItem button selected={selectedIndex === 4}>
                                <ListItemIcon><PublishOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                <ListItemText primary='Publicar' style={{ color: "#FFFFFF" }} />
                            </ListItem>
                        </Tooltip>
                    </Link>
                    {(revisar === true) ?
                        <List>
                            <Link to="/Estadistica" className={classes.link} >
                                <Tooltip title="Estadisticas" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                    <ListItem button selected={selectedIndex === 5}>
                                        <ListItemIcon><StackedBarChartIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                        <ListItemText primary='Estadísticas' style={{ color: "#FFFFFF" }} />
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            <Link to="/Revision" className={classes.link} >
                                <Tooltip title="Revisar" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                    <ListItem button selected={selectedIndex === 6} >
                                        <ListItemIcon><RateReviewOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                        <ListItemText primary='Revisión' style={{ color: "#FFFFFF" }} />
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            <Link to="/Parametros" className={classes.link} >
                                <ListItem button selected={selectedIndex === 7}>
                                    <ListItemIcon><MiscellaneousServicesIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <Tooltip title="Parametros" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                        <ListItemText primary={`Parámetros`} style={{ color: "#FFFFFF" }} />
                                    </Tooltip>
                                </ListItem>
                            </Link>
                        </List> :
                        null}
                </List>
                <Divider />
            </Drawer>
            <Divider />
        </Box>
    );
}
