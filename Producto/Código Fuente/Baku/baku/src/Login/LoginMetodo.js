import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    boton:{
        'font-weight': 'bold',
        'margin': '0 auto', 
        'display': 'flex',
        'color':'#FFFFFF',
        'borderRadius': '5rem',
        'padding': '0.5rem 0 0.5rem 0'
    },
    
    botonVerde:{
    'background-color': '#4B9C8E',
    '&:hover':{
        'background':'#076F55',
        'color': '#FFFFFF',
    }},
})

export const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();
    const estilos = useStyles();
    return <Button variant="contained" onClick={() => loginWithRedirect()} className={estilos.boton + ' ' + estilos.botonVerde}> Iniciar Sesión </Button>
}