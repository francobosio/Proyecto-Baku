import * as React from 'react';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService.ts';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    titulo: {
        "font": "200% sans-serif",
        "margin-top": "1rem",
        "marginBottom": "2rem",
        'font-weight': 'bold',
        "padding-left": "0",
        color: "black",
    },
}));

export default function ColumnTypesGrid() {
  const classes = useStyles();
  
  const [rows, setRows] = React.useState("");
  const [pageSize, setPageSize] = React.useState(5);

  React.useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    const res = await usuarioService.obtenerUsuariosSuscriptos(localStorage.getItem("usuario_activo"));
    //cada objeto agregarlo al array
    const rows = res.data.map(row => ({
      id: row._id,
      auth0_id: row.auth0_id,
      Usuario: row.usuario!==undefined?row.usuario:"Invitado",
      Cantidaddepublicaciones: row.libros_publicados!==undefined?row.libros_publicados.length:0,
      Suscriptores: row.suscriptores.length,
      Creado: row.createdAt
    }
    ));
    //if rows contiene un objeto con el tipo de usuario "Administrador" entonces eliminarlo del array 
    //eliminar los arrays de rows 
    const rows2 = rows.map(row => ({
      id: row.id,
      auth0Id: row.auth0_id,
      Usuario: row.Usuario,
      "Cantidad de publicaciones": row.Cantidaddepublicaciones,
      Suscriptores: row.Suscriptores,
      //convertir fecha a formato dd/mm/aaaa
      "Fecha de creación": row.Creado.split("T")[0].split("-").reverse().join("/"),
    }));
    setRows(rows2);
  }
  //al selececionar le boton asignar se guarda el id del usuario seleccionado en la variable usuario 

  const columns = React.useMemo(
    () => [
      { field: 'Usuario', type: 'string', flex: 1, minWidth: 100, },
      { field: 'Fecha de creación', type: 'string', flex: 1, minWidth: 100 },
      { field: 'Cantidad de publicaciones', type: 'string', flex: 1, minWidth: 100 },
      { field: 'Suscriptores', type: 'string', flex: 1, minWidth: 100 },
      {
        field: 'actions',
        type: 'actions',
        flex: 0.4, minWidth: 30,
        getActions: (params) => [
          
          <Link class="content__link"  to={`/AutorId/` +  params.row.id} >
          <GridActionsCellItem
            icon={<SearchIcon fontSize="large"  sx={{ color:'black' }} />}
            label="Ir a perfil"
            //abrir el dialog en el boton toggle admin
            />
           </Link>  
            ,
        ],
      },
    ],
    [],
  );

  return (
    <Container fixed >
      <Typography variant='h4' className={classes.titulo}> Suscripciones </Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{ minHeight: '35rem',marginBottom:'2rem' }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        //ocultar paginacion

        pagination
      />
    </Container>

  );
}
