import React from 'react';
import IconCross from '../Icons/IconCross';
import './Content.scss';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

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
  console.log(res);
}

const Content = ({ movie, onClose }) => (
  <div className="content">
    {array = movie.archivoTexto.split("/")}
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{movie.titulo}</div>
        {movie.descripcion !== "" && 
        (
          //agrandar la letra de la descripcion 
          <TextField className="content__description"   multiline value={movie.descripcion}  disabled></TextField>
        )}
      </div>
      <button className="content__close" onClick={onClose} title={"Cerrar"}>
        
        <IconCross className="content__close__icon" />
        
         
      </button>
      <button className="content__read" onClick={onClose} title={"Leer este libro"}>
        <Link onClick={() => {LibroLeido(movie._id)}} to={ "/Lectura/" + movie._id } >
        
          <AutoStoriesOutlinedIcon style={{fontSize:"4em"}} className="content__read-button"/>
        </Link>
      </button>
    </div>
  </div>
);

export default Content;
