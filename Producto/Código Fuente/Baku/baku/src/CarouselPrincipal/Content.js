import React from 'react';
import IconCross from '../Icons/IconCross';
import './Content.scss';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'
import * as libroService from '../Libros/LibroService'
import Denuncia from '../Denuncia/DialogDenuncia.jsx'
let array = [];
const LibroLeido = async (libroId) => {
  const usuario_id = localStorage.getItem("usuario_activo")
  const libroData = {
    'auth0id': usuario_id,
    'idLibro': libroId,
    'ultimaPaginaLeida': 0,
    'finLectura': false,
  }
  const res = await usuarioService.usuarioLibroLeido(libroData);
}

const AutorSeleccionado = async (libroId) => {
  const res = await libroService.buscarAutorLibro(libroId);
}
//al hacer click en el boton invocar al componente Denuncia y pasarle el id del libro


export default function Content({ movie, onClose }) {
  let [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');
  const handleClickListItem = () => {
    setOpen(true);
  };
  
  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div className="content">
      {array = movie.archivoTexto.split("/")}
      {console.log(movie.usuario)}
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{movie.titulo}</div>
          <Link class="content__link" onClick={() => { AutorSeleccionado(movie.id) }} to={`/Autor/` + movie._id}>
            <div className="content__subtitle">{movie.autor}</div>
          </Link>
          {movie.descripcion !== "" &&
            (
              //agrandar la letra de la descripcion 
              <TextField className="content__description" multiline value={movie.descripcion} disabled></TextField>
            )}
        </div>
        <button className="content__close" onClick={onClose} title={"Cerrar"}>
          <IconCross className="content__close__icon" />
        </button>
        <button className="content__read" onClick={onClose} title={"Leer este libro"}>
          <Link onClick={() => { LibroLeido(movie._id) }} to={"/Lectura/" + movie._id} >
            <AutoStoriesOutlinedIcon style={{ fontSize: "4em" }} className="content__read-button" />
          </Link>
        </button>
        <button className="content__denuncia" onClick={() => setOpen(!open)} title={"Denunciar este libro"}>
          <ReportGmailerrorredOutlinedIcon style={{ fontSize: "3.8em" , cursor:"pointer"}} className="content__denuncia-button" />
          <Denuncia
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            value={value}
            pAutor={movie.usuario}
            pLibro={movie._id}
            />
        </button>
      </div>
    </div>
  )
};

