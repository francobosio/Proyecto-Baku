import * as React from 'react';
import { DataGrid, GridActionsCellItem,esES } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService.ts';
import * as tipoUsuarioService from '../TipoUsuario/TipoUsuarioService.ts';
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
import { Redirect } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function ColumnTypesGrid() {
  const [tipoUsuarios, setTipoUsuarios] = React.useState([]);	
  const [usuario, setUsuario] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState("");
  const [idUsuarioRow, setidUsuarioRow] = React.useState("")
  const [seleccionado, setSeleccionado] = React.useState(true);
  
  const [pageSize, setPageSize] = React.useState(5);
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    loadPermisos();
  }, []);
  
  const loadPermisos = async () => {
    const res = await usuarioService.obtenerTodosUsuarios();
    const tipo = await tipoUsuarioService.getTipoUsuario();
    setTipoUsuarios(tipo.data);
    //crear un array de objetos para cada usuario y guardarlo en setRows sincrono 
    let arrayUsuarios = [];
    res.data.map(usuario => {
      let objetoUsuario = {
        id: usuario._id,
        Nombre: usuario.nombre,
        Apellido: usuario.apellido,
        //acceder al campo tipoUsuario[] y guardarlo en el objeto
        Tipo: usuario.tipoUsuario[0].nombre
      }
      arrayUsuarios.push(objetoUsuario);
    })
    setRows(arrayUsuarios);
    console.log(arrayUsuarios);
  }
  

  const handleClickOpen = (id) => {
    setOpen(true);
    setidUsuarioRow(id);
  };
 //al selececionar le boton asignar se guarda el id del usuario seleccionado en la variable usuario 
  const handleClickAsignar = async() => {
    let buscarNombre = tipoUsuarios.find(tipo => tipo.id === usuario);
    //Cambio el id por el nombre del tipoDeUsuario en toda la grilla
    setRows(rows.map(row => {
      if (row.id === idUsuarioRow) {
          row.Tipo = buscarNombre.nombre;
      }
      return row;
    }))
    setOpen(false);
    console.log(idUsuarioRow)
    console.log(usuario)
    localStorage.setItem("tipoUsuario", idUsuarioRow);
    await usuarioService.asignarTipoUsuario(idUsuarioRow, usuario);
    console.log(localStorage.getItem('usuario_id') + usuario)
    if(localStorage.getItem('usuario_id') === idUsuarioRow){
      console.log("entro")
     if ( window.confirm("Al cambiar de tipo de usuario se cerrará la sesión, desea continuar?")) 
      {
        window.location.href = "/";
      }
    }

  }

  const handleClose = () => {
    setOpen(false);
    setSeleccionado(true);
  };

  const handleSeleccionado = (event) => {
    setUsuario(event.target.value);
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
      { field: 'Nombre', type: 'string',flex:1 , minWidth: 20,},
      { field: 'Apellido', type: 'string',flex:1 , minWidth: 20 },
      { field: 'Tipo', type: 'string',flex:1 , minWidth: 20 },
      { field: 'actions',
        type: 'actions',
        flex:0.7 , minWidth: 20,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<ModeEditIcon />}
            label="Toggle Admin"
            //abrir el dialog en el boton toggle admin
            onClick={()=> handleClickOpen(params.id)}

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
                    <option disabled selected value={""}>Seleccione un tipo</option>
                    { tipoUsuarios.map((tipoUsuario) => (
                      //guardar el id de usuario en el campo value
                      <option key={tipoUsuario._id} value={tipoUsuario.id}>
                        {tipoUsuario.nombre}  
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
