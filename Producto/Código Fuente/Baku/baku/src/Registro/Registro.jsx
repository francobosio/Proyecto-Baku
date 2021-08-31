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
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';
import Picker from './Picker';
import Selector from './Selector';

const useStyles = makeStyles({
    fondo:{
        'background': 'linear-gradient(180deg, #076F55 0%, #C2F1E9 100%);',
    },

    textoEncabezado:{
        'fontWeight':"bold",
        'fontSize': '1rem',
        'justifyContent': 'center',
        'display':'flex',
    },

    containerPrincipal:{
        'backgroundColor':'#FFF',
        'height':'100%',
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
        'color':'#FFF',
        'borderRadius': '5rem',
    },

    botonGris:{
        'background-color': '#464D57',
        '&:hover':{
            'background':'#1D2126',
            'color': '#FFF',
        },
    },

    botonVerde:{
        'background-color': '#4B9C8E',
        '&:hover':{
            'background':'#076F55',
            'color': '#FFF',
        }
    },

    espaciado:{
        'padding':'1rem 0 1rem 0',
    },

    customLabel:{
        'fontWeight': 'bold',
        'color': '#000'
    },

    controlLabel:{
        '& > .MuiFormLabel-root.Mui-focused':{
            'color': '#000'
        },
    },
    
    controlRadio:{
        '& > .MuiRadio-colorSecondary.Mui-checked':{
            'color':'#4B9C8E',
        },
    },
});

function Registro(){
    const estilos = useStyles();
    return(
        <div className={estilos.fondo}>
            <Container maxWidth="xs" className={estilos.containerPrincipal} border={1}>
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
                        <FormLabel htmlFor="email" className={estilos.customLabel + " " + estilos.espaciado}>¿Cuál es tu correo electrónico?</FormLabel>
                        <input id="email" type="text" placeholder="Introducí tu dirección de correo"></input>
                        <FormLabel htmlFor="password" className={estilos.customLabel + " " + estilos.espaciado}>Crea una contraseña</FormLabel>
                        <input id="password" type="text" placeholder="Crea una contraseña"></input>
                        <FormLabel htmlFor="password2" className={estilos.customLabel + " " + estilos.espaciado}>Confirmá tu contraseña</FormLabel>
                        <input id="password2" type="text" placeholder="Confirmá tu contraseña"></input>
                        <FormLabel htmlFor="nombre" className={estilos.customLabel + " " + estilos.espaciado}>Nombre</FormLabel>
                        <input id="nombre" type="text" placeholder="Introducí tu nombre"></input>
                        <FormLabel htmlFor="apellido" className={estilos.customLabel + " " + estilos.espaciado}>Apellido</FormLabel>
                        <input id="apellido" type="text" placeholder="Introducí tu apellido"></input>
                        <FormLabel htmlFor="nombrePerfil" className={estilos.customLabel + " " + estilos.espaciado}>Ingresá tu nombre de perfil</FormLabel>
                        <input id="nombrePerfil" type="text" placeholder="Introducí un nombre de perfil"></input>
                        <FormLabel htmlFor="fechaNacimiento" className={estilos.customLabel + " " + estilos.espaciado}>¿Cuál es tu fecha de nacimiento?</FormLabel>
                        <Picker/>
                        <FormControl className={estilos.controlLabel} component="fieldset">
                            <FormLabel  htmlFor="Genero" className={estilos.customLabel + " " + estilos.espaciado}>¿Cuál es tu género?</FormLabel>
                            <RadioGroup aria-label="genero" name="genero" >
                                <div>
                                    <FormControlLabel
                                        className={estilos.controlRadio}
                                        value="Hombre"
                                        control={<Radio/>}
                                        label="Hombre"
                                    />
                                    <FormControlLabel
                                        className={estilos.controlRadio}
                                        value="Mujer"
                                        control={<Radio/>}
                                        label="Mujer"
                                    />
                                    <FormControlLabel
                                        className={estilos.controlRadio}
                                        value="Otro"
                                        control={<Radio/>}
                                        label="Otro"
                                    />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <FormLabel htmlFor="email" className={estilos.customLabel + " " + estilos.espaciado}>¿Cuál es tu nacionalidad? (opcional)</FormLabel>
                        <Selector/>
                        <FormHelperText className={estilos.espaciado}>
                            <Typography variant="caption">
                                Al registrarte aceptas los <Link>Términos y Condiciones de Uso</Link> de Baku
                            </Typography>
                        </FormHelperText>
                        <Button variant="contained" id="btn-Registro" className={estilos.boton + ' ' + estilos.botonVerde}>
                            Registrate
                        </Button>
                        <FormHelperText className={estilos.espaciado + ' ' + estilos.textoEncabezado}>
                            <Typography variant="subtitle1">
                               ¿Ya estás registrado? <Link>Iniciá Sesión</Link>
                            </Typography>
                        </FormHelperText>
                    </FormControl>
                </Container>
            </Container>
        </div>
    )
};

export default Registro;
