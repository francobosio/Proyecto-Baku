import * as React from 'react';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService.ts';
import * as libroService from '../Libros/LibroService.ts';
import * as denunciaService from '../Denuncia/DenunciaService.ts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { EnumLibros } from '../Libros/EnumLibros';

export default function ColumnTypesGrid() {
  const [denuncia, setDenuncia] = React.useState("");
  const [estadoUsuario, setestadoUsuario] = React.useState("");
  const [idLibro, setIdLibro] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openEstadoUsuario, setOpenEstadoUsuario] = React.useState(false);
  const [openBorrarReclamo, setOpenBorrarReclamo] = React.useState(false);
  const [rows, setRows] = React.useState("");
  const [idUsuarioRow, setidUsuarioRow] = React.useState("")
  const [seleccionado, setSeleccionado] = React.useState(true);
  const [idDenuncia, setIdDenuncia] = React.useState("");

  const [pageSize, setPageSize] = React.useState(5);
  //crear vector de estados con los campos nombre y id
  const vectorEstado = [EnumLibros.Publicado, EnumLibros.Cancelado, EnumLibros.Rechazado];
  const vectorEstadoUsuario = ["Activo", "Bloqueado"];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    loadDenuncias();
  }, []);

  const loadDenuncias = async () => {
    const res = await denunciaService.getDenunciasxAutorxlibro();

    //cada objeto agregarlo al array
    const rows = res.data.map(row => ({
      id: row._id,
      idLibro: row.libro.map(libro => libro._id),
      idauth0Usuario: row.autor.map(autor => autor.auth0_id),
      nombre: row.autor.map(autor => autor.nombre),
      apellido: row.autor.map(autor => autor.apellido),
      estado: row.autor.map(autor => autor.estado),
      libroTitulo: row.libro.map(libro => libro.titulo),
      libroEstado: row.libro.map(libro => libro.estado),
      concepto: row.concepto,
      reclamosxUsuario: row.reclamosxUsuario,
      reclamosxLibro: row.reclamosxLibro,
      createdAt: row.createdAt,
    }));
    // modificar el campo createdAt 3 horas atras

    const rows2 = rows.map(row => ({
      id: row.id,
      idLibro: row.idLibro[0],
      idauth0Usuario: row.idauth0Usuario[0],
      Nombre: row.nombre[0],
      Apellido: row.apellido[0],
      "Estado Usuario": row.estado[0],
      Titulo: row.libroTitulo[0],
      "Estado Libro": row.libroEstado[0],
      Reclamo: row.concepto,
      "Cant. Reclamos Usuario": row.reclamosxUsuario,
      "Cant. Reclamos Libro": row.reclamosxLibro,
      //convertir fecha a formato dd/mm/aaaa
      Creación: row.createdAt,
    }));
    setRows(rows2);
  }

  const handleClickOpen = (idLibro) => {
    setOpen(true);
    setIdLibro(idLibro);
  };
  const handleClickOpenEstadoUsuario = (idUsuario) => {
    console.log(idUsuario)
    setOpenEstadoUsuario(true);
    setidUsuarioRow(idUsuario);
  };
  const handleClickOpenBorrarReclamo= (id) => {
    setOpenBorrarReclamo(true);
    setIdDenuncia(id);
  };


  //al selececionar le boton asignar se guarda el id del usuario seleccionado en la variable usuario 
  const handleClickAsignar = async () => {
    setRows(rows.map(row => {
      if (row.idLibro === idLibro) {
        row['Estado Libro'] = denuncia;
      }
      return row;
    }))
    setOpen(false);
    await libroService.putCambiarEstado(idLibro,denuncia);
  }

  const handleClickAsignarEstadoUsuario = async () => {
    setRows(rows.map(row => {
      if (row.idauth0Usuario === idUsuarioRow) {
        row['Estado Usuario'] = estadoUsuario;
      }
      return row;
    }))
    setOpenEstadoUsuario(false);
    await usuarioService.putCambiarEstadoUsuario(idUsuarioRow,estadoUsuario); 
  }

  const handleClickBorrarReclamo = async ()=> {
          setRows((prevRows) => prevRows.filter((row) => row.id !== idDenuncia));
          setOpenBorrarReclamo(false);
          await denunciaService.deleteReclamo(idDenuncia); 
      }
  


  const handleClose = () => {
    setOpen(false);
    setOpenEstadoUsuario(false);
    setSeleccionado(true);
    setOpenBorrarReclamo(false);

  };

  const handleSeleccionado = (event) => {
    setDenuncia(event.target.value);
    console.log(event.target.value);
    setSeleccionado(false);
  }

  const handleSeleccionadoEstadoUsuario = (event) => {
    setestadoUsuario(event.target.value);
    console.log(event.target.value);
    setSeleccionado(false);
  }

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  const columns = React.useMemo(
    () => [
      { field: 'Nombre', type: 'string', flex: 0.65, minWidth: 85, },
      { field: 'Apellido', type: 'string', flex: 0.65, minWidth: 90 },
      { field: 'Estado Usuario', type: 'string', flex: 0.8, minWidth: 100 },
      { field: 'actions2',
        type: 'actions',
        flex: 0.2, minWidth: 30,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ModeEditIcon />}
            label="Toggle Admin"
            //abrir el dialog en el boton toggle admin
            onClick={() => handleClickOpenEstadoUsuario(params.row.idauth0Usuario)}
          />,
        ],
      },
      { field: 'Titulo', type: 'string', flex: 1.6, minWidth: 100 },
      { field: 'Estado Libro', type: 'string', flex: 0.8, minWidth: 100 },
      { field: 'actions',
        type: 'actions',
        flex: 0.2, minWidth: 30,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ModeEditIcon />}
            label="Toggle Admin"
            //abrir el dialog en el boton toggle admin
            onClick={() => handleClickOpen(params.row.idLibro)}
          />,
        ],
      },
      { field: 'Reclamo', type: 'string', flex: 1.6, minWidth: 140 },
      { field: 'Cant. Reclamos Usuario', type: 'number', flex: 1.04, aling: 'center', minWidth: 155 },
      { field: 'Cant. Reclamos Libro', type: 'number', flex: 0.95, aling: 'left', minWidth: 155 },
      { field: 'Creación', type: 'string', flex: 0.7, minWidth: 70 },
      { field: 'actions3',
        type: 'actions',
        flex: 0.2, minWidth: 30,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteForeverOutlinedIcon fontSize="large"  />}
            label="Toggle Admin"
            //abrir el dialog en el boton toggle admin
            onClick={() => handleClickOpenBorrarReclamo(params.row.id)}
          />,
        ],
      },
    ],
    [deleteUser],
  );

  return (
    <div style={{ height: '32rem', width: '100%', marginLeft: '1rem' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        //ocultar paginacion
        pagination
      />
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Modificar Estado Libro
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 140 }}>
                <Select
                  native
                  style={{ width: 220 }}
                  onChange={handleSeleccionado}
                  input={<OutlinedInput name="age" id="outlined-age-native-simple" />}>
                  <option disabled selected value={""}>Seleccione un Estado</option>
                  {vectorEstado.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleClickAsignar} disabled={seleccionado}>
              Asignar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openEstadoUsuario}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Modificar Estado del Usuario
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                style={{ width: 220 }}
                  native
                  onChange={handleSeleccionadoEstadoUsuario}
                  input={<OutlinedInput name="estadoUsuario" id="outlined-age-native-simple2" />}>
                  <option disabled selected value={""}>Seleccione un Estado</option>
                  {vectorEstadoUsuario.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleClickAsignarEstadoUsuario} disabled={seleccionado}>
              Asignar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openBorrarReclamo}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
           ¿Está seguro que desea borrar el reclamo?
          </DialogTitle>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleClickBorrarReclamo}>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </div>
  );
}
