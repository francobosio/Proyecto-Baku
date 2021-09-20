import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@material-ui/core';
import AppBar from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import Slider from '../CarouselPrincipal';
import Image from 'material-ui-image';
import {MiDrawer} from "../Drawer/Drawer.jsx"

//Imagenes
import imagen2 from "../Imagenes/El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur-md.jpg";
import imagen3 from "../Imagenes/3.jpg";
import imagen6 from "../Imagenes/6.jpg";
import imagen7 from "../Imagenes/7.jpg";
import imagen8 from "../Imagenes/8.jpg";
import imagen5 from "../Imagenes/5.jpg";
import imagen4 from "../Imagenes/4.jpg";
import imagen10 from "../Imagenes/La_llamada_de_Cthulhu-H._P._Lovecraft-md.jpg"
import imagen11 from "../Imagenes/Don_Quijote_de_la_Mancha-Cervantes_Miguel-md.png"
import imagen12 from "../Imagenes/Alicia_en_el_pais_de_las_maravillas-Carroll_Lewis-md.png"
import imagen13 from "../Imagenes/El_arte_de_la_guerra-Sun_Tzu-md.png"
import imagen14 from "../Imagenes/El_traje_nuevo_del_emperador-Hans_Christian_Andersen-md.jpg"
import imagen15 from "../Imagenes/La_divina_comedia-Dante_Alighieri-md.png"

