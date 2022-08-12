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

export default function ReglasParaPublicar() {
    window.scrollTo(0, 0);

    return (
        <MainCard title="Reglas para publicar libros" /* sx={{height: '41.49em',}} */>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Qué es una infracción de derechos de autor?
">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom paragraph={true} >
                                    {/* al final de la horacion realizar un salto de linea */}
                                    • Publicar las obras protegidas por derechos de autor de otros sin su consentimiento legal. <br />
                                    • Publicar en nombre de un autor y darles crédito. Esto sigue siendo una violación de los derechos de autor y se tratará de la misma manera. SIEMPRE se requiere el consentimiento del autor.<br />
                                    • Las adaptaciones o alteraciones leves a una obra, como cambiar de nombre, copiar los eventos y escribirlos con sus propias palabras, cambiar los puntos de vista de los personajes, constituyen una violación de los derechos de autor.<br />
                                    • Usando una imagen que no es tuya. Esto incluye hacer una portada con una imagen de la que no posee los derechos (a menos que sea de dominio público).
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Qué se considera como contenido inapropiado?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Nuestro objetivo es crear una comunidad segura para todos en Baku. La siguiente no es una lista completa y tenemos derecho a eliminar cualquier contenido que consideremos inapropiado. Se eliminará cualquier contenido que pueda poner en riesgo a nuestra comunidad. Baku tiene derecho a cerrar cualquier cuenta o eliminar contenido sin previo aviso. Por lo tanto, te pedimos no publiques ningún contenido que:<br />
                                    • Fomente o dé instrucciones sobre la autolesión<br />
                                    • Tengan la intención de conmocionar o disgustar a nuestra comunidad<br />
                                    • Contenga amenazas físicas de violencia o amenazas de muerte hacia ningún individuo o grupo de personas<br />
                                    • Historias o individuos que glorifiquen, elogien o romanticen a grupos, figuras u organizaciones extremistas violentas de odio en la vida real con intenciones violentas u odiosas<br />
                                    • Ataque a un usuario por motivos puramente personales<br />
                                    • Revele cualquier información de identificación personal sobre otras personas<br />
                                    • Promueve activamente la violencia o el odio. La promoción del odio por motivos de raza, etnia, religión, discapacidad, género, edad u orientación sexual, o contenido que tenga la intención de intimidar, amenazar o acosar a otros, está estrictamente prohibido<br />
                                    • Tenga contenido pornográfico, fomente los mensajes privados sexuales, actos sexuales ilegales o glorificación de la violencia sexual.
                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Pierdo mis derechos como autor al publicar en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    No, tu contenido es tuyo. Eres propietario de todos los derechos sobre el contenido que publicas en los Servicios de Baku. Si el contenido no era tuyo en un principio, publicarlo en Baku no lo convierte en tal. No envíe contenido sobre el que no tenga los derechos de autor. <br />

                                    Cuando publica contenido en Baku, necesitamos el permiso legal según Ley 11.723 de Propiedad Intelectual establecida en el Boletín Nacional de la República Argentina, para mostrar ese contenido a los usuarios de los Servicios de Baku. Es la protección que le da la ley al autor de una obra científica, literaria, artística o didáctica por su creación intelectual. Le permite exponerla o reproducirla por cualquier medio, traducirla, explotarla comercialmente o autorizar a otros a hacerlo. También le permite impedir que cualquier persona no autorizada ejerza estos derechos.<br />
                                    Las obras publicadas en sitios de Internet también están protegidas, ya que una obra esté en internet no significa que su autor haya renunciado al derecho de explotar económicamente su obra.<br />
                                    Se considera autor a la persona natural que aparece como tal en la obra. Como autor, eres responsable del contenido que publicas. Esto significa que se asumen todos los riesgos relacionados con su publicación y visualización, incluido cualquier reclamo relacionado con la propiedad intelectual u otros derechos legales.

                                </MuiTypography>
                            </Grid>
                        </Grid>
                    </SubCard>
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
            </Grid>
        </MainCard>
    );
}


