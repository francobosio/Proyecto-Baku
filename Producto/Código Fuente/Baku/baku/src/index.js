import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react"

import './index.css';
import Inicio from './Inicio/Inicio.js';
import Home from './Home/Home.jsx';
import Buscar from './Buscar/Buscar.jsx';
import Biblioteca from './Biblioteca/Biblioteca.jsx';
import Publicar from './Publicar/Publicar.jsx';
import Login from './Login/Login.jsx'
import reportWebVitals from './reportWebVitals';
import Lectura from './Lectura/Lectura.js';


const domain = process.env.REACT_APP_AUTH0_DOMAIN
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={client_id} redirectUri={window.location.origin}>
      <Login/>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
