import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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

//Iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

//Imagenes
import Logo from '../Imagenes/Logo_baku_blanco.png';
import { opendir } from 'fs';

const drawerWidth = "15rem";
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


export const MiDrawer = () => {
    const location = useLocation();
    const classes = useStyles();
    const [open, setOpen] = React.useState(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false);

    const handleDrawerOpenClose = () => {
        setOpen((data) => {
            localStorage.setItem('drawer_open', !data)
            return !data
        })
    }

    const handleLink = () => {
        setOpen(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false)
        console.log(localStorage.getItem('drawer_open'))
        console.log("entro a useEffect")
    }

    useEffect(() => {
        setOpen(localStorage.getItem('drawer_open') ? localStorage.getItem('drawer_open') : false)
        console.log(localStorage.getItem('drawer_open'))
        console.log("entro a useEffect")
    }, [location.pathname])

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
                    <Link onClick={handleLink} to="/Inicio" className={classes.link} >
                        <ListItem button className={classes.texto} >
                            <ListItemIcon><HomeOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                            <ListItemText primary='Inicio' style={{ color: "#FFFFFF" }} />
                        </ListItem>
                    </Link>
                    <Link onClick={handleLink} to="/Buscar" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><SearchOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                            <ListItemText primary="Buscar" className={classes.texto} style={{ color: "#FFFFFF" }} />
                        </ListItem>
                    </Link>
                    <Link to="/Biblioteca" className={classes.link} >
                        <ListItem button>
                            <ListItemIcon><MenuBookOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                            <ListItemText primary='Mi Biblioteca' style={{ color: "#FFFFFF" }} />
                        </ListItem>
                    </Link>
                    <Link to="/Publicar" className={classes.link} >
                        <ListItem button>
                            <ListItemIcon><PublishOutlinedIcon style={{ color: "#FFFFFF" }} /></ListItemIcon>
                            <ListItemText primary='Publicar' style={{ color: "#FFFFFF" }} />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
            </Drawer>
            <Divider />
        </div>
    );
}
