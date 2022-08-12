import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import { MiDrawer } from "../Drawer/Drawer.jsx"
import { Link, useParams } from "react-router-dom";
import { Grid, Link2 } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from './SubCard';
import MainCard from './MainCard';
import { Divider } from '@mui/material';

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
//crear un componente que se llame Ayuda para mostrar un parrafo 

export default function ParaEscritores() {
    window.scrollTo(0, 0);

    return (
        <MainCard title="Para escritores" /* sx={{height: '41.49em',}} */>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Qué historias se pueden publicar en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Baku anima a todos los autores independientes a expresar su creatividad e imaginación a través de historias originales. No permitiremos ninguna infracción de derechos de autor o material pirateado en la plataforma y eliminaremos cualquier trabajo que descubramos que se ha publicado ilegalmente.
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Cómo publico en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Desde nuestra opción Publicar ubicada en el menú lateral de la aplicación, podrá publicar contenido en Baku, en donde se le solicitará subir el archivo correspondiente, una portada y los datos identificatorios: Título, Descripción, Editorial, Autor, Género y si es apto para todo público o no lo es.</MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿El contenido se publica inmediatamente en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Nuestro objetivo es crear una comunidad segura para todos en Baku, por lo que cada libro pasa por un proceso de revisión en donde si el libro no cumple con las pautas establecidas en los Términos y Condiciones, como infracción de derechos de autor o contenido inapropiado, el libro no será publicado.
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Cómo me registro en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Para registrarse, haciendo click en Ingresa en Baku en la página de Home, se redirigirá a una pantalla en donde se cuentan dos opciones para poder registrarse: <br />
                                    • Haciendo click en Iniciar con Google, teniendo una cuenta de Gmail previamente creada, se le solicitarán los datos de esa cuenta y el permiso del acceso mediante Auth0, lo cual brinda la seguridad correspondiente para realizar ese acceso sin infringir ninguna norma de privacidad.<br />
                                    • Haciendo click en Registrarse, usted podrá brindar una casilla de e-mail para crear una cuenta en Baku, junto con un usuario y una contraseña para tal fin.
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Cómo me convierto en usuario premium en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Desde la opción “Suscribirse” en la página de Inicio, usted podrá acceder a cualquiera de nuestros planes de suscripción para convertirse en usuario premium.<br />
                                    Los planes con los que contamos son: <br />
                                    •<b> Mensual</b>: Será el plan más accesible que se podrá ir renovando mes a mes, sin publicidades en la aplicación y con herramientas extras de visualización y de lectura de libros, para una experiencia de lectura más completa.<br />
                                    •<b> Anual</b>: Sumados a los beneficios del plan mensual, adicionalmente se contará con un precio promocional por la suscripción por un período de 12 meses y a su vez, más herramientas extras de las mencionadas anteriormente.<br />
                                    •<b> Familiar</b>: Sumados a los beneficios del plan mensual, se ofrecerá un precio especial por el acceso premium a la aplicación con 6 perfiles distintos para cada integrante de la familia, con un manejo de Bibliotecas con sus libros favoritos de manera separada e independiente.
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Cómo se manejan los reclamos en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Frente a una posible violación de derechos de autor o de contenido inapropiado, se seguirán los siguientes pasos:<br />
                                    • El usuario inicia un reclamo por tal motivo especificando qué tipo de reclamo es, el libro a denunciar y un fundamento<br />
                                    • Luego, el equipo de Baku procederá a analizarlo pasándose a revisión<br />
                                    • Finalmente, se decidirá si se aprueba el reclamo porque infringe derechos de autor derivando a dar de baja el contenido notificándole tal situación a su autor, o si se rechaza por no hacerlo o no encontrar razones suficientes para dar de baja el mismo.
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Puedo eliminar un libro publicado en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                Sí, el autor es libre de eliminar un libro de su autoría que haya publicado en Baku si él lo desea, lo cual resultará en el borrado del mismo de nuestra base de datos y ya no estará más disponible al público dentro de la plataforma.</MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
            <Divider
                sx={{
                    marginTop: '1em',
                    backgroundImage: '#4b9c8e',
                    opacity: 1,
                    color: '#42897d',
                    borderColor: '#42897d'
                }}
            />
        </MainCard>
    );
}


