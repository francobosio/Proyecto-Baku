import React from 'react';
import IconCross from '../Icons/IconCross';
import './Content.scss';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import {Link} from "react-router-dom";

let array = [];

const Content = ({ movie, onClose }) => (
  <div className="content">
    {array = movie.archivoTexto.split("/")}
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{movie.titulo}</div>
        <div className="content__description">
          {movie.descripcion}
        </div>
      </div>
      <button className="content__close" onClick={onClose} title={"Cerrar"}>
        <IconCross />
      </button>
      <button className="content__read" onClick={onClose} title={"Leer este libro"}>
        <Link to={"/Lectura/" + array[array.length-2] + "/" + array[array.length-1]} >
          <LocalLibraryOutlinedIcon style={{fontSize:"4em"}} className="content__read-button"/>
        </Link>
      </button>
    </div>
  </div>
);

export default Content;
