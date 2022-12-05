import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Image from 'material-ui-image';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
//Iconos
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';

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
        [theme.breakpoints.only('md')]: {
            width: theme.spacing(12),
        }, [theme.breakpoints.only('sm')]: {
            width: theme.spacing(9),
        }, [theme.breakpoints.only('xs')]: {
            width: '2.8em',
        },
    },
    toolbar: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        marginBottom: theme.spacing(2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    link: {
        color: "white",
        "text-decoration": "none",
    },
    ListItemIconProps: {
        [theme.breakpoints.only('md')]: {
            marginLeft: '31%',
        }, [theme.breakpoints.only('sm')]: {
            marginLeft: '23%',
        }, [theme.breakpoints.only('xs')]: {
            marginLeft: '-30%',
        },
    },
    ListItemTextrops: {
        [theme.breakpoints.only('md')]: {
            display: 'none',
        }, [theme.breakpoints.only('sm')]: {
            display: 'none',
        }, [theme.breakpoints.only('xs')]: {
            display: 'none',
        }
    },
}));


export const MiDrawer = (props) => {
    const location = useLocation();
    const [revisar, setrevisar] = React.useState(localStorage.getItem('tipoUsuario') === '3' ? true : false);
    const [revisar2, setrevisar2] = React.useState(!revisar);
    const classes = useStyles();
    const [open, setOpen] = React.useState(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false);
    const [selectedIndex] = React.useState(props.pestaña);
    const theme = useTheme();
    const porcentajeMinAncho = "31%";
    const ocultarLogo = useMediaQuery(theme.breakpoints.down('md'));
    const matches = useMediaQuery(theme.breakpoints.down('lg'));
   
    const handleDrawerOpen = () => {
        if (matches) {
            setOpen(false);
            localStorage.setItem('drawer_open', false);
        } else {
            setOpen(true);
            localStorage.setItem('drawer_open', true);
        }
    };

    const handleLink = () => {
        setOpen(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false)
    }

    useEffect(() => {
        setOpen(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false)
        setrevisar(localStorage.getItem('tipoUsuario') === '3' ? true : false)
    }, [location.pathname])

    useEffect(() => {
        handleDrawerOpen()
    }, [matches])
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
                    {ocultarLogo ? null : <Image src={Logo} aspectRatio={2.4} color={"#4B9C8E"} />}
                </Box>
                <Divider />
                <List>
                    {revisar &&
                        <Link onClick={handleLink} to="/Inicio" className={classes.link} >
                            {/* Crear tooltip por debajo del cursor */}
                            <Tooltip title="Inicio" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 1} >
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps} ><HomeOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Inicio' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar2 &&
                        <Link onClick={handleLink} to="/Buscar" className={classes.link}>
                            <Tooltip title="Buscar" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 2}>
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><SearchOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary="Buscar" className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar &&
                        <Link to="/Comunidad" className={classes.link} >
                            <Tooltip title="Comunidad" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 3}>
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><AccountCircleIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Comunidad' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar2 &&
                        <Link to="/Biblioteca" className={classes.link} >
                            <Tooltip title="Biblioteca" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 4}>
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><MenuBookOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Biblioteca' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }

                    {revisar2 &&
                        <Link to="/Suscripciones" className={classes.link} >
                            <Tooltip title="Suscripciones" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 5}>
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><GroupAddIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Suscripciones' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar2 &&
                        <Link to="/Publicar" className={classes.link} >
                            <Tooltip title="Publicar" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 6}>
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><PublishOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Publicar' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar &&
                        <Link to="/Revision" className={classes.link} >
                            <Tooltip title="Revision" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 7} >
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><RateReviewOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Revisión' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar &&
                        <Link to="/Reclamo" className={classes.link} >
                            <Tooltip title="Reclamos" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 8} >
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><ReportGmailerrorredOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Reclamos' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar &&

                        <Link to="/Estadistica" className={classes.link} >
                            <Tooltip title="Reportes" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                <ListItem button selected={selectedIndex === 9}>
                                    <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><StackedBarChartIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                    <ListItemText primary='Reportes' className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </ListItem>
                            </Tooltip>
                        </Link>
                    }
                    {revisar &&
                        <Link to="/Ajustes" className={classes.link} >
                            <ListItem button selected={selectedIndex === 10}>
                                <ListItemIcon style={{ minWidth: porcentajeMinAncho }} className={classes.ListItemIconProps}><MiscellaneousServicesIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                                <Tooltip title="Ajustes" enterDelay={1000} leaveDelay={200} enterNextDelay={1000} arrow>
                                    <ListItemText primary={`Ajustes`} className={classes.ListItemTextrops} style={{ color: "#FFFFFF" }} />
                                </Tooltip>
                            </ListItem>
                        </Link>
                    }
                    <Divider />
                </List>
            </Drawer>
            <Divider />
        </Box>
    );
}
