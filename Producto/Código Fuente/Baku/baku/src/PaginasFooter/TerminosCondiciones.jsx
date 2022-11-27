
import { Grid} from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from './SubCard';
import MainCard from './MainCard';
import { Divider } from '@mui/material';

//crear un componente que se llame Ayuda para mostrar un parrafo 

export default function Ayuda() {
    window.scrollTo(0, 0);
    return (
        <MainCard title="Términos y Condiciones" /* sx={{height: '41.49em',}} */>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <SubCard title="Bienvenido a la aplicación web Baku">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                {/* The pagraphy justify content */}
                                <MuiTypography variant="subtitle1" gutterBottom paragraph={true} align="justify">
                                    <p> Al usar Baku, crear su cuenta y usar el sitio para publicar contenido en la comunidad de Baku, incluídos los libros que publica, o para acceder y ver el contenido de Baku o otro contenido de usuario, acepta estos Términos de servicio. Si no está de acuerdo con alguno de estos términos, no puede utilizar los servicios de Baku.   <br />
                                        Baku puede cambiar los términos de este Acuerdo en cualquier momento a su entera discreción con una notificación de treinta (30) días al Autor. Los cambios entrarán en vigencia al final del período de notificación, y el uso continuo de la plataforma por parte del Autor después de la finalización del período de notificación, constituye la aceptación por parte del Autor de dichos cambios. Si el Autor no está de acuerdo con los cambios, el Autor debe suspender todo uso de la Plataforma y eliminar todo su Contenido del Autor antes de que finalice el Período de Notificación.   <br />

                                        Baku anima a todos los autores independientes a expresar su creatividad e imaginación a través de historias originales. No permitimos ninguna infracción de derechos de autor o material pirateado en la plataforma y eliminaremos cualquier trabajo que descubramos que se ha publicado ilegalmente. Si bien es posible que algunos usuarios no estén al tanto de la ley de propiedad intelectual y el concepto de derechos de autor, hacemos todo lo posible para educar e informar a nuestra comunidad mientras construimos una audiencia atractiva para todos los autores.   <br />
                                        <br />
                                        <b>¿Qué es una infracción de derechos de autor?</b>   <br />
                                        Publicar las obras protegidas por derechos de autor de otros sin su consentimiento legal.  <br />
                                        Publicar en nombre de un autor y darles crédito. Esto sigue siendo una violación de los derechos de autor y se tratará de la misma manera. SIEMPRE se requiere el consentimiento del autor.   <br />
                                        Las adaptaciones o alteraciones leves a una obra, como cambiar de nombre, copiar los eventos y escribirlos con sus propias palabras, cambiar los puntos de vista de los personajes, constituyen una violación de los derechos de autor.   <br />
                                        Usando una imagen que no es tuya. Esto incluye hacer una portada con una imagen de la que no posee los derechos (a menos que sea de dominio público).   <br />
                                        <br />
                                        <b>¿Qué se considera como contenido inapropiado?</b><br />
                                        Nuestro objetivo es crear una comunidad segura para todos en Baku. La siguiente no es una lista completa y tenemos derecho a eliminar cualquier contenido que consideremos inapropiado. Se eliminará cualquier contenido que pueda poner en riesgo a nuestra comunidad. Baku tiene derecho a cerrar cualquier cuenta o eliminar contenido sin previo aviso. Por lo tanto, te pedimos no publiques ningún contenido que:
                                        Fomente o dé instrucciones sobre la autolesión
                                        Tengan la intención de conmocionar o disgustar a nuestra comunidad
                                        Contenga amenazas físicas de violencia o amenazas de muerte hacia ningún individuo o grupo de personas
                                        Historias o individuos que glorifiquen, elogien o romanticen a grupos, figuras u organizaciones extremistas violentas de odio en la vida real con intenciones violentas u odiosas
                                        Ataque a un usuario por motivos puramente personales
                                        Revele cualquier información de identificación personal sobre otras personas
                                        Promueve activamente la violencia o el odio. La promoción del odio por motivos de raza, etnia, religión, discapacidad, género, edad u orientación sexual, o contenido que tenga la intención de intimidar, amenazar o acosar a otros, está estrictamente prohibido
                                        Tenga contenido pornográfico, fomente los mensajes privados sexuales, actos sexuales ilegales o glorificación de la violencia sexual
                                        <br />
                                        <br />
                                        <b>Calificación de contenido</b>
                                        <br />
                                        Cuando se publique contenido en Baku, se dispondrá de la opción de elegir si es Apto para todo público o si no lo es. Para el primer caso, estará disponible para todo el público libremente, y para el segundo caso, se exigirá que los usuarios que posean acceso tengan una edad mayor a 18 años obligatoriamente.
                                        Marcar un libro como tal no significa que pueda incluir contenido inapropiado. Los libros que incluyan contenido inapropiado se eliminarán independientemente de su clasificación.
                                        Si cree que su libro se ajusta a nuestras pautas, pero puede incluir partes que no son apropiadas para lectores más jóvenes, NO califique su libro como Apto para todo público, para así evitar inconvenientes futuros que pueden derivar en eliminar tanto su contenido de la aplicación como su cuenta en Baku.
                                        <br />
                                        <br />
                                        <b>Tu contenido es tuyo</b>
                                        <br />
                                        Antes de publicar cualquier contenido en Baku, es importante no infringir los derechos de autor explicados anteriormente. Si su contenido no cumple con estas pautas, puede eliminarse en cualquier momento.
                                        El único contenido exceptuado es aquel considerado de dominio público y que fue publicado en Baku por sus administradores por tal motivo. Éstos son los libros escritos y creados sin ningún tipo de licencia o escritos bajo licencias de dominio público, y aquellos que nunca han estado bajo derechos de autor o libros en los que los derechos de autor han expirado.
                                        <br />
                                        Eres propietario de todos los derechos sobre el contenido que publicas en los Servicios de Baku. Si el contenido no era tuyo en un principio, publicarlo en Baku no lo convierte en tal. No envíe contenido sobre el que no tenga los derechos de autor.
                                        <br />
                                        Cuando publica contenido en Baku, necesitamos el permiso legal según Ley 11.723 de Propiedad Intelectual establecida en el Boletín Nacional de la República Argentina, para mostrar ese contenido a los usuarios de los Servicios de Baku. Es la protección que le da la ley al autor de una obra científica, literaria, artística o didáctica por su creación intelectual. Le permite exponerla o reproducirla por cualquier medio, traducirla, explotarla comercialmente o autorizar a otros a hacerlo. También le permite impedir que cualquier persona no autorizada ejerza estos derechos.
                                        Las obras publicadas en sitios de Internet también están protegidas, ya que una obra esté en internet no significa que su autor haya renunciado al derecho de explotar económicamente su obra.
                                        Se considera autor a la persona natural que aparece como tal en la obra. Como autor, eres responsable del contenido que publicas. Esto significa que se asumen todos los riesgos relacionados con su publicación y visualización, incluido cualquier reclamo relacionado con la propiedad intelectual u otros derechos legales.
                                        <br />
                                        <br />
                                        <b>Planes de suscripción</b>
                                        <br />
                                        Baku es un servicio gratuito y, para continuar haciéndolo gratuito, comprende que habilitamos la publicidad en los Servicios, incluso en relación con la visualización de su contenido u otra información. También podemos utilizar su Contenido para promocionar los Servicios, pero nunca venderemos su contenido a terceros sin su permiso explícito.
                                        Opcionalmente, se ofrecerán tres tipos de suscripciones que están diferenciadas principalmente en beneficios adicionales, precios y en su duración:
                                        Mensual: Será el plan más accesible que se podrá ir renovando mes a mes, sin publicidades en la aplicación y con herramientas extras de visualización y de lectura de libros, para una experiencia de lectura más completa.
                                        Anual: Sumados a los beneficios del plan mensual, adicionalmente se contará con un precio promocional por la suscripción por un período de 12 meses y a su vez, más herramientas extras de las mencionadas anteriormente.
                                        Familiar: Sumados a los beneficios del plan mensual, se ofrecerá un precio especial por el acceso premium a la aplicación con 6 perfiles distintos para cada integrante de la familia, con un manejo de Bibliotecas con sus libros favoritos de manera separada e independiente.
                                        <br />
                                        Como objetivo de lanzamiento de la aplicación, a futuro se busca que haya cientos de cargas de libros en Baku y que cada día se agreguen más. Tenemos varias medidas para limitar la infracción de derechos de autor en Baku, como el manejo de Reclamos, en donde frente a una posible violación de derechos de autor o de contenido inapropiado, se seguirán los siguientes pasos:  <br />
                                        El usuario inicia un reclamo por tal motivo especificando qué tipo de reclamo es, el libro a denunciar y un fundamento
                                        Luego, el equipo de Baku procederá a analizarlo pasándose a revisión
                                        Finalmente, se decidirá si se aprueba el reclamo porque infringe derechos de autor derivando a dar de baja el contenido notificándole tal situación a su autor, o si se rechaza por no hacerlo o no encontrar razones suficientes para dar de baja el mismo.
                                        <br />
                                        Cabe aclarar que su trabajo está protegido automáticamente por la ley de derechos de autor tan pronto quede disponible en nuestra aplicación.
                                        <br />
                                        Baku es un espacio para encontrar tu comunidad y los libros que te importan. Tenemos una política de tolerancia cero para cualquier forma de contenido inapropiado o que infrinja derechos de autor.
                                        <br />
                                        Las decisiones de Baku son definitivas. Nos reservamos el derecho de eliminar cualquier contenido o cuentas que violen las políticas de Baku. Si no está de acuerdo con nuestras políticas, no utilice los Servicios de Baku.
                                        <br />
                                        <br />
                                        <b>¡Gracias por elegir Baku y ayudarnos a crear una comunidad de lectura más segura!</b></p>
                                    <br /> </MuiTypography>
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


