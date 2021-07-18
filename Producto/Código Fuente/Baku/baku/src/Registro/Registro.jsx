import React from 'react';

import {Search} from '@trejgun/material-ui-icons-google';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles({
    fondo:{
        'background': 'linear-gradient(180deg, #076F55 0%, #FFFFFF 100%);',
    },

    textoEncabezado:{
        'fontWeight':"bold",
        'fontSize': '1rem',
        'justifyContent': 'center',
        'display':'flex',
    },

    containerPrincipal:{
        'backgroundColor':'#FFFFFF',
        'padding-top':'1rem',
    },

    customCard:{
        'border':'none',
        'boxShadow': 'none',
        'padding': '1rem 0 0 0',
    },

    boton:{
        'font-weight': 'bold',
        'margin': '0 auto', 
        'display': 'flex',
        'color':'#FFFFFF',
        'borderRadius': '5rem',
    },

    botonGris:{
        'background-color': '#464D57',
        '&:hover':{
            'background':'#1D2126',
            'color': '#FFFFFF',
        },
    },

    espaciado:{
        'padding':'1rem 0 1rem 0',
    },

    customLabel:{
        'fontWeight': 'bold',
        'color': '#000000'
    }
});

function Registro(){
    const estilos = useStyles();
    return(
        <div className={estilos.fondo}>
            <Container height="100%" maxWidth="xs" className={estilos.containerPrincipal} border={1}>
                <Container maxWidth="xs">
                    <Card className={estilos.customCard}>
                        <CardMedia 
                          component="img"
                          title="Logo de Baku"
                          image="imagenes/Logo_baku_negro-min.png"
                        />
                        <CardContent>
                          <Typography className={estilos.textoEncabezado} color="initial">Registrate Gratis para Empezar a Leer</Typography>
                        </CardContent>
                    </Card>
                    <FormControl margin="dense" fullWidth="true">
                        <Button fullWidth="true" startIcon={<Search/>} className={estilos.boton + " " + estilos.botonGris}> Registrate con Google
                        </Button>
                    </FormControl>
                </Container>
                <hr/>
                <Container maxWidth="xs">
                    <FormControl margin="dense" fullWidth="true">
                        <FormLabel htmlFor="email" classname={estilos.customLabel + " " + estilos.espaciado}>¿Cuál es tu correo electrónico?</FormLabel>
                        <input id="email" type="text" placeholder="Introducí tu dirección de correo"></input>
                    </FormControl>
                </Container>
            </Container>
        </div>
    )
};


export default Registro;