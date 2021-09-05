import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Inicio from '../Inicio/Inicio.jsx';
import Lectura from '../Lectura/Lectura.js';
import Publicar from '../Publicar/Publicar.jsx';
import Buscar from '../Buscar/Buscar.jsx';
import Biblioteca from '../Biblioteca/Biblioteca.jsx';
import {useAuth0} from '@auth0/auth0-react'
import Perfil from '../Login/Perfil.jsx'
import {Loading} from  '../Login/Loading.jsx'

export default function Layout() {
    const {isAuthenticated, isLoading} = useAuth0();
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Inicio" component={isLoading? Loading: isAuthenticated? Inicio: Home} />
                        <Route exact path="/Lectura" component={isLoading? Loading: isAuthenticated? Lectura: Home} />
                        <Route exact path="/Publicar" component={isLoading? Loading: isAuthenticated? Publicar: Home} />
                        <Route exact path="/Buscar" component={isLoading? Loading: isAuthenticated? Buscar: Home}/>
                        <Route exact path="/Biblioteca" component={isLoading? Loading: isAuthenticated? Biblioteca: Home}/>
                        <Route exact path="/Perfil" component={isLoading? Loading: isAuthenticated? Perfil: Home}/>
                        <Route render={() => <h4>Ups! No se encontro la pagina!</h4>} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}