const libros = [
    {
        pdf: 'Alicia_en_el_pais_de_las_maravillas-Carroll_Lewis.pdf',
        image: imagen12,
        title: 'Alicia en el pais de las maravillas',
        description: 'Las aventuras de Alicia en el país de las maravillas, comúnmente abreviado como Alicia en el país de las maravillas, es una novela de fantasía escrita por el matemático, lógico, fotógrafo y escritor británico Charles Lutwidge Dodgson, bajo el seudónimo de Lewis Carroll, publicada en 1865. La historia cuenta cómo una niña llamada Alicia cae por un agujero, encontrándose en un mundo peculiar y extraño , poblado por humanos y criaturas antropomórficas.',
    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen2,
        title: 'El regreso de Sherlok Holmes',
        description: 'El regreso de Sherlock Holmes es una colección de 13 historias cortas de Sir Arthur Conan Doyle. Fue publicada por primera vez en The Strand Magazine entre octubre de 1903 y diciembre de 1904 con ilustraciones originales de Sidney Paget.',
    },
    {
        pdf: 'Biografia_Leonardo_daVinci-CVerdejo.pdf',
        image: imagen3,
        title: 'Biografia de Leonardo daVinci',
        description: 'Leonardo de Vinci es tal vez el más claro ejemplo de espíritu plural que pasó a la inmortalidad. Leonardo de Vinci fue un genio en su época y lo sigue siendo a pesar de los siglos transcurridos. Su inteligencia sutil profundizó en todas las ramas de las ciencias y las artes, sin que ninguna dificultad obstaculizara su camino.',
    },
    {
        pdf: 'El_arte_de_la_guerra-Sun_Tzu.pdf',
        image: imagen13,
        title: 'El arte de la guerra',
        description: 'Escrito por el General y gran estratega militar Sun Tzu en la antigua China es uno de los libros más leídos de toda la historia, y aunque hayan pasado unos 2500 años desde su escritura, sus principios y consejos pueden ser aplicados al ámbito militar, político, empresarial e individual de la actualidad.',
    },
    {
        pdf: 'El_maravilloso_Mago_de_Oz-L._Frank_Baum.pdf',
        image: imagen4,
        title: 'El maravilloso mago de OZ',
        description: 'Dorothy y su perro Totó son llevados por un ciclón desde su casa de Kansas a un país fantástico, y allí en la Ciudad de las Esmeraldas, vive el famoso y poderoso Mago de Oz. En un escenario de cuento de hadas, Dorothy, perseguida por una bruja y deseosa de volver a su casa, encuentra al Espantapájaros, al Leñador de Hojalata y al León Cobarde, personajes que simbolizan aquellos valores de los que creen carecer: el sentido común, la ternura, el valor y la lealtad.',
    },
    {
        pdf: 'El_regreso_de_Sherlock_Holmes-Conan_Doyle_Arthur.pdf',
        image: imagen14,
        title: 'El traje nuevo del emperador',
        description: '"Hace muchos años había un Emperador tan aficionado a los trajes nuevos, que gastaba todas sus rentas en vestir con la máxima elegancia. No se interesaba por sus soldados ni por el teatro, ni le gustaba salir de paseo por el campo, a menos que fuera para lucir sus trajes nuevos. Tenía un vestido distinto para cada hora del día, y de la misma manera que se dice de un rey: "Está en el Consejo", de nuestro hombre se decía: "El Emperador está en el vestuario"',
    },
    {
        pdf: 'El_Necronomicon-H.P_Lovecraft.pdf',
        image: imagen5,
        title: 'El necronomicron',
        description: 'El Necronomicón es descrito como un libro de saberes arcanos y magia ritual, cuya lectura provoca la locura y la muerte. En los cuentos de Lovecraft y sus continuadores aparece como un registro de fórmulas olvidadas que permiten contactar con unas entidades sobrenaturales de un inmenso poder, los Antiguos.',
    },
    {
        pdf: 'La_divina_comedia-Dante_Alighieri.pdf',
        image: imagen15,
        title: 'La divina comedia',
        description: 'La divina comedia es un poema escrito por Dante Alighieri entre 1304 y 1321. Está dividido en tres partes, llamadas cánticas: Infierno, Purgatorio y Paraíso. Cada cántica está a su vez dividida en 33 Cantos, los cuáles sumados y con el canto introductorio hacen un total de 100, considerado un número perfecto. Los cantos nos narran el periplo de Dante, alter ego del poeta, en compañia de los guías Virgilio y Beatriz a través del Infierno, el Purgatorio y el Paraíso. Estos lugares se describen como un conjunto de círculos donde se ubican a las personas según sus hechos y pensamientos en vida.',
    },
    {
        pdf: 'El_mundo_perdido-Conan_Doyle_Arthur.pdf',
        image: imagen6,
        title: 'El mundo perdido',
        description: 'El mundo perdido relata la aventura del joven periodista Ed Malone, que se embarca junto al estrafalario profesor Edward Challenger en una expedición hacia las profundidades de Sudamérica a la búsqueda de monstruos prehistóricos.',
    },
    {
        pdf: 'Bodas_de_Sangre-Garcia_Lorca_Federico.pdf',
        image: imagen7,
        title: 'Bodas de sangre',
        description: 'Una de las obras de teatro más conocidas de Federico García Lorca es "Bodas de sangre", una tragedia que se publicó en el año 1931 y que se inspiró en hechos reales, un crimen que tuvo lugar en Níjar en el 1928. Es una obra que está ambientada en la Andalucía más rural y que, por tanto, es considerada como una auténtica joya del costumbrismo español donde Lorca reúna elementos propios del folklore y la tradición andaluza.',
    },
    {
        pdf: 'Heidi-Johanna_Spyri.pdf',
        image: imagen8,
        title: 'Heidi',
        description: 'Heidi es una niña suiza huérfana, queda al cuidado de su joven tía Dette la cual trabaja en un hotel de Bad Ragaz. Apenas la mujer encuentra una buena oportunidad de trabajo en Fráncfort del Meno, Alemania, lleva a la niña desde Ragáz a vivir a la aldea natal de Dörfli, en la comuna suiza de Maienfeld con su abuelo, a quien no conocía, y a quien los habitantes llamaban "El Viejo de los Alpes", por ser casi un ermitaño.',
    },
    {
        pdf: 'La_llamada_de_Cthulhu-H._P._Lovecraft.pdf',
        image: imagen10,
        title: 'La llamada de Cthulhu',
        description: 'La llamada de Cthulhu da inicio con la muerte de un profesor, cuyos documentos de estudio llegan a manos del personaje principal quién a través de ellos descubre la existencia de Cthulhu, una horrorosa criatura que habita en las profundidades del mar y que es venerada por una sexta. Este ser, descrito como una deidad de gran tamaño caracterizada por una cabeza de pulpo o calamar, permanece dormido en la ciudad sumergida de R’lyeh a la espera de volver a despertar con la ayuda de sus seguidores para imponer su dominio en la Tierra.',
    },
    {
        pdf: 'Don_Quijote_de_la_Mancha-Cervantes_Miguel.pdf',
        image: imagen11,
        title: 'Don Quijote de la Mancha',
        description: 'Don Quijote de la Manchaa es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605, es la obra más destacada de la literatura española y una de las principales de la literatura universal, además de ser la más leída después de la Biblia.'
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
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
    slider: {
        marginTop: 500,
    },
    titulo: {
        marginLeft: 20,
        'font-weight': 'bold',
        'color': '#000',
    },
    link: {
        color: "white",
        "text-decoration": "none",
    }
}));

function Item(props) {
    return (
        <Paper>
            <Image src={props.item.imagen} style={{ width: 180, height: 100, 'object-fit': 'contain', justifyContent: 'center', alignItems: 'center' }} />
        </Paper>
    )
}
export default function MiniDrawer() {
    const classes = useStyles();
    const items = [
        { imagen: imagen11 },
        { imagen: imagen4 },
        { imagen: imagen5 },
    ]

    return (
        <div className={classes.root}>
            <MiDrawer />
            <main className={classes.content}>
                <AppBar />

                <Carousel className={classes.carousel}  >
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
                <Typography variant='h4' className={classes.titulo} >Leídos recientemente</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Populares en Baku</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo} >Tendencias</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Typography variant='h4' className={classes.titulo}>Elegidos por los editores</Typography>
                <Slider className={classes.slider}>
                    {libros.map(movie => (
                        <Slider.Item movie={movie} key={movie.pdf}>item1</Slider.Item>
                    ))}
                </Slider>
                <Footy />
            </main>

        </div>
    );
}
