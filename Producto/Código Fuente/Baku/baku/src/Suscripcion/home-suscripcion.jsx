import React from "react"
import { makeStyles, Grid, Button, InputLabel } from "@material-ui/core";
import { MiDrawer } from "../Drawer/Drawer";
import AppBar from '../AppBar/AppBar.js';
import Footy from "../Footy/Footy";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
    },
    boton: {
        'font-weight': 'bold',
        'margin-top': '3rem',
        'display': 'flex',
        'color': '#FFFFFF',
        'fontSize': '1rem',
        'background-color': '#3a7a6f',
        'paddingBottom': '-1rem',
        'width': '15.5rem',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        },
    },
    main: {
        maxWidth: '90vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    suscriptionBox: {
        padding: '2rem',
        height: '30rem',
        width: '15rem',
        background: '#7ec2ae',
    },
    contenedor: {
        padding: '2rem 10rem 2rem 10rem',
        height: '75vh',
        justifyContent: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: '2rem',
        padding: '2rem',
        textAlign: 'center',
        color: '#1B1B1B'
    },
    descripcion: {
        fontSize: '1rem',
        padding: '2rem',
        textAlign: 'justify',
        color: '#1B1B1B'
    },
    precio: {
        fontSize: '1rem',
        padding: '2rem',
        textAlign: 'justify',
    }

}));

const modelosSuscripcion = [
    {
        nombre: "Suscripcion Clásica",
        descripcion: "Descripcion",
        precio: "499 ARS"
    },
    {
        nombre: "Suscripcion Prémium",
        descripcion: "Esta suscripcion esta muy buena porque",
        precio: "699 ARS"
    },
    {
        nombre: "Suscripcion Familiar",
        descripcion: "Descripcion",
        precio: "499 ARS"
    }
];

export default function HomeSuscripcion() {
    const classes = useStyles();

    const HandleSuscription = () => {
        console.log(process.env.REACT_APP_MPAGO_TEST_PUBLIC_KEY)
        const mp = new window.MercadoPago(process.env.REACT_APP_MPAGO_TEST_PUBLIC_KEY, { locale: 'es-AR' });
        const checkout = mp.checkout({
            preference: {
                id: process.env.REACT_APP_MPAGO_TEST_PREFERENCE_ID
            }
        });
        checkout.open();
    }

    return (
        <div className={classes.root}>
            <MiDrawer />
            <div className={classes.main}>
                <AppBar />
                <Grid className={classes.contenedor} container spacing={3}>
                    {modelosSuscripcion.map((modelo) => {
                        return (
                            <Grid clasName={classes.celda} item xs={4}>
                                <div className={classes.suscriptionBox}>
                                    <InputLabel className={classes.titulo}>{modelo.nombre}</InputLabel>
                                    <InputLabel className={classes.descripcion}>{modelo.descripcion}</InputLabel>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <InputLabel className={classes.descripcion}>Precio:</InputLabel>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <InputLabel className={classes.precio}>{modelo.precio}</InputLabel>
                                        </Grid>
                                    </Grid>
                                    <Button className={classes.boton} onClick={HandleSuscription}>
                                        Suscribirme
                                    </Button>
                                </div>
                            </Grid>)
                    })}
                </Grid>
                <Footy />
            </div>

        </div>
    )
}