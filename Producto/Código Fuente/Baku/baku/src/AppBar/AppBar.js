import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Notifications from './Notificacion.js';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from "react-router-dom";
import { Box } from '@mui/material';
import * as NotificacionServices from '../Notificacion/NotificacionService.ts'
import NotificationsPopover from './Notificacion.js';

//BORRAR
import { faker } from '@faker-js/faker';
import { set, sub, formatDistanceToNow } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  link: {
    color: "#000",
    "text-decoration": "none",
  },
  sectionDesktop: {

    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  btnSuscripcion: {
    background: "#EABE3F",
    color: "white",
    'borderRadius': '5rem',
    "margin-right": "30px",
    '&:hover': {
      'background': '#E5A65E',
      'color': '#FFFFFF',
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  toolbar: {
    "background": "#4B9C8E",
  },
}
));

export default function PrimarySearchAppBar() {
  const { logout, user } = useAuth0();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [valor, setValor] = React.useState('');
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let history = useHistory();
  
  const buscarNotificaciones = async () => {
    //esperar 1 segundo para que se carguen las notificaciones
    /* let usuarioAuth0 = localStorage.getItem('usuario_activo'); */
    console.log("entro")
    const notificaciones = await NotificacionServices.buscarNotificacionUsuarioAuth0("google-oauth2|100909772997701456515");
    const respuesta = notificaciones.data.mensajes;
    setValor(respuesta)
    console.log(respuesta);
    return respuesta;
  };
  
  useEffect(() => {
      console.log("hola")
      buscarNotificaciones();
    }, [])
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.link} to="/Perfil">Perfil</Link>
      </MenuItem>
      <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
     {/*  {(buscarNotificaciones() !== "undefined")?
        <Notifications notificacion={buscarNotificaciones()}  />
        : null
      } */}
        <p>Notificaciones</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );
  const NOTIFICATIONS = [
    {
      id: faker.datatype.uuid(),
      title: 'Your order is placed',
      description: 'waiting for shipping',
      avatar: null,
      type: 'mail',
      createdAt: set(new Date(), { hours: 10, minutes: 30 }),
      isUnRead: true
    },
    {
      id: faker.datatype.uuid(),
      title: faker.name.findName(),
      description: 'answered to your comment on the Minimal',
      avatar: null,
      type: 'mail',
      createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
      isUnRead: true
    },
    {
      id: faker.datatype.uuid(),
      title: 'You have new message',
      description: '5 unread messages',
      avatar: null,
      type: 'chat_message',
      createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
      isUnRead: false
    },
    {
      id: faker.datatype.uuid(),
      title: 'You have new mail',
      description: 'sent from Guido Padberg',
      avatar: null,
      type: 'mail',
      createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
      isUnRead: false
    },
    {
      id: faker.datatype.uuid(),
      title: 'Delivery processing',
      description: 'Your order is being shipped',
      avatar: null,
      type: 'order_shipped',
      createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
      isUnRead: false
    }
  ];
  return (
    <div className={classes.grow}>
      <AppBar position="static"  >
        <Toolbar className={classes.toolbar}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Autor, Título o Editorial"
              classes={{ root: classes.inputRoot, input: classes.inputInput, }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  console.log('diste enter');
                 const  valor=e.target.value;
                  //redirecionar al componente buscar con parametros
                 history.push(`/Buscar/${valor}`);
                  }}}
            />
          </div>

          <div className={classes.grow} />
          <div>
            <Button className={classes.btnSuscripcion} variant="contained">Suscribirse</Button>
          </div>
          <div className={classes.sectionDesktop}>
            {valor ? <Notifications notificacion={valor}  /> : null }

          </div>
          <div className={classes.sectionDesktop}>
          <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt={user.name} src={user.picture}></Avatar>
            </IconButton>
            </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};