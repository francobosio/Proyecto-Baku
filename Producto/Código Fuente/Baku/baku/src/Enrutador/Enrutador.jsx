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
import { Loading } from '../Sesión/Loading.jsx'
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'

export default function Layout() {
    /* Router es el elemento encargado de redireccionar el usuario a las distintas páginas al hacer click en los distintos botones o links
    isAuthenticated permite saber si el usuario esta autenticado, isLoading permite saber si la aplicación esta cargando datos desde auth0 */
    const { isAuthenticated, isLoading } = useAuth0();
    //valide que el usuario_activo en el localStorage es de tipo 1, si es asi, redireccionarlo a la pagina de inicio
    const [locale, setLocale] = React.useState('esES');
    const [usuarioActivo, setUsuarioActivo] = React.useState(true)
    const theme = useTheme();
    const { user } = useAuth0();
    /* console.log(user)
    const loadLibros = async () => {
        if (user.sub !== undefined) {
            const res = await usuarioService.getUsuario(user.sub);
            let usuario = res.data;
            let activo = true;
            console.log("entro")
            if (usuario == null) {
                console.log("Aca wey " + usuario)
            }
            usuario.esActivo === "Activo" ? activo = true : activo = false;
            return activo
        }
    } */
    const themeWithLocale = React.useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
    );
    return (
        <ThemeProvider theme={themeWithLocale}>
            <div>
                <BrowserRouter>
                    <div>
                        {/* Mediante un switch se configura cada ruta con el componente correspondiente, mediante ternarios verifico si la pagina esta cargando y si el 
                        usuario esta logueado */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/Inicio" component={isLoading ? Loading : (isAuthenticated ) ? Inicio : Home} />
                            <Route exact path="/Lectura/:id" component={isLoading ? Loading : isAuthenticated ? Lectura : Home} />
                            <Route exact path="/Publicar" component={isLoading ? Loading : isAuthenticated ? Publicar : Home} />
                            <Route exact path="/Buscar" component={isLoading ? Loading : isAuthenticated ? Buscar : Home} />
                            <Route exact path="/Buscar/:busqueda" component={isLoading ? Loading : isAuthenticated ? Buscar : Home} />
                            <Route exact path="/Biblioteca" component={isLoading ? Loading : isAuthenticated ? Biblioteca : Home} />
                            <Route exact path="/Perfil" component={isLoading ? Loading : isAuthenticated ? Loading : Home} />
                            <Route exact path="/Estadistica" component={isLoading ? Loading : isAuthenticated ? Estadistica : Home} />
                            <Route exact path="/Revision" component={isLoading ? Loading : isAuthenticated ? (localStorage.getItem('tipoUsuario') === '3') ? Revision : Home : Home} />
                            <Route exact path="/Revision/:id" component={isLoading ? Loading : isAuthenticated ? (localStorage.getItem('tipoUsuario') === '3') ? Resultado : Home : Home} />
                            <Route exact path="/Parametros" component={isLoading ? Loading : isAuthenticated ? (localStorage.getItem('tipoUsuario') === '3') ? Parametros : Home : Home} />
                            <Route render={() => <h4>Ups! No se encontro la pagina!</h4>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

