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
        display: 'flex',
        'background': '#99cfbf',
    },
    boton: {
        'font-weight': 'bold',
        'display': 'flex',
        textAlign: 'center',
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
        margin: '2rem',
        padding: '2rem',
        width: '55%',
        background: '#7ec2ae',
        [theme.breakpoints.down('md')]: {
            width: '70%',
        },
        [theme.breakpoints.down('450')]: {
            padding: '0.6rem'
        },
    },
    contenedor: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: '2rem',
        padding: '1rem 1rem 0.2rem 1rem',
        textAlign: 'center',
        verticalAlign: "middle",
        color: '#1B1B1B',
        height: '4rem',
        [theme.breakpoints.down('1200')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.down('900')]: {
            fontSize: '1.6rem',
        },
    },
    descripcion: {
        fontSize: '1rem',
        padding: '2rem 1rem 2rem 1rem',
        color: '#1B1B1B',
        fontWeight: 'bold',
        height: '1rem'
    },
    precio: {
        fontSize: '1rem',
        padding: '2rem 1rem 2rem 1rem',
        textAlign: 'center',
        fontWeight: 'bold',
        height: '2rem'
    },
    descripcionDetallada: {
        fontSize: '1rem',
        color: '#1B1B1B',
        padding: '1rem',
        [theme.breakpoints.down('1200')]: {
            fontSize: '0.9rem',
        },
        height: '9rem'
    },
    dialogTitle: {
        color: 'red'
    },
    content: {
        display: 'block',
        flex: 1,
        height: '100vh'
    },
    root1: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        'background': '#99cfbf',
        minHeight: '100vh',
        alignItems: 'center',
    },
}));

export default function HomePremium() {
    const classes = useStyles();
    const [planesPremium, setPlanesPremium] = React.useState([]);
    const [textoPremium, setTextoPremium] = React.useState("");
    const [deshabilitado, setDeshabilitado] = React.useState("1");
    const [abrirDialog, setAbrirDialog] = React.useState(false);
    const [cobro, setCobro] = React.useState("");
    const [urlCobro, setUrlCobro] = React.useState("");
    const [planPago, setPlanPago] = React.useState(null);

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

        const planUrl = localStorage.getItem("planPremium")
        const tipo = localStorage.getItem("tipoUsuario");
        if (planUrl && planUrl != ''){
            setPlanPago(planUrl)
        }
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

    const openDialog = (url) => {
        setAbrirDialog(true);
        setUrlCobro(url);
    }

    return (
        <div className={classes.root}>
            <MiDrawer />
            <main className={classes.content}>
                    <AppBar />
                    <Container disableGutters className={classes.root1} maxWidth="xl">
                        <Grid container justifyContent="center" alignItems="flex-start">
                            {planesPremium.map((modelo) => {
                                return (
                                    <React.Fragment key={modelo._id}>
                                        <Grid className={classes.suscriptionBox} item container spacing={1} xs={11} sm={8} md={5} lg={4} xl={3} alignItems="center" justifyContent="center">
                                            <Grid item xs={6}>
                                                <Image src={logo} aspectRatio={1.6} color={'#7ec2ae'} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel className={classes.titulo}>{modelo.titulo}</InputLabel>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel className={classes.descripcion}>Con este plan obtendrás las siguientes características adicionales:</InputLabel>
                                                <pre style={{ fontFamily: 'inherit','white-space': 'pre-wrap', 'overflow-wrap': 'break-word' }}>
                                                    <InputLabel className={classes.descripcionDetallada}>{modelo.descripción}</InputLabel>
                                                </pre>  
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel className={classes.precio}>Precio: ${modelo.precio}.00</InputLabel>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button className={classes.boton} onClick={() => {openDialog(modelo.urlCobro)}} variant="contained" disabled={deshabilitado}>
                                                    {textoPremium}
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {(deshabilitado && planPago == modelo.urlCobro) &&
                                                    <Button className={classes.boton} href={`https://www.mercadopago.com.ar/subscriptions/v0/${cobro.webhookId}/admin`} target="_blank" variant="contained">
                                                        Cancelar mi Suscripción
                                                    </Button>}
                                            </Grid>
                                        </Grid>
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
                                                <Button href={urlCobro} color="primary" autoFocus>
                                                    Aceptar
                                                </Button>
                                            </DialogActions>
                                        </Dialog>}
                                    </React.Fragment>)
                            })}
                        </Grid>
                    </Container>
                    <Footy />
            </main>
        </div>
    )
}