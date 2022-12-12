import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import * as libroService from '../Libros/LibroService';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBarLectura from '../AppBar/AppBarLectura';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'
import * as notificacionService from '../Notificacion/NotificacionService'
import Footy from '../Footy/Footy.jsx';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    //ocultar scroll vertical del navegador 
    'background': '#99cfbf'
  },
  imageList: {
    width: "100%",
    "margin-bottom": "10px !important",
  },
  titulo: {
    "font": "200% sans-serif",
    "margin-top": "1rem",
    "marginBottom": "1rem",
    'font-weight': 'bold',
    "padding-left": "0",
    color: "black",
  },
  //efecto de girar icono de libro leido y no leido en la tabla de resultados de la revision de libros 
  sinMalasPalabrasCss: {
    "font": "200% sans-serif",
    "margin-top": "1rem",
    "marginBottom": "1rem",
    'font-weight': 'bold',
    "padding-left": "0",
    color: "black",
    background: '#99cfbf',
    "background-color": '#99cfbf',
  },
  boton: {
    'font-weight': 'bold',

    'display': 'flex',
    'color': '#FFFFFF',
    'fontSize': '1rem',
    'background-color': '#3a7a6f',
    'width': '15.5rem',
    '&:hover': {
      'background': '#076F55',
      'color': '#FFFFFF',
    },
  },
  fondo: {
    // ocupar toda la pantalla
    minHeight: '95vh',
    width: '100vh',
  },
  stack: {
    'margin-top': '2rem',
    'margin-bottom': '1rem',
  },
  CircularProgress: {
    'color': '#076F55',
    //cambiar el color del fondo del circulo
  },
  //elementos alineados por la mitad del contenedor 
  contenedorLibro: {
    'display': 'flex',
    justifyContent: 'space-around',
    'alignItems': 'center',
  },

}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 20,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
  //hide border of table
  border: 'none',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

}));

