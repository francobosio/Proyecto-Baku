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
    },
    
    botonVerde:{
    'background-color': '#4B9C8E',
    '&:hover':{
        'background':'#076F55',
        'color': '#FFFFFF',
    }},
})

/* metodo de auth0 para realizar el logout del usaurio */
export const LogoutButton = () => {
    const {logout} = useAuth0();
    const estilos = useStyles();
    return <Button variant="contained" onClick={() => logout()} className={estilos.boton + ' ' + estilos.botonVerde}> Cerrar Sesión </Button>
}