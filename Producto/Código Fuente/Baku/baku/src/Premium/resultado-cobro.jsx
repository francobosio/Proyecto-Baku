import { useEffect} from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";
import {Grid} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";
import * as cobroPremiumService from './premiumService.ts';

const useStyles = makeStyles((theme) => ({
    root: {
      'background': 'linear-gradient(180deg, #076F55 0%, #C2F1E9 100%);',
      'minHeight': '100vh',
      'minWidth': '100vw',
    },
    titulo:{
        display: 'flex',
        fontWeight: 'bold',
        fontSize: '3rem',
        color: '#054837'
    },
    texto: {
        display: 'flex',
        'fontSize': '1.2rem',
        fontWeight: 'bold'
    }
  }));

export default function ResultadoCobro() {
    let history = useHistory();
    const classes = useStyles();
    const search = useLocation().search;
    const preapproval_id = new URLSearchParams(search).get('preapproval_id');

    const procesarPago = async () => {
        const usuarioId = localStorage.getItem('usuario_id');
        const pagoData = {front_Id: preapproval_id, user_Id: usuarioId}
        const res = await cobroPremiumService.procesarCobroFront(pagoData);
        setTimeout(() => {history.push('/Inicio')}, 5000)
    }

    useEffect(()=>{
        procesarPago();
    },[])

    return (
      <Grid container direction="row" className={classes.root}>
            <Grid item direction="column" xs={12}>
                <Container disableGutters maxWidth='1800px' >
                  <Grid
                  container
                  spacing={5}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: '100vh', minWidth: '100vw' }}
                >
                  <Grid item xs={12}>
                      <Typography className={classes.titulo}>¡Gracias por apoyar a Baku!</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <CircularProgress className={classes.circulo} size="13rem" />
                  </Grid>
                  <Grid item xs={12}>
                      <Typography className={classes.texto}>En los próximos minutos estaremos verificando tu pago y te habilitaremos las funciones Premium.</Typography>
                      <Typography className={classes.texto}>Este proceso puede tardar unos minutos. Mientras tanto te redirigiremos a tu página de inicio para que sigas disfrutando de la lectura.</Typography>
                  </Grid>
                </Grid>
                </Container>
            </Grid>
        </Grid>
        /*<div>
            <Container justifycontent="center" maxWidth="xl" className={classes.root}>
              <Grid
                container
                spacing={5}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh', minWidth: '100vw' }}
              >
                <Grid item xs={12}>
                    <Typography className={classes.titulo}>¡Gracias por apoyar a Baku!</Typography>
                </Grid>
                <Grid item xs={3}>
                  <CircularProgress className={classes.circulo} size="13rem" />
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.texto}>En los próximos minutos estaremos verificando tu pago y te habilitaremos las funciones Premium.</Typography>
                    <Typography className={classes.texto}>Este proceso puede tardar unos minutos. Mientras tanto te redirigiremos a tu página de inicio para que sigas disfrutando de la lectura.</Typography>
                </Grid>
              </Grid>
            </Container>
        </div>*/
    )
}