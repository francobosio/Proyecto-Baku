import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ComboBox from '../Publicar/ComboBox.jsx'
import TextoMultiple from '../Publicar/TextoMultiple'
import Button from '@material-ui/core/Button';
import {MiDrawer} from "../Drawer/Drawer.jsx"

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
    link: {
        color: "white",
        "text-decoration": "none",
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        
    },
    slider: {
        marginTop: 500,
    },
    titulo: {
        marginLeft: 20,
    },
    btnPublicar: {
        'background-color': '#4B9C8E',
        'borderRadius': '5rem',
        '&:hover': {
            'background': '#076F55',
            'color': '#FFFFFF',
        }
        
    },
    container:{
        'background': 'linear-gradient(180deg, #076F55 0%, #C2F1E9 100%);',
    }
}));


export default function MiniDrawer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MiDrawer/>
            <main className={classes.content}>
                <AppBar />
                <React.Fragment>
                    <Container >
                        <Grid container spacing={3}>
                            <Grid item xl={12}>
                            </Grid>
                            <Grid>
                                <Typography variant="h4" gutterBottom >
                                    Publicá tu historia
                                </Typography>
                            </Grid>
                            <Grid item xl={12} >
                                <Typography>Portada</Typography>
                                <input type="file" />
                            </Grid>
                            <Grid item xl={12} >
                                <Typography>Título</Typography>
                                <TextField
                                    required
                                    id="titulo"
                                    name="firstName"
                                    label="Título"
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xl={12}>
                                <Typography>Descripción</Typography>
                                <TextoMultiple />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Género</Typography>
                                <ComboBox />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                    label="Apto para todo público "
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography>Cargar contenido del libro</Typography>
                                <input type="file" />

                            </Grid>
                            <Grid item xs={12} >
                                <Button className={classes.btnPublicar} variant="contained">Publicar</Button>
                            </Grid>
                            <Grid item xs={12} >
                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
                <Footy />
            </main>

        </div>
    );
}
