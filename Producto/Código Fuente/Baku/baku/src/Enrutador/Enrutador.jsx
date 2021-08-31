import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Login from '../Login/Login.jsx';
import Registro from '../Registro/Registro.jsx';
import Inicio from '../Inicio/Inicio.jsx';
import Lectura from '../Lectura/Lectura.js';
import Publicar from '../Publicar/Publicar.jsx';
import Buscar from '../Buscar/Buscar.jsx';
import Biblioteca from '../Biblioteca/Biblioteca.jsx';
import {useAuth0} from "@auth0/auth0-react"
import {LoginButton} from "../Login/LoginMetodo.js"

export default function Layout() {
    const {isAuthenticated} = useAuth0();
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Inicio" component={isAuthenticated? Inicio: LoginButton} />
                        <Route exact path="/Lectura" component={isAuthenticated? Lectura: LoginButton} />
                        <Route exact path="/Publicar" component={isAuthenticated? Publicar: LoginButton} />
                        <Route exact path="/Buscar" component={isAuthenticated? Buscar: LoginButton}/>
                        <Route exact path="/Biblioteca" component={isAuthenticated? Biblioteca: LoginButton}/>
                        <Route render={() => <h4>Ups! No se encontro la pagina!</h4>} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}
