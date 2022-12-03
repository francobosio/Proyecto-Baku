import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import { Link, useParams } from "react-router-dom";
import Ayuda from './Ayuda.jsx';
import ParaEscritores from './ParaEscritores.jsx';
import ReglasParaPublicar from './ReglasParaPublicar.jsx';
import TerminosCondiciones from './TerminosCondiciones.jsx';
import { Container } from '@mui/material';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    icono: {
        marginLeft: -3,
    },
    toolbar: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    carousel: {
        marginTop: 11,
        marginHorizon: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    link: {
        color: "white",
        "text-decoration": "none",
    },
    slider: {
        marginTop: 500,
    },
    titulo: {
        marginLeft: 20,
    }
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const { tipo } = useParams();

    const functionWithSwitch = (tipo) => {
        console.log(tipo);
        switch (tipo) {
            case '1':
                return <ParaEscritores />

            case '2':
                return <Ayuda />

            case '3':
                return <ReglasParaPublicar />

            case '4':
                return <TerminosCondiciones />

            default:
                return console.log("No se encontro el tipo de pagina")
        }
    }

    return (
        <Grid container direction="row" className={classes.root} >
            <Grid item container direction="column" xs={1}>
                <MiDrawer />
            </Grid>
            <Grid item direction="column" xs={11}>
                <Container disableGutters maxWidth='1800px' >
                    <AppBar />
                    <Grid item component={'main'} className={classes.content}  style={{marginBottom: '3em'}} >
                        <Container maxWidth='xl' fixed>
                            <br />
                            {functionWithSwitch(tipo)}
                        </Container>
                    </Grid>
                    <Footy />
                </Container>
            </Grid>
        </Grid>

    );
}
