import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Notifications from './Notificacion.js';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from "react-router-dom";
import * as NotificacionServices from '../Notificacion/NotificacionService.ts'


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
      display: 'flex',
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
    "margin-right": "1px",
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
  const [valor, setValor] = React.useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let history = useHistory();
  
  const buscarNotificaciones = async () => {
    //esperar 1 segundo para que se carguen las notificaciones
    let usuarioAuth0 = localStorage.getItem('usuario_activo');
    const notificaciones = await NotificacionServices.buscarNotificacionUsuarioAuth0(usuarioAuth0);
    const respuesta = notificaciones.data.mensajes;

    //ordenar el array de notificaciones por fecha de creacion
    respuesta.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setValor(respuesta)
    return respuesta;
  };
  
  useEffect(() => {
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
      <MenuItem onClick={handleMenuClose} component={Link} to="/Perfil">
        Perfil
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
      {valor ? <Notifications notificacion={valor}  /> : null }
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
                 const  valor=e.target.value;
                  //redirecionar al componente buscar con parametros
                 history.push(`/Buscar/${valor}`);
                  }}}
            />
          </div>

          <div className={classes.grow} />
          <div>
            <Button className={classes.btnSuscripcion} component={Link} to="/suscripcion" variant="contained">
                Suscribirse
            </Button>
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
              <Avatar  alt={user.name} src={user.picture} referrerPolicy="no-referrer" />
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