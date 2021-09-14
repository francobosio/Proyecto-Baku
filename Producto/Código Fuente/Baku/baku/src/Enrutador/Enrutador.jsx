import React from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Inicio from '../Inicio/Inicio.jsx';
import Lectura from '../Lectura/Lectura.tsx';
import Publicar from '../Publicar/Publicar.jsx';
import Buscar from '../Buscar/Buscar.jsx';
import Biblioteca from '../Biblioteca/Biblioteca.jsx';
import {useAuth0} from '@auth0/auth0-react'
import Perfil from '../Login/Perfil.jsx'
import {Loading} from  '../Login/Loading.jsx'

export default function Layout() {
    {/* Router es el elemento encargado de redireccionar el usuario a las distintas páginas al hacer click en los distintos botones o links
    isAuthenticated permite saber si el usuario esta autenticado, isLoading permite saber si la aplicación esta cargando datos desde auth0 */}
    const {isAuthenticated, isLoading} = useAuth0();
    return (
        <div>
            <BrowserRouter>
                <div>
                    {/* Mediante un switch se configura cada ruta con el componente correspondiente, mediante ternarios verifico si la pagina esta cargando y si el 
                        usuario esta logueado */}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Inicio" component={isLoading? Loading: isAuthenticated? Inicio:Home} />
                        <Route exact path="/Lectura/:pdf" component={isLoading? Loading: isAuthenticated?  Lectura: Home}/>
                        <Route exact path="/Publicar" component={isLoading? Loading: isAuthenticated? Publicar: Home} />
                        <Route exact path="/Buscar" component={isLoading? Loading: isAuthenticated? Buscar: Home} />
                        <Route exact path="/Biblioteca" component={isLoading? Loading: isAuthenticated? Biblioteca :Home} />
                        <Route exact path="/Perfil" component={isLoading? Loading: isAuthenticated? Perfil: Home} />
                        
                        <Route render={() => <h4>Ups! No se encontro la pagina!</h4>} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

