import { makeStyles } from '@material-ui/core/styles';
import Footy from '../Footy/Footy.jsx';
import ListaImagenes from '../ListaImagenes/ListaImagenes.jsx';
import AppBarLectura from '../AppBar/AppBarLectura.jsx'
import {MiDrawer} from "../Drawer/Drawer.jsx"

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
        <div className={classes.root}>
            <MiDrawer pestaña={2}/>
            <main className={classes.content}>
                <AppBarLectura />
                <ListaImagenes/>
                <Footy/>
            </main>
        </div>
    );
}
