import * as React from 'react';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService.ts';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function ColumnTypesGrid() {
  const [rowss, setRows] = React.useState("");

  const [pageSize, setPageSize] = React.useState(5);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    const res = await usuarioService.obtenerTodosUsuarios();
    //cada objeto agregarlo al array
    const rows = res.data.map(row => ({
      id: row._id,
      auth0_id: row.auth0_id,
      Usuario: row.usuario !== undefined ? row.usuario : "Invitado",
      Tipo: row.tipoUsuario[0].nombre,
      Cantidaddepublicaciones: row.libros_publicados !== undefined ? row.libros_publicados.length : 0,
      Suscriptores: row.suscriptores.length,
      Creado: row.createdAt
    }
    ));
    //if rows contiene un objeto con el tipo de usuario "Administrador" entonces eliminarlo del array 
    /*  let rows3 = rows.filter(row => row.Tipo !== "Administrador"); */

    //eliminar los arrays de rows 
    const rows2 = rows.map(row => ({
      id: row.id,
      auth0Id: row.auth0_id,
      Usuario: row.Usuario,
      Tipo: row.Tipo,
      "Cantidad de publicaciones": row.Cantidaddepublicaciones,
      Suscriptores: row.Suscriptores,
      //convertir fecha a formato dd/mm/aaaa
      Creado: row.Creado.split("T")[0].split("-").reverse().join("/"),
    }));
    //filtrar los usuarios que son tipo 3 (Administrador)
    var localTipoUsuario = localStorage.getItem("tipoUsuario");
    (localTipoUsuario === "1" || localTipoUsuario === "2") ? setRows(rows2.filter(row => row.Tipo !== "Administrador")) : setRows(rows2);
    console.log(rowss)
  }

  //al selececionar le boton asignar se guarda el id del usuario seleccionado en la variable usuario 



  const columns = React.useMemo(
    () => [
      { field: 'Usuario', type: 'string', flex: 1, minWidth: 100, },
      { field: 'Tipo', type: 'string', flex: 1, minWidth: 100, },
      { field: 'Creado', type: 'string', flex: 1, minWidth: 100 },
      { field: 'Cantidad de publicaciones', type: 'string', flex: 1, minWidth: 100 },
      { field: 'Suscriptores', type: 'string', flex: 1, minWidth: 100 },
      {
        field: 'actions',
        type: 'actions',
        flex: 0.4, minWidth: 30,
        getActions: (params) => [
          <Link class="content__link" to={`/AutorId/` + params.row.id} >
            <GridActionsCellItem
              icon={<SearchIcon fontSize="large" sx={{ color: 'black' }} />}
              label="Ir a perfil" />
          </Link>
          ,
        ],
      },
    ],
    [],
  );



  return (
    <div style={{ height: '32rem', width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rowss}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        //ocultar paginacion

        pagination
      />
    </div>

  );
}
