import React from 'react';
import {useEffect} from 'react';
import IconCross from '../Icons/IconCross';
import './Content.scss';
import { Container } from '@material-ui/core';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Favorito from '../Favorito/Favorito';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import PersonIcon from '@mui/icons-material/Person';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'
import * as libroService from '../Libros/LibroService'
import Denuncia from '../Denuncia/DialogDenuncia.jsx'
import { Typography, Stack } from '@mui/material';

const LibroLeido = async (libroId) => {
  const usuario_id = localStorage.getItem("usuario_activo")
  const libroData = {
    'auth0id': usuario_id,
    'idLibro': libroId,
    'ultimaPaginaLeida': 0,
    'finLectura': false,
  }
  await usuarioService.usuarioLibroLeido(libroData);
}

const AutorSeleccionado = async (libroId) => {
  await libroService.buscarAutorLibro(libroId);
}
//al hacer click en el boton invocar al componente Denuncia y pasarle el id del libro


export default function Content({ movie, onClose, tamaño }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  let [open, setOpen] = React.useState(false);
  let reclamadorAuth0 = localStorage.getItem("usuario_activo")
  const [esAdmin, setEsAdmin] = React.useState(localStorage.getItem("tipoUsuario") == 3);
  const [value, setValue] = React.useState('Dione');
  const tamañoLectu = matches ? "4em" : "3em";
  const tamañoDenuncia = matches ? "3.8em" : "3em";
  const margenTitulo = matches ? "0em" : "-2em";
  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };
  //si movie.alias es null, mostrar un nombre por defecto (ej: "Anónimo")
  if (movie.alias == null) {
    movie.alias = "Anónimo"
  }

  return (
    <Container maxWidth={false} style={{ left: (tamaño / 9), top: -20 }} className="content">
      <div className="content__area" /* onMouseLeave={onClose} */>
        <div className="content__area__container" >
          <div style={{ flexDirection: 'row', display: 'flex', alignContent: 'center', alignItems: 'center', marginLeft: margenTitulo }}>
            {(!esAdmin && !matches) ? <Favorito libroId={movie._id} /> : null}
            <div className="content__title" style={{ fontSize: tamaño / 4.5 }}>{movie.titulo}</div>
            {(!esAdmin && matches) ? <Favorito libroId={movie._id} /> : null}
          </div>
          <div className="content__subtitle2" style={{ fontSize: (tamaño / 6.3) }}>{movie.autor}</div>
          {movie.descripcion !== "" &&
            (
              <TextField className="content__description" inputProps={{ style: { fontSize: (Math.sqrt(tamaño) * 1.5), whiteSpace: 'normal', color: 'white', lineHeight: '1em', textAlign: 'justify' } }} multiline value={movie.descripcion} readOnly />
            )}
        </div>
        <Stack direction='row' sx={{ marginBottom: '0.7em' }}>
          <PersonIcon sx={{ paddingLeft: '1.35em', paddingRight: '0.4em', color: '#333333', fontSize: (Math.sqrt(tamaño) * 2.5) }} />
          {!esAdmin ? <Link class="content__link" onClick={() => { AutorSeleccionado(movie.id) }} to={`/Autor/` + movie._id} disabled>
            <div className="content__subtitle" style={{ fontSize: (tamaño / 8) }}>{movie.alias} </div>
          </Link> :
          <div className="content__subtitle" style={{ fontSize: (tamaño / 8) }}>{movie.alias} </div>}
        </Stack>
        <Stack direction='row'>
          <Typography variant='subtitle2' sx={{ paddingLeft: '3.1429em', paddingRight: '0.5em', marginBottom: '0.7em', color: '#333333' }}>
            Género:
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'white' }} >
            {movie.genero.map(x => x).toString().split(', ').join(',').split(',').join(', ')}
          </Typography>
        </Stack>
        <Stack direction='row'>
          <button className="content__close" onClick={onClose} title={"Cerrar"}>
            <IconCross /* className="content__close__icon" */ />
          </button>
          {!esAdmin ? <><button className="content__read" onClick={onClose} title={"Leer este libro"} disabled={esAdmin}>
            <Link onClick={() => { LibroLeido(movie._id) }} to={"/Lectura/" + movie._id} >
              <AutoStoriesOutlinedIcon style={{ fontSize: tamañoLectu }} className="content__read-button" />
            </Link>
          </button>
          <button className="content__denuncia" onClick={() => setOpen(!open)} title={"Reclamar este libro"} disabled={esAdmin}>
            <ReportGmailerrorredOutlinedIcon style={{ fontSize: tamañoDenuncia, cursor: "pointer" }} className="content__denuncia-button" />
            <Denuncia
              id="ringtone-menu"
              keepMounted
              open={open}
              onClose={handleClose}
              value={value}
              reclamador={reclamadorAuth0}
              pAutor={movie.usuario}
              pLibro={movie._id}
            />
          </button></> : null}
        </Stack>
      </div>
    </Container >
  )
};

