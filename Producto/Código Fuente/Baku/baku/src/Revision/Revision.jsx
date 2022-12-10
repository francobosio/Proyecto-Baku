import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import ListaLibrosRevisar from './ListaLibrosRevisar.jsx';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import { Container } from '@mui/material';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

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
        "font": "200% sans-serif",
        "margin-top": "1rem",
        "marginBottom": "2rem",
        'font-weight': 'bold',
        "padding-left": "0",
        color: "black",
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();

    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item container direction="column" xs={1}  >
                <MiDrawer pestaña={7} />
            </Grid>
            <Grid item direction="column" xs={11}>
                <Container disableGutters maxWidth='1800px' >
                    <AppBar />
                    <Grid item component={'main'} className={classes.content} >
                        <Container maxWidth='xl' sx={{ minHeight: '70.28vh' }} fixed>
                            <br />
                            <ListaLibrosRevisar />
                        </Container>
                    </Grid>
                    <Footy />
                </Container>
            </Grid>
        </Grid>
    );
}

