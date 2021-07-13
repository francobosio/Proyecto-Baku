import React from 'react';
import clsx from 'clsx';
import {  makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Card from '../Card/Card.js';

//Iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

//Imagenes
import Logo from '../Imagenes/Logo_baku_negro.png';
import imagen1 from "../Imagenes/1.jpg";
import imagen5 from "../Imagenes/5.jpg";
import imagen4 from "../Imagenes/4.jpg";
import Image from 'material-ui-image';


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
        marginHorizon:'100%',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    content: {
        display:'flex',
        flexDirection:'column',
        flex:1,
        
    },
}));

function Item(props)
{
    return (
        <Paper>
            <Image src={props.item.imagen} style={{ width: 180, height: 250,justifyContent: 'center', alignItems: 'center'}} /> 
        </Paper>
    )
}
export default function MiniDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const items = [
        {imagen: imagen1},
        {imagen: imagen4},
        {imagen: imagen5},
    ]

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
                <Image src={Logo} aspectRatio={2.4} color={"#4B9C8E"}/>
                    <IconButton className={classes.icono} onClick={handleDrawerOpenClose} >
                        {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                        <ListItem button className={classes.texto} >
                            <ListItemIcon><HomeOutlinedIcon style={{ color: "#FFFFFF"}} /></ListItemIcon>
                            <ListItemText primary='Inicio' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><SearchOutlinedIcon style={{ color: "#FFFFFF"}} /></ListItemIcon>
                            <ListItemText primary='Buscar' className={classes.texto} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><MenuBookOutlinedIcon style={{ color: "#FFFFFF"}} /></ListItemIcon>
                            <ListItemText  primary='Mi Biblioteca' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><PublishOutlinedIcon style={{ color: "#FFFFFF"}} /></ListItemIcon>
                            <ListItemText primary='Subir' />
                        </ListItem>
                </List>
                <Divider />

            </Drawer>
            <hr />
            <Divider/> 
                <hr />
            
            <main className={classes.content}>
                <AppBar/>
                
            <Carousel className={classes.carousel}  >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
            </Carousel>
            
            <Card/>
            <Divider/>
            
            </main>
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
        </div>
    );
}