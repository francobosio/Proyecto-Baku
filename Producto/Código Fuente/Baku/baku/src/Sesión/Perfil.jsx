import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar/AppBar.js";
import Footy from "../Footy/Footy.jsx";
import { MiDrawer } from "../Drawer/Drawer.jsx";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Container, TextField } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';
import Checkbox from '@material-ui/core/Checkbox';
import { Dialog, DialogActions, DialogContent, DialogContentText, FormControlLabel } from "@mui/material";
import 'date-fns';
import { useAlert } from 'react-alert';

import * as usuarioService from './Usuarios/UsuarioService';

const localeMap = {
  es: esLocale
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#99cfbf",
    display: "flex",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    'min-height': '100vh'
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    paddingLeft: "1rem",
  },
  fondo: {
    backgroundColor: "#7ec2ae",
    minHeight: "75vh",
  },
  grid: {
    padding: "1.5rem",
    gridGap: 0,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: "2rem",
    marginLeft: "5rem",
    padding: "1rem 0 0 1rem",
  },
  texto: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  botonGuardar: {
    'background-color': '#4B9C8E',
    'borderRadius': '5rem',
    width: '11rem',
    '&:hover': {
      'background': '#076F55',
      'color': '#FFFFFF',
    }
  },
  botonEliminar: {
    'color': '#FFFFFF',
    'background-color': '#922c2c',
    'borderRadius': '5rem',
    width: '11rem',
    '&:hover': {
      'background': '#580000',
      'color': '#FFFFFF',
    }
  },
  textFieldEnabled: {
    "& input.Mui-disabled": {
      color: "#000"
    }
  },
  datePicker: {
    "margin-top": '0',
    "paddingBottom": '10%',
  },
  customCheckbox: {
    'color': '#076F55',
  },
}));

