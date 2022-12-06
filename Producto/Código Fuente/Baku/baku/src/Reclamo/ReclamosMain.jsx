
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Reclamos from './Reclamos.jsx';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import { Container } from '@mui/material';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    titulo: {
        "font": "200% sans-serif",
        "margin-left": "1rem",
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
        <Grid container direction="row" className={classes.root}>
            <Grid item container direction="column" xs={1}  >
            <MiDrawer pestaña={8} />
            </Grid>
            <Grid item direction="column" xs={11}>
                <Container disableGutters maxWidth='1800px' >
                    <AppBar />
                    <Grid item component={'main'} className={classes.content} >
                        <Container maxWidth='xl' sx={{ minHeight: '70.28vh' }} fixed>
                            <br />
                    <Typography variant='h4' className={classes.titulo}> Reclamos</Typography>
                    <Reclamos />
                    </Container>
                    </Grid>
                    <Footy />
                </Container>
            </Grid>
        </Grid>
    );
}
