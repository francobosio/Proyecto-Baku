import { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { MiDrawer } from "../Drawer/Drawer";
import AppBar from '../AppBar/AppBar.js';
import Footy from "../Footy/Footy";
import { Redirect } from "react-router-dom";
import { Container } from "@mui/system";

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
    const [procesando, setProcesando] = useState(true)
    const [resultText, setResultText] = useState("Estamos procesando tu pago");
    const classes = useStyles();

    const procesarPago = async () => {
        setTimeout(() => {
            setResultText("Tu pago ha sido procesado correctamente")
            setProcesando(false);
            setTimeout(() => {
                <Redirect to="/home"></Redirect>
            }, 2000)
        },3000)
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
                    <Typography className={classes.texto}>{resultText}</Typography>
                    <Typography hidden={procesando} className={classes.texto}>Redirigiendo a tu página de inicio...</Typography>
                </Container>
                <Footy />
            </div>

        </div>
    )
}