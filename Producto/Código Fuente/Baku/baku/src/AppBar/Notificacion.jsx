import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import {  useRef, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import {es} from 'date-fns/esm/locale';
import NotificationsIcon from '@mui/icons-material/Notifications';

import * as usuarioService from '../Sesión/Usuarios/UsuarioService';
// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';
// components
import Iconify from './Iconify';
import Scrollbar from './Scrollbar';
import MenuPopover from './MenuPopover';
import * as NotificacionServices from '../Notificacion/NotificacionService.ts';
// ----------------------------------------------------------------------


function renderContent(notification) {
  const titulo = (
    <Typography variant="subtitle2">
      {notification.titulo}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.descripcion)}
      </Typography>
    </Typography>
  );
  if (notification.tipo === "subidaLibro") {
    return {
      avatar: <img referrerPolicy="no-referrer" alt={notification.titulo} src={notification.avatar}  width='40px' />,
      titulo
    };
  }
  if (notification.tipo === 'chat_message') {
    return {
      avatar: <img alt={notification.titulo} src="/static/icons/ic_notification_chat.svg" />,
      titulo
    };
  }

  return {
    avatar: <img referrerPolicy="no-referrer" alt={notification.titulo} src={notification.avatar}  width='40px' />,
    titulo
  };
  
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};



//Permite modificar los iconos de las notificaciones
function NotificationItem({ notification, id }) {
  const { avatar, titulo } = renderContent(notification);

  const LibroLeido = async (libroId) => {
    const usuario_id = localStorage.getItem("usuario_activo")
    const libroData = {
      'auth0id': usuario_id,
      'idLibro': libroId,
      'finLectura': false,
    }
    //setteo la noti como leida
    await NotificacionServices.notificacionLeida(usuario_id, notification._id);
    const res = await usuarioService.usuarioLibroLeido(libroData);
  }

  return (
    avatar.ref ? (
    <ListItemButton
      disableGutters
      onClick={() => LibroLeido(id)}
      component={RouterLink}
      to={`/Lectura/${id}`}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.esNoleido && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}> {avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={titulo}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Iconify icon="eva:clock-fill" sx={{ mr: 0.5, width: 16, height: 16 }} />
           
            {formatDistanceToNow(new Date(notification.createdAt),  {locale: es, addSuffix: true })}
          </Typography>
        }
      />
    </ListItemButton>)
    :
    (<ListItemButton
      disableGutters
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.esNoleido && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}> {'../Imagenes/Logo_MP.png'}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={titulo}
      />
    </ListItemButton>)
  );
}
let bandera = true;
export default function NotificationsPopover(propNotificacion) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(propNotificacion.notificacion);

  const [abrir, setAbrir] = useState(propNotificacion.abrirMobile);
  // activar useEffect cada vez que se abre el popover de notificaciones 

  const totalUnRead = notifications.filter((item) => item.esNoleido === true).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const marcarTodasComoLeidas = async () => {
    //obtener todos los _id de las notificaciones
    notifications.map((item) => item._id);
    const usuarioActual = localStorage.getItem('usuario_id');
    await NotificacionServices.marcarTodasComoLeidas(usuarioActual);
  };

  const handleMarkAllAsRead = () => {
    marcarTodasComoLeidas();
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        esNoleido: false
      }))
    );
  };


  return (
    <>
      {!abrir?<IconButton
        ref={anchorRef}
       
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.01)
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          {/* Quitar animacion  */}
          <NotificationsIcon sx={{ width: '1.4em', height: '1.4em' }} />
        </Badge>
      </IconButton>:
      <Button
        ref={anchorRef}
        disableRipple={true}
        disableTouchRipple={true}
        disableFocusRipple={true}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.01)
          }),
          backgroundColor: 'transparent',
          color: '#2c2c2c',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          right: '6px',
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          {/* Quitar animacion  */}
          Notificaciones
        </Badge>
      </Button>}

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>Notificaciones</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tienes {totalUnRead} mensajes sin leer
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Marcas todas como leidas">
              <IconButton color='success'  onClick={handleMarkAllAsRead} backgroundcolor='success'>
                <Iconify icon="eva:done-all-fill" focusVisible  width={'1.3em'} height={'1.3em'} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
               <Typography variant="subtitle2">NUEVAS</Typography> 
              </ListSubheader>
            }
          >
            {notifications.filter((item) => item.esNoleido).map((notification) => (
              <NotificationItem key={notification._id} notification={notification} id={notification.id_libro} />
            ))}

          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                 <Typography variant="subtitle2">ANTERIORES</Typography> 
              </ListSubheader>
            }
          >
            {/* ordenar notifications por fecha de creacion */}
          
            {notifications.filter((item) => item.esNoleido === false ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((notification) => (
              //anular style de Link

              <NotificationItem key={notification._id} notification={notification} id={notification.id_libro} />

            ))}
          </List>


        </Scrollbar>
        {/* Se deja para futuras implementaciones */}
        {/*  <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            Ver Todas
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}