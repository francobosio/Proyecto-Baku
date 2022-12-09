import * as React from 'react';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as planPremiumService from '../premiumService.ts';
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
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [rows, setRows] = React.useState("");
    const [tituloPlan, setTituloPlan] = React.useState("")
    const [seleccionado, setSeleccionado] = React.useState("");
    const [esEdicion, setEsEdicion] = React.useState(false);

    const [updateValues, setUpdateValues] = React.useState({'titulo':'', 'descripción':'','precio':'','url':''})

    const [valido, setValido] = React.useState(false);
    const inputTitulo = React.useRef("");
    const inputDescripcion = React.useRef("");
    const inputPrecio = React.useRef("");
    const inputUrl = React.useRef("");

    const [pageSize, setPageSize] = React.useState(5);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await planPremiumService.getPlanesPremium();
        //cada objeto agregarlo al array
        const rows = res.data.map(row => ({
            id: row._id,
            Título: row.titulo,
            Descripción: row.descripción,
            Precio: row.precio,
            UrlCobro: row.urlCobro
        }));
        setRows(rows);
    }

    const handleClickOpen = () => {
        setOpenCreate(true);
    };


    const handleClickNuevo = async () => {
        setOpenCreate(false);
        setValido(false);
        const formData = {
            'titulo': inputTitulo.current.value.trim(),
            'descripción': inputDescripcion.current.value.trim(),
            'precio': inputPrecio.current.value.trim(),
            'urlCobro': inputUrl.current.value.trim(),
        }
        if (esEdicion){
            const res = await planPremiumService.editarPlanPremium(seleccionado, formData);
            setSeleccionado("")
        } else {
            const res = await planPremiumService.nuevoPlanPremium(formData);
        }
        setEsEdicion(false);
        await load();
    }

    const handleClose = () => {
        setOpenCreate(false);
        setValido(false);
        setOpenDelete(false);
        setEsEdicion(false);
        setUpdateValues({'titulo':'', 'descripción':'','precio':'','url':''})
    };

    const handleEscritura = () => {
        let temp = {}
        temp.titulo = inputTitulo.current.value.trim() !== "" ? "" : "titulo"
        temp.descripcion = inputDescripcion.current.value.trim() !== "" ? "" : "descripción"
        temp.precio = inputPrecio.current.value.trim() !== "" ? "" : "precio"
        temp.url = inputUrl.current.value.trim() !== "" ? "" : "url"
        setValido(Object.values(temp).every(x => x === ""))
        setUpdateValues({'titulo':'', 'descripción':'','precio':'','url':''})
    }

    const eliminarPlan = async (id) => {
        const res = await planPremiumService.eliminarPlanPremium(id);
        if (res.status === 200){
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        }
    }

    const handleClickOpenDelete =  (id,titulo) => {
        setSeleccionado(id);
        setTituloPlan(titulo);
        setOpenDelete(true);
    }

    const handleClickOpenUpdate =  (id, titulo, descripcion, precio, url) => {
        setEsEdicion(true);
        setValido(false);
        setSeleccionado(id);
        setUpdateValues({'titulo': titulo,'descripción': descripcion,'precio': precio,'url': url});
        setOpenCreate(true);
    }

    const deletePlan = React.useCallback(
        (seleccionado) => () => {
            setTimeout(() => {
                setOpenDelete(false);
            });
            eliminarPlan(seleccionado);
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: 'Título', type: 'string', flex: 1, minWidth: 100, },
            { field: 'Descripción', type: 'string', flex: 1, minWidth: 100 },
            { field: 'Precio', type: 'string', flex: 1, minWidth: 100 },
            { field: 'UrlCobro', type: 'string', flex: 1, minWidth: 100 },
            {
                field: 'actions',
                type: 'actions',
                flex: 0.2, minWidth: 50,
                getActions: (params) => [
                    <><GridActionsCellItem
                        icon={<EditIcon />}
                        label="Update"
                        onClick={() => handleClickOpenUpdate(params.id, params.row.Título, params.row.Descripción, params.row.Precio, params.row.UrlCobro)}/>
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleClickOpenDelete(params.id, params.row.Título)} /></>
                ],
            },
        ],
        [deletePlan],
    );

    return (
        <div style={{ height: '40em', width: '100%' }}>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} sx={{ color: 'info' }} onClick={() => handleClickOpen()} >
                    Agregar Nuevo Plan
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
                pagination
            />
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openCreate}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Crear nuevo Plan Premium
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="titulo"
                            label="Título del plan"
                            type="text"
                            fullWidth
                            inputRef={inputTitulo}
                            defaultValue={updateValues.titulo}
                            variant="standard"
                            onChange={handleEscritura}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="descripción"
                            label="Descripción del plan"
                            multiline
                            rows={3}
                            type="text"
                            inputRef={inputDescripcion}
                            defaultValue={updateValues.descripción}
                            fullWidth
                            variant="standard"
                            onChange={handleEscritura}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="precio"
                            label="Precio del plan"
                            type="number"
                            inputRef={inputPrecio}
                            defaultValue={updateValues.precio}
                            fullWidth
                            variant="standard"
                            onChange={handleEscritura}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="urlCobro"
                            label="Url de mercado pago"
                            type="text"
                            inputRef={inputUrl}
                            defaultValue={updateValues.url}
                            fullWidth
                            variant="standard"
                            onChange={handleEscritura}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleClickNuevo} disabled={!valido}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openDelete}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        ¿Está seguro que desea eliminar el plan "{tituloPlan}"?
                    </DialogTitle>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={deletePlan(seleccionado)}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
