import React from "react";
import { makeStyles, Grid, Button, InputLabel, Container } from "@material-ui/core";
import { MiDrawer } from "../Drawer/Drawer";
import AppBar from '../AppBar/AppBar.js';
import Footy from "../Footy/Footy";
import * as planPremiumService from '../Premium/premiumService.ts';
import logo from '../Imagenes/Logo_MP.png'
import Image from 'material-ui-image';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const useStyles = makeStyles((theme) => ({
    root: {
        'background': '#99cfbf',
    },
    boton: {
        'font-weight': 'bold',
        'display': 'flex',
        'color': 'white',
        'fontSize': '1rem',
        'background-color': '#3a7a6f',
        'width': '100%',
        '&:hover': {
            'background': '#076F55',
            'color': 'white',
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
        height: '70vh',
        width: '18vw',
        background: '#7ec2ae',
    },
    contenedor: {
        padding: '2rem 10rem 2rem 10rem',
        height: '90vh',
        justifyContent: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: '2rem',
        padding: '2rem 1rem 2rem 1rem',
        textAlign: 'center',
        color: '#1B1B1B',
    },
    descripcion: {
        fontSize: '1rem',
        padding: '2rem 1rem 2rem 1rem',
        color: '#1B1B1B',
        fontWeight: 'bold',
    },
    precio: {
        fontSize: '1rem',
        padding: '2rem 1rem 2rem 1rem',
        textAlign: 'justify',
        fontWeight: 'bold',
    },
    descripcionDetallada: {
        fontSize: '1rem',
        color: '#1B1B1B',
        padding: '1rem',
    },
    dialogTitle: {
        color: 'red'
    }
}));

export default function HomePremium() {
    const classes = useStyles();
    const [planesPremium, setPlanesPremium] = React.useState([]);
    const [textoPremium, setTextoPremium] = React.useState("");
    const [deshabilitado, setDeshabilitado] = React.useState("1");
    const [abrirDialog, setAbrirDialog] = React.useState(false);
    const [cobro, setCobro] = React.useState("");

    React.useEffect(() => {
        async function fetchPlanes() {
            const res = await planPremiumService.getPlanesPremium();
            setPlanesPremium(res.data);
        }
        async function fetchCobro() {
            const res = await planPremiumService.obtenerCobrosPorUserId(localStorage.getItem("usuario_id"));
            setCobro(res.data);
        }
        fetchPlanes();

        const tipo = localStorage.getItem("tipoUsuario");
        setDeshabilitado(tipo == "2");
        if (tipo == "1") {
            setTextoPremium("Obtener Premium");
        } else {
            setTextoPremium("Usted ya cuenta con la suscripción Premium de Baku.");
            fetchCobro();
        }
    }, [])

    const handleCloseDialog = () => {
        setAbrirDialog(false);
    };

    const openDialog = () => {
        setAbrirDialog(true);
    }

    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item container direction="column" xs={1}>
                <MiDrawer />
            </Grid>

            <Grid item direction="column" xs={11}>
                <Container disableGutters maxWidth='1800px' >
                    <AppBar />
                    <Grid className={classes.contenedor} container spacing={2}>
                        {planesPremium.map((modelo) => {
                            return (
                                <React.Fragment key={modelo._id}>
                                    <Grid className={classes.celda} container alignItems="center" justifyContent="center" xs={6}>
                                        <div className={classes.suscriptionBox}>
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid item xs={6}>
                                                    <Image src={logo} aspectRatio={1.6} color={'#7ec2ae'} />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel className={classes.titulo}>{modelo.titulo}</InputLabel>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel className={classes.descripcion}>Con este plan obtendrás las siguientes características adicionales:</InputLabel>
                                                <InputLabel className={classes.descripcionDetallada}>{modelo.descripción}</InputLabel>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <InputLabel className={classes.descripcion}>Precio:</InputLabel>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <InputLabel className={classes.precio}>${modelo.precio}.00</InputLabel>
                                                </Grid>
                                                <Grid container spacing={3} alignItems="center" justifyContent="center">
                                                    <Grid item xs={12}>
                                                        <Button className={classes.boton} onClick={openDialog} variant="contained" disabled={deshabilitado}>
                                                            {textoPremium}
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {deshabilitado &&
                                                            <Button className={classes.boton} href={`https://www.mercadopago.com.ar/subscriptions/v0/${cobro.webhookId}/admin`} target="_blank" variant="contained">
                                                                Cancelar mi Suscripción
                                                            </Button>}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} >
                                                {abrirDialog && <Dialog open={abrirDialog} onClose={handleCloseDialog} aria-labelledby="responsive-dialog-title">
                                                    <DialogTitle className={classes.dialogTitle}>¡Atención!</DialogTitle>
                                                    <DialogContent>No cierre esta pestaña hasta haber finalizado el pago y haber vuelto a Baku, caso contrario no podremos
                                                        verificar el cobro y no podremos habilitarle las funcionalidades premium aunque usted haya realizado el pago.
                                                    </DialogContent>
                                                    <DialogContent>
                                                        Si entiende este mensaje y desea continuar haga click en aceptar y lo redirigiremos a la página de Mercado Pago.
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={handleCloseDialog} color="primary">
                                                            Cancelar
                                                        </Button>
                                                        <Button href={modelo.urlCobro} color="primary" autoFocus>
                                                            Aceptar
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>}
                                            </Grid>
                                        </div>
                                    </Grid>
                                </React.Fragment>)
                        })}
                    </Grid>
                    <Footy />
                </Container>
            </Grid>
        </Grid>
    )
}