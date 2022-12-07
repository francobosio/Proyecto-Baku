import * as React from 'react';
import { DataGrid, GridActionsCellItem,esES } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService.ts';
import * as libroService from '../Libros/LibroService.ts';
import * as denunciaService from '../Denuncia/DenunciaService.ts';
import * as enumLibro from '../Libros/EnumLibros.ts';
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
  const [idLibro, setIdLibro] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState("");
  const [idUsuarioRow, setidUsuarioRow] = React.useState("")
  const [seleccionado, setSeleccionado] = React.useState(true);
  
  const [pageSize, setPageSize] = React.useState(5);
  //crear vector de estados con los campos nombre y id
  const  vectorEstado =[EnumLibros.Publicado, EnumLibros.Cancelado,EnumLibros.Rechazado, EnumLibros.Registrado];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    loadDenuncias();
  }, []);
  
  const loadDenuncias= async () => {
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
      concepto:row.concepto,
      createdAt: row.createdAt,
    }));
    //eliminar los arrays de rows 
    const rows2 = rows.map(row => ({
      id: row.id,
      idLibro: row.idLibro[0],
      idauth0Usuario: row.idauth0Usuario[0],
      Nombre: row.nombre[0],
      Apellido: row.apellido[0],
      "Estado del Usuario": row.estado[0],
      Titulo: row.libroTitulo[0],
      "Estado del Libro": row.libroEstado[0],
      Reclamo:row.concepto,
      //convertir fecha a formato dd/mm/aaaa
      Fecha: row.createdAt.split("T")[0].split("-").reverse().join("/"),
    }));
    setRows(rows2);
  }

  const handleClickOpen = (idLibro,idUsuario) => {
    setOpen(true);
    setIdLibro(idLibro);
    setidUsuarioRow(idUsuario);
  };
 //al selececionar le boton asignar se guarda el id del usuario seleccionado en la variable usuario 
  const handleClickAsignar = async() => {
    setRows(rows.map(row => {
      if (row.idLibro === idLibro) {
          row['Estado del Libro']= denuncia;
      }
      return row;
    }))
    setOpen(false);
    await libroService.putCambiarEstado(idLibro,denuncia);
    
  }
  

  const handleClose = () => {
    setOpen(false);
    setSeleccionado(true);
  };

  const handleSeleccionado = (event) => {
    setDenuncia(event.target.value);
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


  const duplicateUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id);
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    [],
  );

  const columns = React.useMemo(
    () => [
      { field: 'Nombre', type: 'string',flex:0.8, minWidth: 100,},
      { field: 'Apellido', type: 'string',flex:0.8 , minWidth: 100 },
      { field: 'Estado del Usuario', type: 'string',flex:0.8 , minWidth: 100 },
      { field: 'Titulo', type: 'string',flex:1.6 , minWidth: 100 },
      { field: 'Estado del Libro', type: 'string',flex:0.8, minWidth: 100 },
      { field: 'Reclamo', type: 'string',flex:1.6 , minWidth: 140 },
      { field: 'Fecha', type: 'string',flex:0.8 , minWidth: 60 },
      { field: 'actions',
        type: 'actions',
        flex:0.4 , minWidth: 30,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ModeEditIcon />}
            label="Toggle Admin"
            //abrir el dialog en el boton toggle admin
            onClick={()=> handleClickOpen(params.row.idLibro, params.row.idauth0Usuario)}
          />,
        ],
      },
    ],
    [deleteUser],
  );



  return (
    <div style={{ height: 500, width: '100%' }}>
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
          Modificar tipo de usuario
          </DialogTitle>
          <DialogContent>
            
              <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    native
                     onChange={handleSeleccionado}
                    input={<OutlinedInput name="age" id="outlined-age-native-simple" />}> 
                    <option disabled selected value={""}>Seleccione un Estado</option>
                    { vectorEstado.map((estado) => (
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
    </div>

  );
}
