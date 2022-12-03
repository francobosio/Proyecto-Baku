import { makeStyles } from '@material-ui/core/styles';
import Footy from '../Footy/Footy.jsx';
import ListaImagenes from '../ListaImagenes/ListaImagenes.jsx';
import AppBarLectura from '../AppBar/AppBarLectura.jsx'
import { MiDrawer } from "../Drawer/Drawer.jsx"
import { Grid } from '@material-ui/core';
import { Container} from '@mui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
    },
    link: {
        color: "white",
        "text-decoration": "none",
    },
    content: {
        'background': '#99cfbf',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    }
}));

export default function MiniDrawer() {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item container direction="column" xs={1}  >
                {/* si la pantalla es pequeña achicar el drawer  */}
                <MiDrawer pestaña={2} />
            </Grid>
            <Grid item direction="column" xs={11}>
                <Container disableGutters maxWidth='1800px' >
                    <AppBarLectura />
                        <Grid item component={'main'} className={classes.content} >
                            <ListaImagenes />
                        </Grid>
                    <Footy />
                </Container>
            </Grid>
        </Grid>
    );
}
