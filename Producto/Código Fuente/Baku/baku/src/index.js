import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import './index.css';
import Enrutador from './Enrutador/Enrutador.jsx';
import reportWebVitals from './reportWebVitals';

// busco las variables de dominio y id de cliente para la autenticacion con auth0 estos datos quedaran en el servidor para aumentar la seguridad, 
// estas varialbes estan guardadas en el archivo .env
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID

// estas opciones son para el mensaje de alerta
const options = {
  position: positions.MIDDLE_RIGHT,
  timeout: 5000,
  offset: '20px',
  transition: transitions.FADE,
  type: 'error',
  containerStyle:{
    color: '#fff',
  }
}


ReactDOM.render(
  <React.StrictMode>
    {/*Auth0 Provider es la api que provee auth0 para realizar el logueo, requiere de un dominio y un id de cliente para realizar el logueo,
    y una url que será adonde redireccionará luego del logueo*/}
    <Auth0Provider domain={domain} clientId={client_id} redirectUri={"http://localhost:3000/Inicio"}>
      {/* Alert Provider me permite mostrar alertas flotantes sobre la pantalla */}
      <AlertProvider template={AlertTemplate} {...options}>
        <Enrutador />
      </AlertProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();