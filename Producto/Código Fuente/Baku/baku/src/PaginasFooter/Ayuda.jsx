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

export default function Ayuda() {
    //al abrir el componente el scroll se queda en la posicion 0
    window.scrollTo(0, 0);
    

    return (
        <MainCard title="Preguntas Frecuentes (FAQs)" /* sx={{height: '41.49em',}} */>
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
                    <SubCard title="¿Cómo se califica el contenido en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Cuando se publique en Baku, se dispondrá de la opción de elegir si es Apto para todo público o si no lo es. Para el primer caso, estará disponible para todo el público libremente, y para el segundo caso, se exigirá que los usuarios que posean acceso tengan una edad mayor a 18 años obligatoriamente.
                                    Marcar un libro como tal no significa que pueda incluir contenido inapropiado. Los libros que incluyan contenido inapropiado se eliminarán independientemente de su clasificación.
                                    Si cree que su libro se ajusta a nuestras pautas, pero puede incluir partes que no son apropiadas para lectores más jóvenes, NO califique su libro como Apto para todo público, para así evitar inconvenientes futuros que pueden derivar en eliminar tanto su contenido de la aplicación como su cuenta en Baku.
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
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Hay contenido de dominio público en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                    Sí, estos son los libros escritos y creados sin ningún tipo de licencia o escritos bajo licencias de dominio público, y que nunca han estado bajo derechos de autor, o libros en los que los derechos de autor han expirado, y que tenemos disponible en nuestra plataforma para ser accedidos libremente.
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
                <Grid item xs={12} sm={12}>
                    <SubCard title="¿Puedo eliminar mi cuenta en Baku?">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MuiTypography variant="subtitle1" gutterBottom>
                                Sí, el usuario es libre de eliminar la cuenta que posee en Baku, lo cual luego de confirmarlo resultará en el borrado de todos sus datos de nuestra base de datos, por lo que si desea ingresar nuevamente a nuestra plataforma, tendrá que volver a crearse una cuenta.
                            </MuiTypography>
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


