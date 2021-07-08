import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@trejgun/material-ui-icons-google';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'


const useStyles = makeStyles((theme) =>({
    fondo:{
        'background': 'linear-gradient(180deg, #076F55 0%, #FFFFFF 100%);',
    },
    
    boton:{
        'font-weight': 'bold',
        'margin': '0 auto', 
        'display': "flex",
        'color':'#FFFFFF',
        'borderRadius': '5em',
    },

    botonGris:{
        'background-color': '#464D57',
    },

    botonVerde:{
        'background-color': '#4B9C8E',
    },

    customContainer:{
        'background-color': '#FFFFFF',
    },
    
    customCard:{
        'border': 'none',
        'boxShadow': 'none',
    },

    customLabel:{
        'font-weight': 'bold',
        'color': '#000000'
    },
}));

function Login(){
    const classes = useStyles();
    return(
        <div className={classes.fondo}>
            <Container className={classes.customContainer} maxWidth="xs" border={1}>
                <Card className={classes.customCard}>
                    <CardMedia
                        component="img"
                        title="Logo de Baku"
                        image="imagenes/Logo_baku_negro.png"
                    />
                </Card>
                <hr/>
                <Button variant="contained" className={classes.boton + ' ' + classes.botonGris} startIcon={<Search/>}>
                    Continuar con Google
                </Button>
                <hr/>
                <Container maxWidth="xs">
                    <FormControl margin="dense" fullWidth="true">
                      <FormLabel className={classes.customLabel} htmlFor="email">Dirección de correo electrónico o nombre de usuario:</FormLabel>
                      <input type="text" id="email" placeholder="Dirección de correo electrónico o nombre de usuario"></input>
                    </FormControl>
                    <FormControl margin="dense" fullWidth="true">
                      <FormLabel className={classes.customLabel} htmlFor="password">Contraseña:</FormLabel>
                      <input type="password" id="password" aria-describedby="helper-password" placeholder="Contraseña"></input>
                      <FormHelperText id="helper-password">Nunca compartas tu contraseña.</FormHelperText>
                    </FormControl>
                </Container>
                <Typography>
                    <Link href="https://www.google.com/">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Typography>
                <Button variant="contained" className={classes.boton + ' ' + classes.botonVerde}>
                    Iniciar Sesion
                </Button>
                <hr/>
                <Button variant="contained" className={classes.boton + ' ' + classes.botonVerde}>
                    REGISTRATE EN BAKU
                </Button>
            </Container>
        </div>
    )
}

export default Login