export default function BasicTable() {
  let history = useHistory();
  let idTabla = 0;
  const classes = useStyles();
  const [arrayPalabras, setarrayPalbras] = useState([])
  const [libroRevisar, setlibroRevisar] = useState("")
  const [sinMalasPalabras, setSinMalasPalabras] = useState(false)
  const { id } = useParams();
  const [textoDialog, settextoDiaglo] = useState("");
  const [abrirDialog, setabrirDialog] = React.useState(false);
  const theme = useTheme();
  const [autorAth0, setAutorAth0] = useState("")
  const [libro, setLibro] = useState("")

  const loadLibros = async () => {
    const res = await libroService.getLibroRevisar(id);
    setarrayPalbras(res.data.arrayDataMatchCountArray);
    setlibroRevisar(res.data.libroFound);
    setSinMalasPalabras(res.data.sinMalasPalabras)
    setLibro(res.data)
    setAutorAth0(res.data.libroFound.usuario)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    loadLibros();
  }, []);
  //crear funcion que cuente para idTabla
  const contadorId = () => {
    idTabla++;
    return idTabla;
  }

  //crear componente que muestre el libro a revisar 
  const LibroRevisar = () => {
    const classes = useStyles();
    return (
      <Container >
        <Stack spacing={0} direction='row' className={classes.contenedorLibro} >
          <Typography variant="h5" component="h2" className={classes.sinMalasPalabrasCss}>
            {libroRevisar.titulo}
          </Typography>
          <Avatar
            alt="Portada"
            variant="rounded"
            src={libroRevisar.imagenPath}
            sx={{ width: '15%', height: '10%' }}
          />
        </Stack>
      </Container>
    )
  }

  const handleCloseDialog = () => {
    setabrirDialog(false);
  };
  const handleCloseDialogAceptarPublicar = async () => {
    const aliasAutor = libroService.putCambiarEstado(id, "Publicado");
    const idData = {
      'auth0id': autorAth0,
      'idLibro': id
    };

    const nuevaNotificacion = {
      'auth0usuario': autorAth0,
      'titulo': "El usuario " + libro.libroFound.alias + " ha subido:",
      'descripcion': libro.libroFound.titulo,
      'avatar': localStorage.getItem("avatar"),
      'tipo': "subidaLibro",
      'esNoleido': true,
      'id_libro': id,
    }
    setabrirDialog(false);
    await usuarioService.usuarioLibroCargado(idData);
    await notificacionService.createNotificacion(nuevaNotificacion);
    history.push('/Revision');

  };
  const handleCloseDialogAceptarRechazar = async () => {
    const usuario = await usuarioService.getUsuario(autorAth0);
    await libroService.putCambiarEstado(id, "Rechazado");
    setabrirDialog(false);
    history.push('/Revision');
    var from = 'Baku <bakulibros@gmail.com>';
    var to = usuario.data.correo_electronico;
    console.log(usuario.data.correo_electronico);
    var subject = 'Libro rechazado';
    var mensajeCuerpo = `Hola ${libro.libroFound.alias}. Le enviamos este email desde Baku para informarle que su libro fue rechazado por tener palabras prohibidas en Baku.
    Recuerde que puede volver a subir su libro una vez que haya corregido las palabras prohibidas.
    <br>
    Si usted considera que esto se trata de un error o equivocación, puede contactarnos a través de nuestras redes sociales y analizaremos su caso si así lo amerita.
    <br>
    Desde ya, muchas gracias.`;
    await libroService.putEnviarRechazo(from, to, subject, mensajeCuerpo, arrayPalabras);
  };

  return (
    <>
      <AppBarLectura />
      <br></br>
      <br></br>
      <Container maxWidth="xl" className={classes.fondo}>
        <Typography variant='h4' className={classes.titulo} sx={{ marginTop: '1em', fontWeight: 'bold' }} >Revisión de malas palabras </Typography>
        {(libroRevisar.titulo === "") ? <CircularProgress className={classes.CircularProgress} /> : <LibroRevisar />}

        <br></br>
        {sinMalasPalabras ?
          <Container sx={{ backgroundColor: '#499b8d' }}>
            <Typography variant="h5" component="h2" className={classes.sinMalasPalabrasCss} sx={{ backgroundColor: '#499b8d', marginTop: '3em', marginBottom: '3em', fontWeight: 'bold' }}>
              No se encontraron malas palabras
            </Typography>
          </Container>
          :
          <TableContainer component={Paper} className={classes.root}>

            <Table aria-label="simple table" className={classes.root}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" width={200} >ID</StyledTableCell>
                  <StyledTableCell align="center" width={450}>Palabra</StyledTableCell>
                  <StyledTableCell align="center">Número de ocurrencias</StyledTableCell>
                </TableRow>
              </TableHead>
              {/* si sinMalasPalabras es true no mostrar TableBody y mostrar un nuevo componente que diga que no hay malas palabras */}

              <TableBody>

                {(arrayPalabras.length > 0 || sinMalasPalabras) ? arrayPalabras.map((row) => (
                  <StyledTableRow
                    key={row.idTabla}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell align="center" component="th" scope="row">{contadorId()}</StyledTableCell>
                    <StyledTableCell align="center">{row[0]}</StyledTableCell>
                    <StyledTableCell align="center">{row[1]}</StyledTableCell>
                  </StyledTableRow>
                ))
                  :
                  <StyledTableRow>
                    <StyledTableCell align="center"><CircularProgress size={50} className={classes.CircularProgress} /></StyledTableCell>
                    <StyledTableCell align="center"><CircularProgress size={50} className={classes.CircularProgress} /></StyledTableCell>
                    <StyledTableCell align="center"><CircularProgress size={50} className={classes.CircularProgress} /></StyledTableCell>
                  </StyledTableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>

        }
        <Stack direction="row" spacing={6} justifyContent="center" sx={{ marginBottom: "4em", marginTop: "2.5em" }} className={classes.stack}>
          <Button className={classes.boton} onClick={() => {
            history.push('/Revision');
          }}>
            Cancelar</Button>
          <Button className={classes.boton} onClick={() => {
            setabrirDialog(true)
            settextoDiaglo("¿Está seguro que quiere RECHAZAR este libro?")
          }}>
            Rechazar</Button>
          <Button className={classes.boton} onClick={() => {
            setabrirDialog(true)
            settextoDiaglo("¿Está seguro que quiere APROBAR este libro?")
          }}>
            Aprobar
          </Button>
        </Stack>
        {/* CODIGO PARA EL DIALOG */}
        {abrirDialog && <Dialog
          open={abrirDialog}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{textoDialog}</DialogTitle>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => {
              if (textoDialog === "¿Está seguro que quiere APROBAR este libro?") {
                handleCloseDialogAceptarPublicar()
              } else {
                handleCloseDialogAceptarRechazar()
              }
            }} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        }
      </Container>
    </>
  )
}
