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
export default function Layout() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Registro" component={Registro} />
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/Inicio" component={Inicio} />
                        <Route exact path="/Lectura" component={Lectura} />
                        <Route exact path="/Publicar" component={Publicar} />
                        <Route exact path="/Buscar" component={Buscar}/>
                        <Route exact path="/Biblioteca" component={Biblioteca}/>
                        <Route render={() => <h4>Ups! No se encontro la pagina!</h4>} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}
