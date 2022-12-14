
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import Suscripciones from "../Suscripciones/Suscripciones.jsx"
import { Container } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '100vh'
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();

    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item container direction="column" xs={1}  >
                <MiDrawer pestaña={5} />
            </Grid>
            <Grid item direction="column" xs={11}>
                <Container disableGutters maxWidth='1800px' >
                    <AppBar />
                    <Grid item component={'main'} className={classes.content} >
                        <Container maxWidth='xl' sx={{ minHeight: '70.28vh' }} fixed>
                            <br />
                            <Suscripciones />
                        </Container>
                    </Grid>
                    <Footy />
                </Container>
            </Grid>
        </Grid>
    );
}
