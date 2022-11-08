import { Container, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import logoBaku from '../Imagenes/Logo_baku_blanco.png';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';

//Iconos redes social
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Image from 'material-ui-image';

const useStyles = makeStyles((theme) => ({
  contenedor: {
    background: '#4B9C8E',
    flexGrow: 1,
    textAlign: "center",
    position: "relative",
    width: "100%",
    overflow: "hidden",
    minHeight: "19.6vh",
  },
  contenedorGrilla: {
    textAlign: "left",
    alignContent: "center",
    paddingTop: "1.5em",
    color: "#FFFFFF"
  },
  icono: {
    height: 35,
    width: 35,
    color: '#FFFFFF'
  },
  textoTamaño: {
    [theme.breakpoints.up('md')]: {
      fontSize: "1.2em",
    }, [theme.breakpoints.only('md')]: {
      fontSize: "0.93em",
    }, [theme.breakpoints.only('sm')]: {
      fontSize: "0.8em",
    }, [theme.breakpoints.only('xs')]: {
      fontSize: "0.8em",
    },
  },
  logoBaku: {
    [theme.breakpoints.up('md')]: {
      top: -40,
      position: "relative",
    }, [theme.breakpoints.only('md')]: {
      top: -30,
      position: "relative",
    }, [theme.breakpoints.only('sm')]: {
      top: -25,
      position: "relative",
    }, [theme.breakpoints.only('xs')]: {
      top: 10,
      position: "relative",
    },
  },
}));

function Footy() {
  const classes = useStyles();

  return (
    <Container maxWidth={"xl"} xs={12} xl={12} className={classes.contenedor}   >
      <Grid container spacing={2} className={classes.contenedorGrilla}>
        <Grid item xs={4}  className={classes.logoBaku}>
          <Image src={logoBaku} aspectRatio={2.8} color={"#4B9C8E"} />
        </Grid>
        <Grid item xs={2} sm container>
          <Grid item xs container direction="column">
            <Grid item xs>
              <Link to="/Ayuda/1" style={{ textDecoration: 'none', color: 'white' }}>
                <Typography className={classes.textoTamaño}>Para escritores</Typography>
              </Link>
            </Grid>
            <Grid item xs>
              {/* quitar el color y el subrayado a link */}
              <Link to="/Ayuda/3" style={{ textDecoration: 'none', color: 'white' }}>
                <Typography className={classes.textoTamaño} >Reglas para publicar libros</Typography>
              </Link>
            </Grid>
            <Grid item xs>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} sm container>
          <Grid item xs container direction="column" >
            <Grid item xs>
              <Link to="/Ayuda/2" style={{ textDecoration: 'none', color: 'white' }}>
                <Typography className={classes.textoTamaño}>Ayuda</Typography>
              </Link>
            </Grid>
            <Grid item xs>
              <Link to="/Ayuda/4" style={{ textDecoration: 'none', color: 'white' }}>
                <Typography className={classes.textoTamaño}>Términos y Condiciones de Uso</Typography>
              </Link>
            </Grid>
            <Grid item xs>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} sm container>
          <Grid item xs container direction="row" >
            <Grid item xs>
              <IconButton size='small' aria-label="Facebook.com/BakuLibros" onClick={() => window.open('https://www.facebook.com/LibrosBaku/')}>
                <FacebookIcon className={classes.icono} />
              </IconButton>
            </Grid>
            <Grid item xs>
              <IconButton size='small' aria-label="Instagram.com/bakulibros" onClick={() => window.open('https://www.instagram.com/bakulibros/')}>
                <InstagramIcon className={classes.icono} />
              </IconButton>
            </Grid>
            <Grid item xs>
              <IconButton size='small' aria-label="Youtube.com/BakuLibros" onClick={() => window.open('https://www.youtube.com/channel/UCc0lXcP4y3lFm_358348THw')}>
                <YouTubeIcon className={classes.icono} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footy
