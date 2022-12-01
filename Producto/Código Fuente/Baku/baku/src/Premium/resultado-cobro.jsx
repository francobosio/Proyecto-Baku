import { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { MiDrawer } from "../Drawer/Drawer";
import AppBar from '../AppBar/AppBar.js';
import Footy from "../Footy/Footy";
import { Redirect } from "react-router-dom";
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
    },
    main: {
        maxWidth: '90vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    texto: {
        display: 'flex',
        fontWeight: "bold",
        fontSize: "1.1rem",
      },
}));

export default function ResultadoCobro() {
    const classes = useStyles();

    const search = useLocation().search;
    const preapproval_id = new URLSearchParams(search).get('preapproval_id');

    const procesarPago = async () => {
        console.log(preapproval_id);
      }
      useEffect(()=>{
        procesarPago();
      },[])

    return (
        <div className={classes.root}>
            <MiDrawer />
            <div className={classes.main}>
                <AppBar />
                <Container className={classes.contenedor}>
                    <Typography className={classes.texto}>Tu pago ha sido realizado con éxito</Typography>
                    <Typography className={classes.texto}>En los próximos minutos estarermos verificando el cobro y te habilitaremos las funciones Premium</Typography>
                    <Typography className={classes.texto}>Redirigiendo a tu página de inicio...</Typography>
                </Container>
                <Footy />
            </div>

        </div>
    )
}