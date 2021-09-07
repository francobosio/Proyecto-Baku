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
import imagen1 from "../Imagenes/1.jpg";
import imagen2 from "../Imagenes/El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur-md.jpg";
import imagen3 from "../Imagenes/3.jpg";
import imagen6 from "../Imagenes/6.jpg";
import imagen7 from "../Imagenes/7.jpg";
import imagen8 from "../Imagenes/8.jpg";
import imagen5 from "../Imagenes/5.jpg";
import imagen4 from "../Imagenes/4.jpg";
import imagen9 from "../Imagenes/Los_120_dias_de_Sodoma-Marques_de_Sade-md.png";
import imagen10 from "../Imagenes/La_llamada_de_Cthulhu-H._P._Lovecraft-md.jpg"
import imagen11 from "../Imagenes/Don_Quijote_de_la_Mancha-Cervantes_Miguel-md.png"
import imagen12 from "../Imagenes/Alicia_en_el_pais_de_las_maravillas-Carroll_Lewis-md.png"
import imagen13 from "../Imagenes/El_arte_de_la_guerra-Sun_Tzu-md.png"
import imagen14 from "../Imagenes/El_traje_nuevo_del_emperador-Hans_Christian_Andersen-md.jpg"
import imagen15 from "../Imagenes/La_divina_comedia-Dante_Alighieri-md.png"

const libros = [
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen12,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen2,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'Biografia_Leonardo_daVinci-CVerdejo.pdf',
        image: imagen3,
        title: 'Leonardo',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen13,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_maravilloso_Mago_de_Oz-L._Frank_Baum.pdf',
        image: imagen4,
        title: 'El maravilloso mago de OZ',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen14,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_Necronomicon-H.P_Lovecraft.pdf',
        image: imagen5,
        title: 'El necronomicron',

    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen15,
        title: 'El regreso de Sherlok Holmes',

    },
    {
        pdf: 'El_mundo_perdido-Conan_Doyle_Arthur.pdf',
        image: imagen6,
        title: 'El mundo perdido',

    },
    {
        pdf: 'Bodas_de_Sangre-Garcia_Lorca_Federico.pdf',
        image: imagen7,
        title: 'Bodas de sangre',

    },
    {
        pdf: 'Heidi-Johanna_Spyri.pdf',
        image: imagen8,
        title: 'Heidi',

    },
    {
        pdf: 'Los_120_dias_de_Sodoma-Marques_de_Sade.pdf',
        image: imagen9,
        title: 'Los 120 días de sodoma',

    },
    {
        pdf: 'La_llamada_de_Cthulhu-H._P._Lovecraft.pdf',
        image: imagen10,
        title: 'La llamada de Cthulhu',

    },
    {
        pdf: 'Don_Quijote_de_la_Mancha-Cervantes_Miguel.pdf',
        image: imagen11,
        title: 'Don Quijote de la Mancha',

    },
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
    slider: {
        marginTop: 500,
    },
    titulo: {
        marginLeft: 20,
    },
    link: {
        color: "white",
        "text-decoration": "none",
    }
}));

function Item(props) {
    return (
        <Paper>
            <Image src={props.item.imagen} style={{ width: 180, height: 100, 'object-fit': 'contain', justifyContent: 'center', alignItems: 'center' }} />
        </Paper>
    )
}
export default function MiniDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenClose = () => {
        setOpen(!open)
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
                    <Link to="/Inicio"  className={classes.link}>
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

                <Carousel className={classes.carousel}  >
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
                <Typography variant='h4' className={classes.titulo} >Leídos recientemente</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Populares en Baku</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Tendencias</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo}>Elegidos por los editores</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Footy />
            </main>

        </div>
    );
}
