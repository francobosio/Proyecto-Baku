import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import Home from "../Home/Home.jsx";
import Inicio from '../Inicio/Inicio.jsx';
import Lectura from '../Lectura/Lectura.tsx';
import Publicar from '../Publicar/Publicar.jsx';
import Estadistica from '../Estadistica/Estadistica.jsx';
import Revision from '../Revision/Revision.jsx';
import Buscar from '../Buscar/Buscar.jsx';
import Biblioteca from '../Biblioteca/Biblioteca.jsx';
import Parametros from '../Parametros/Parametros.jsx';
import Resultado from '../Revision/Resultado.jsx'
import Usuarios from '../Usuarios/Usuarios.jsx';
import Autor from '../Autor/Autor.jsx'
import AutorPorAuth0 from '../AutorPorAuth0/AutorPorAuth0.jsx'
import { Loading } from '../Sesión/Loading.jsx'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'
import Perfil from "../Sesión/Perfil.jsx";
import Paginas from "../PaginasFooter/Paginas.jsx";
import { Grid } from '@material-ui/core';

export default function Layout() {
    /* Router es el elemento encargado de redireccionar el usuario a las distintas páginas al hacer click en los distintos botones o links
    isAuthenticated permite saber si el usuario esta autenticado, isLoading permite saber si la aplicación esta cargando datos desde auth0 */
    const { isAuthenticated, isLoading } = useAuth0();
    //valide que el usuario_activo en el localStorage es de tipo 1, si es asi, redireccionarlo a la pagina de inicio
    const [locale] = React.useState('esES');
    const theme = useTheme();
    const themeWithLocale = React.useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );
    return (
        <ThemeProvider theme={themeWithLocale}>
            <Grid container direction="column" minHeight="100vh" >
                <BrowserRouter>
                        {/* Mediante un switch se configura cada ruta con el componente correspondiente, mediante ternarios verifico si la pagina esta cargando y si el 
                        usuario esta logueado */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/Inicio" component={isLoading ? Loading :  isAuthenticated ? Inicio : Home} />
                            <Route exact path="/Lectura/:id" component={isLoading ? Loading : isAuthenticated ? Lectura : Home} />
                            <Route exact path="/Publicar" component={isLoading ? Loading : isAuthenticated ? Publicar : Home} />
                            <Route exact path="/Buscar" component={isLoading ? Loading : isAuthenticated ? Buscar : Home} />
                            <Route exact path="/Usuarios" component={isLoading ? Loading : isAuthenticated ? Usuarios : Home} />
                            <Route exact path="/Buscar/:busqueda" component={isLoading ? Loading : isAuthenticated ? Buscar : Home} />
                            <Route exact path="/Biblioteca" component={isLoading ? Loading : isAuthenticated ? Biblioteca : Home} />
                            <Route exact path="/Perfil" component={isLoading ? Loading : isAuthenticated ? Perfil : Home} />
                            <Route exact path="/Estadistica" component={isLoading ? Loading : isAuthenticated ? Estadistica : Home} />
                            <Route exact path="/Revision" component={isLoading ? Loading : !isAuthenticated ? Home :((localStorage.getItem('tipoUsuario') === '3') && localStorage.getItem('usuario_estado')==='Activo')? Revision : Home } />
                            <Route exact path="/Revision/:id" component={isLoading ? Loading : !isAuthenticated ? Home :(localStorage.getItem('tipoUsuario') === '3') ? Resultado :  Home} />
                            <Route exact path="/Parametros" component={isLoading ? Loading : !isAuthenticated ? Home :(localStorage.getItem('tipoUsuario') === '3') ? Parametros :  Home} />
                            <Route exact path="/Autor/:libroId" component={isLoading ? Loading : isAuthenticated ? Autor : Home} />
                            <Route exact path="/AutorId/:Id" component={isLoading ? Loading : isAuthenticated ? AutorPorAuth0 : Home} />
                            <Route exact path="/Ayuda/:tipo" component={Paginas} />
                            <Route render={() => <h4>Ups! No se encontro la pagina!</h4>} />
                        </Switch>
                </BrowserRouter>
            </Grid>
        </ThemeProvider>
    );
}