export default function Perfil() {
  const [selectedDate, setSelectedDate] = React.useState(Date.now());
  const [locale] = React.useState("es");
  const [flagNombreEnabled, setFlagNombreEnabled] = React.useState(false);
  const [flagApellidoEnabled, setFlagApellidoEnabled] = React.useState(false);
  const [flagAliasEnabled, setFlagAliasEnabled] = React.useState(false);
  const [flagPermanenciaLibros, setFlagPermanenciaLibros] = React.useState(false);

  const { user, logout } = useAuth0();
  const [userDB, setUserDB] = useState(null);
  const classes = useStyles();

  const inputNombre = useRef();
  const inputApellido = useRef();
  const inputEmail = useRef();
  const inputAlias = useRef();

  let usuario = {};

  const loadUsuario = async () => {
    const usuario_auth0 = localStorage.getItem("usuario_activo");
    const res = await usuarioService.getUsuario(usuario_auth0);
    usuario = res.data;
    if (usuario == null) {
      console.log("No se pudo cargar el usuario");
    } else {
      setUserDB(usuario);
      inputNombre.current.value = usuario.nombre;
      inputApellido.current.value = usuario.apellido;
      inputEmail.current.value = usuario.correo_electronico;
      inputAlias.current.value = usuario.usuario ? usuario.usuario : 'Invitado';
      if (usuario.fecha_nacimiento != null) {
        setSelectedDate(Date.parse(usuario.fecha_nacimiento));
      }
    }
  }
  useEffect(() => {
    loadUsuario()
  }, [])

  const alert = useAlert();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleApellidoEnable = () => {
    inputApellido.current.disabled = false;
    setFlagApellidoEnabled(true);
  }

  const handleNombreEnable = () => {
    inputNombre.current.disabled = false;
    setFlagNombreEnabled(true);
  }

  const handleAliasEnable = () => {
    inputAlias.current.disabled = false;
    setFlagAliasEnabled(true);
  }

  const handlePermanenciaLibros = e => {
    setFlagPermanenciaLibros(e.target.checked);
  }

  const saveChanges = async () => {
    localStorage.setItem("fechaNacimiento", new Date(selectedDate));
    setFlagNombreEnabled(false);
    setFlagApellidoEnabled(false);
    setFlagAliasEnabled(false);
    const nuevoNombre = inputNombre.current.value;
    const nuevoApellido = inputApellido.current.value;
    const nuevoAlias = inputAlias.current.value;
    const selectedDateFormat = new Date(selectedDate);
    const todayDate = new Date(Date.now());

    const usuarioData = {
      'id': userDB._id,
      'apellido': nuevoApellido != '' ? nuevoApellido : userDB.apellido,
      'nombre': nuevoNombre != '' ? nuevoNombre : userDB.nombre,
      'usuario': nuevoAlias != '' ? nuevoAlias : userDB.usuario,
      'fecha_nacimiento': selectedDateFormat.toDateString() != todayDate.toDateString() ? selectedDateFormat : userDB.fecha_nacimiento,
    };

    const res = await usuarioService.modificarUsuario(usuarioData);
    console.log(res)
    handleClose();
    if (res.data.message == "Usuario modificado con éxito !!!"){
      alert.show("Los cambios se guardaron correctamente!", { type: 'success', position: 'top center' });
    }
  }

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSave, setOpenSave] = React.useState(false);

  const handleClose = () => {
    setOpenDelete(false);
    setOpenSave(false);
  };

  const openDeleteDialog = () => {
    setOpenDelete(true);
  }

  const openSaveDialog = () => {
    setOpenSave(true);
  }

  const deleteUser = async () => {
    const res = await usuarioService.eliminarUsuario(userDB._id, flagPermanenciaLibros, logout);
    alert.show("Su cuenta fué eliminada", { type: 'success', position: 'top center' });
    localStorage.clear()
  }

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item container direction="column" xs={1}  >
        <MiDrawer />
        </Grid>
        {userDB != null ? (
          <Grid item container direction="column" xs={11}>
            <AppBar />
            <Typography className={classes.titulo}>Tu Perfil</Typography>
            <Container fixed className={classes.fondo}>
              <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={10}>
                  <img
                    alt="complex"
                    src={user.picture}
                    className={classes.img}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Typography className={classes.texto}>Nombre:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className={flagNombreEnabled ? classes.textFieldEnabled : ''}
                    name="nombre"
                    disabled
                    inputRef={inputNombre}
                  />
                </Grid>
                <Grid item xs={5}>
                  <IconButton onClick={handleNombreEnable}>
                    <EditIcon />
                  </IconButton>
                </Grid>

                <Grid item xs={3}>
                  <Typography className={classes.texto}>Apellido:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className={flagApellidoEnabled ? classes.textFieldEnabled : ''}
                    name="apellido"
                    disabled
                    inputRef={inputApellido}
                  />
                </Grid>
                <Grid item xs={5}>
                  <IconButton onClick={handleApellidoEnable}>
                    <EditIcon />
                  </IconButton>
                </Grid>

                <Grid item xs={3}>
                  <Typography className={classes.texto}>Alias:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className={flagAliasEnabled ? classes.textFieldEnabled : ''}
                    name="alias"
                    disabled
                    inputRef={inputAlias}
                  />
                </Grid>
                <Grid item xs={5}>
                  <IconButton onClick={handleAliasEnable}>
                    <EditIcon />
                  </IconButton>
                </Grid>

                <Grid item xs={3}>
                  <Typography className={classes.texto}>Email:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    name="email"
                    disabled
                    inputRef={inputEmail}
                  />
                </Grid>

              
                <Grid item xs={5} sm={3}>
                  <Typography className={classes.texto}>Fecha de Nacimiento:</Typography>
                </Grid>
                <Grid className={classes.datePicker} item xs={7} sm={4} md={3}>
                  <MuiPickersUtilsProvider className={classes.datePicker} utils={DateFnsUtils} locale={localeMap[locale]}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="fechaNacimiento"
                      label="Fecha de Nacimiento"
                      format="dd/MM/yyyy"
                      disableFuture={true}
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <div>
                <Dialog
                  open={openDelete}
                  onClose={handleClose}>
                  <DialogContent>
                    <DialogContentText>
                      ¿Está seguro que quiere eliminar la cuenta?, esta decisión no puede revertirse!
                    </DialogContentText>

                    <FormControlLabel
                      className={classes.controlLabel}
                      control={<Checkbox className={classes.customCheckbox} color="secondary" name="permanenciaLibros" onChange={handlePermanenciaLibros} />}
                      label="Acepto que mis obras permanezcan en la aplicación luego de borrada mi cuenta" />
                  </DialogContent>
                  <DialogActions>
                    <Button type="Button" onClick={deleteUser} autoFocus>
                      Aceptar
                    </Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openSave}
                  onClose={handleClose}>
                  <DialogContent>
                    <DialogContentText>
                      ¿Está seguro que quiere guardar los cambios?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button type="Button" onClick={saveChanges} autoFocus>
                      Aceptar
                    </Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <Grid container spacing={0} style={{marginBottom:"1em"}} >
                <Grid item xs={6} style={{justifyContent:"center",display:"flex"}}>
                  <Button className={classes.botonGuardar} onClick={openSaveDialog}>Guardar Cambios</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button className={classes.botonEliminar} onClick={openDeleteDialog}>Eliminar mi Cuenta</Button>
                </Grid>
              </Grid>
            </Container>
            <Footy />
            </Grid>) : null}
    </Grid>
  );
}
