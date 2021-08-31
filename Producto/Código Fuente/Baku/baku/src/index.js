import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react"

import './index.css';
import Enrutador from './Enrutador/Enrutador.jsx';
import reportWebVitals from './reportWebVitals';

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={client_id} redirectUri={"http://localhost:3000/Inicio"}>
      <Enrutador/>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();