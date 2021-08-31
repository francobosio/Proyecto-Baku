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
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Slider from '../CarouselPrincipal';
import Image from 'material-ui-image';
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
import los40 from "../Imagenes/los40.svg";
import imagen1 from "../Imagenes/1.jpg";
import imagen2 from "../Imagenes/2.jpg";
import imagen3 from "../Imagenes/3.jpg";
import imagen6 from "../Imagenes/6.jpg";
import imagen7 from "../Imagenes/7.jpg";
import imagen8 from "../Imagenes/8.jpg";
import imagen5 from "../Imagenes/5.jpg";
import imagen4 from "../Imagenes/4.jpg";


const libros = [
    {
        id: 1,
        image: imagen1,
        title: '1983'
    },
    {
        id: 2,
        image: imagen5,
        title: 'Russian doll'
    },{
        id: 3,
        image: imagen4,
        title: '1983'
    },{
        id: 4,
        image: imagen2,
        title: '1983'
    },
    {
        id: 5,
        image: imagen3,
        title: 'Russian doll'
    },{
        id: 6,
        image: imagen6,
        title: '1983'
    },{
        id: 7,
        image: imagen7,
        title: '1983'
    },{
        id: 7,
        image: imagen7,
        title: '1983'
    },{
        id: 7,
        image: imagen7,
        title: '1983'
    },{
        id: 7,
        image: imagen7,
        title: '1983'
    },
    {
        id: 8,
        image: imagen8,
        title: 'Russian doll'
    },{
        id: 1,
        image: imagen1,
        title: '1983'
    },{
        id: 2,
        image: imagen5,
        title: 'Russian doll'
    },{
        id: 3,
        image: imagen4,
        title: '1983'
    },{
        id: 4,
        image: imagen2,
        title: '1983'
    },{
        id: 4,
        image: imagen2,
        title: '1983'
    },
    {
        id: 4,
        image: imagen2,
        title: '1983'
    },
    {
        id: 5,
        image: imagen3,
        title: 'Russian doll'
    },{
        id: 6,
        image: imagen6,
        title: '1983'
    },{
        id: 7,
        image: imagen7,
        title: '1983'
    },
    {
        id: 8,
        image: imagen8,
        title: 'Russian doll'
    }
];

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
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    slider:{
        marginTop:500,
    },
    titulo:{
        marginLeft: 20,
    }
}));

function Item(props) {
    return (
        <Paper>
            <Image src={props.item.imagen} style={{ width: 180, height: 100, justifyContent: 'center', alignItems: 'center' }} />
        </Paper>
    )
}
export default function MiniDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenClose = () => {
        open === true ? setOpen(false) : setOpen(true);
    }
    const items = [
        { imagen: imagen1 },
        { imagen: imagen4 },
        { imagen: imagen5 },
    ]

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

            <main className={classes.content}>
                <AppBar />

                <Carousel className={classes.carousel}  >
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
                    <Typography variant='h4' className={classes.titulo} >Leídos recientemente</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Populares en Baku</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Tendencias</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo}>Elegidos por los editores</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
                    ))}
                </Slider>
                <Footy/>
            </main>
            
        </div>
    );
}
