
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import Suscripciones from "../Suscripciones/Suscripciones.jsx"
import { Container } from '@mui/material';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },

    titulo: {
        "font": "200% sans-serif",
        "margin-top": "1rem",
        "marginBottom": "1rem",
        'font-weight': 'bold',
        "padding-left": "0",
        color: "black",
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MiDrawer />
            <main className={classes.content}>
                
                <AppBar />
                <Container maxWidth='xl' sx={{minHeight: '70.28vh'}} disableGutters fixed>
                <br />
                    <Typography variant='h4' className={classes.titulo}> Suscripciones </Typography>
                    <Suscripciones/>
                </Container>
                
                <Footy />
            </main>
        </div>
    );
}
