
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import Tabs from "./TabsBiblioteca.jsx"
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
            <MiDrawer pestaña={3}/>
            <main className={classes.content}>
                
                <AppBar />
                <Container maxWidth='xl' disableGutters fixed>
                <br />
                    <Typography variant='h4' className={classes.titulo}> Mi Biblioteca</Typography>
                    <Tabs />
                </Container>
                
                <Footy />
            </main>
        </div>
    );
}
