import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@trejgun/material-ui-icons-google';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel  from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
    fondo:{
        'background': 'linear-gradient(180deg, #076F55 0%, #C2F1E9 100%);',
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
        }
    },

    botonVerde:{
        'background-color': '#4B9C8E',
        '&:hover':{
            'background':'#076F55',
            'color': '#FFFFFF',
        }
    },

    customContainer:{
        'background-color': '#FFFFFF',
        'padding-top':'1rem',
    },

    customCard:{
        'border': 'none',
        'boxShadow': 'none',
        'padding': '1rem 0 1rem 0',
    },

    customLabel:{
        'font-weight': 'bold',
        'color': '#000000',
    },

    espaciado:{
        'padding': '1rem 0 1rem 0',
    },

    customCheckbox:{
        'color': '#4B9C8E',
    },

    controlLabel:{
        '& > .MuiCheckbox-colorSecondary.Mui-checked':{
            'color':'#4B9C8E',
        },
    },

});

function Login(){
    const estilos = useStyles();
    return(
        <div className={estilos.fondo}>
            <Container height="100%" className={estilos.customContainer} maxWidth="xs" border={1}>
                <Container maxWidth="xs">
                    <Card className={estilos.customCard}>
                        <CardMedia
                            component="img"
                            title="Logo de Baku"
                            image="imagenes/Logo_baku_negro-min.png"
                        />
                    </Card>
                </Container>
                <hr/>
                <Container maxWidth="xs">
                    <FormControl margin="dense" fullWidth="true">
                        <Button variant="contained" fullWidth="true" className={estilos.boton + ' ' + estilos.botonGris} startIcon={<Search/>}>
                            Continuar con Google
                        </Button>
                    </FormControl>
                </Container>
                <hr/>
                <Container maxWidth="xs">
                    <FormControl margin="dense" fullWidth="true">
                        <FormLabel className={estilos.customLabel + ' ' + estilos.espaciado} htmlFor="email">Dirección de correo electrónico:</FormLabel>
                        <input type="text" id="email" placeholder="Dirección de correo electrónico"></input>
                        <FormLabel className={estilos.customLabel + ' ' + estilos.espaciado} htmlFor="password">Contraseña:</FormLabel>
                        <input type="password" id="password" aria-describedby="helper-password" placeholder="Contraseña"></input>
                        <FormHelperText className={estilos.espaciado} id="helper-password">
                            Nunca compartas tu contraseña.
                            <Typography>
                                <Link href="https://www.google.com/">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </Typography>
                        </FormHelperText>
                        <FormControlLabel
                            className={estilos.controlLabel} 
                            margin="dense"
                            control={<Checkbox className={estilos.customCheckbox}/>}
                            label="Recordame"
                        />
                        <Button variant="contained" className={estilos.boton + ' ' + estilos.botonVerde}>
                            Iniciar Sesión
                        </Button>
                    </FormControl>
                </Container>            
                <hr/>
                <Container maxWidth="xs">
                    <FormControl margin="dense" fullWidth="true">
                        <Button variant="contained" fullWidth="true" className={estilos.boton + ' ' + estilos.botonVerde}>
                            Registrate en Baku
                        </Button>
                    </FormControl>
                </Container>
            </Container>
        </div>
    )
}

export default Login