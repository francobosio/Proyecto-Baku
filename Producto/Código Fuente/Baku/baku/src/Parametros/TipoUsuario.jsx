import * as React from 'react';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import * as tipoUsuarioService from '../TipoUsuario/TipoUsuarioService.ts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@material-ui/core/TextField';

export default function ColumnTypesGrid() {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [rows, setRows] = React.useState("");
    const [nombreTipo, setnombreTipo] = React.useState("")
    const [seleccionado, setSeleccionado] = React.useState("");
    const [escritura, setEscritura] = React.useState("");
    const [vacio, setVacio] = React.useState(true);

    const [pageSize, setPageSize] = React.useState(5);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await tipoUsuarioService.getTipoUsuario();
        //cada objeto agregarlo al array
        const rows = res.data.map(row => ({
            id: row._id,
            Nombre: row.nombre,
            ID: row.id,
            //agregar hora y fecha
            "Fecha de creacion": row.createdAt.split("T")[0].split("-").reverse().join("/") + " " + row.createdAt.split("T")[1].split(".")[0],
        }));
        setRows(rows);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    //al selececionar le boton asignar se guarda el id del usuario seleccionado en la variable usuario 


    const handleClickNuevo = async () => {
        setOpen(false);
        const res = await tipoUsuarioService.nuevoTipoUsuario(escritura);
        console.log(res.data);
        //agregar a la grilla el nuevo usuario
        await load();
    }

    const handleClose = () => {
        setOpen(false);
        setOpen2(false);
    };

    const handleEscritura = (event) => {
        let nombre = event.target.value;
        let nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        console.log(nombreFormateado);
        setEscritura(nombreFormateado);
        if (nombreFormateado !== "") {
            return setVacio(false);
        } else {
            return setVacio(true);
        }
    }

    const eliminarTipoUsuari = async (id) => {
        console.log(id)
        await tipoUsuarioService.eliminarTipoUsuario(id);
        //setRows(rows.filter(row => row.id !== id));
    }

    const handleClickOpen2 =  (id,nombre) => {
        console.log(nombre)
            setSeleccionado(id);
            setnombreTipo(nombre);
            setOpen2(true);
    }


    const deleteUser = React.useCallback(
        (seleccionado) => () => {
            setTimeout(() => {
                console.log(seleccionado)
                setOpen2(false);

                setRows((prevRows) => prevRows.filter((row) => row.id !== seleccionado));
                //obtener el nombre del tipo de usuario a eliminar
            });
            eliminarTipoUsuari(seleccionado);
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: 'Nombre', type: 'string', flex: 1, minWidth: 100, },
            { field: 'ID', type: 'string', flex: 0.7, minWidth: 100 },
            { field: 'Fecha de creacion', type: 'string', flex: 1, minWidth: 100 },
            {
                field: 'actions',
                type: 'actions',
                flex: 0.2, minWidth: 50,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleClickOpen2(params.id,params.row.Nombre)}
                    />
                ],
            },
        ],
        [deleteUser],
    );

    return (
        <div style={{ height: '40em', width: '100%' }}>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} sx={{ color: 'info' }} onClick={() => handleClickOpen()} >
                    Agregar Nuevo Tipo
                </Button>
            </Stack>
            <br />
            <DataGrid
                sx={{ height: '40em', width: '100%' }}
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
                        Agregar nuevo tipo de usuario
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre de tipo de usuario"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleEscritura}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleClickNuevo} disabled={vacio}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open2}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Seguro que quiere eliminar el tipo {nombreTipo} ?
                    </DialogTitle>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={deleteUser(seleccionado)}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
