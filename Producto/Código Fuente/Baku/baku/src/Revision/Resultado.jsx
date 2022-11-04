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
    'margin': '0',
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
    minHeight: '90vh',
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
    'justifyContent': 'center',
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

//creat new component 
//create new component React to show "no results" if sinMalasPalabras is true 
function SinMalasPalabras() {
  const classes = useStyles();
  return (
    <Container className={classes.sinMalasPalabrasCss}>
      <Typography variant="h5" component="h2" className={classes.sinMalasPalabrasCss}>
        No se encontraron malas palabras
      </Typography>
    </Container>
  )
}

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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const loadLibros = async () => {
    const res = await libroService.getLibroRevisar(id);
    //guardar el libro en el estado sincrono
    setarrayPalbras(res.data.arrayDataMatchCountArray);
    setlibroRevisar(res.data.libroFound);
    setSinMalasPalabras(res.data.sinMalasPalabras)
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
        <Stack spacing={40} direction='row' className={classes.contenedorLibro} >
          <Typography variant="h5" component="h2" className={classes.sinMalasPalabrasCss}>
            {libroRevisar.titulo}
          </Typography>
          <Avatar
            alt="Portada"
            variant="rounded"
            src={libroRevisar.imagenPath}
            sx={{ width: '10%', height: '20%' }}
          />
        </Stack>
      </Container>
    )
  }

  const handleCloseDialog = () => {
    setabrirDialog(false);
  };
  const handleCloseDialogAceptarPublicar = () => {
    libroService.putCambiarEstado(id, "Publicado");
    history.push('/Revision');
    setabrirDialog(false);
  };
  const handleCloseDialogAceptarRechazar = () => {
    libroService.putCambiarEstado(id, "Rechazado");
    history.push('/Revision');
    setabrirDialog(false);
  };

  return (
    <>
      <AppBarLectura />
      <br></br>
      <br></br>
      <Container maxWidth="lg" className={classes.fondo}>
        <Typography variant='h4' className={classes.titulo} >Revisión de malas palabras </Typography>
        {(libroRevisar.titulo === "") ? <CircularProgress className={classes.CircularProgress} /> : <LibroRevisar />}

        <br></br>
        {sinMalasPalabras ? <SinMalasPalabras className={classes.sinMalasPalabrasCss} /> :
          <TableContainer component={Paper} className={classes.root}>

            <Table sx={{ minWidth: 650 }} aria-label="simple table" className={classes.root}>
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
        <Stack direction="row" spacing={6} justifyContent="flex-end" className={classes.stack}>
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
          fullScreen={fullScreen}
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
