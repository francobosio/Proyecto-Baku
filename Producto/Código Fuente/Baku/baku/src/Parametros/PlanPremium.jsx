import * as React from 'react';
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as planPremiumService from '../Premium/premiumService.ts';
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

    const [updateValues, setUpdateValues] = React.useState({'titulo':'', 'descripcion':'','precio':'','url':''})

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
            Titulo: row.titulo,
            Descripcion: row.descripcion,
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
            'descripcion': inputDescripcion.current.value.trim(),
            'precio': inputPrecio.current.value.trim(),
            'urlCobro': inputUrl.current.value.trim(),
        }
        console.log(formData);
        if (esEdicion){
            const res = await planPremiumService.editarPlanPremium(seleccionado, formData);
            console.log(res.data);
            setSeleccionado("")
        } else {
            const res = await planPremiumService.nuevoPlanPremium(formData);
            console.log(res.data);
        }
        setEsEdicion(false);
        await load();
    }

    const handleClose = () => {
        setOpenCreate(false);
        setValido(false);
        setOpenDelete(false);
    };

    const handleEscritura = () => {
        let temp = {}
        temp.titulo = inputTitulo.current.value.trim() !== "" ? "" : "titulo"
        temp.descripcion = inputDescripcion.current.value.trim() !== "" ? "" : "descripcion"
        temp.precio = inputPrecio.current.value.trim() !== "" ? "" : "precio"
        temp.url = inputUrl.current.value.trim() !== "" ? "" : "url"
        setValido(Object.values(temp).every(x => x === ""))
        setUpdateValues({'titulo':'', 'descripcion':'','precio':'','url':''})
    }

    const eliminarPlan = async (id) => {
        console.log(id)
        const res = await planPremiumService.eliminarPlanPremium(id);
        if (res.status == 200){
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        }
    }

    const handleClickOpenDelete =  (id,titulo) => {
        console.log(titulo)
            setSeleccionado(id);
            setTituloPlan(titulo);
            setOpenDelete(true);
    }

    const handleClickOpenUpdate =  (id, titulo, descripcion, precio, url) => {
        setEsEdicion(true);
        setValido(false);
        setSeleccionado(id);
        setUpdateValues({'titulo': titulo,'descripcion': descripcion,'precio': precio,'url': url});
        setOpenCreate(true);
    }

    const deletePlan = React.useCallback(
        (seleccionado) => () => {
            setTimeout(() => {
                console.log(seleccionado)
                setOpenDelete(false);
            });
            eliminarPlan(seleccionado);
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: 'Titulo', type: 'string', flex: 1, minWidth: 100, },
            { field: 'Descripcion', type: 'string', flex: 1, minWidth: 100 },
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
                        onClick={() => handleClickOpenUpdate(params.id, params.row.Titulo, params.row.Descripcion, params.row.Precio, params.row.UrlCobro)}/>
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleClickOpenDelete(params.id, params.row.Titulo)} /></>
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
                            label="Titulo del plan"
                            type="text"
                            fullWidth
                            inputRef={inputTitulo}
                            defaultValue={esEdicion ? updateValues.titulo : ''}
                            variant="standard"
                            onChange={handleEscritura}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="descripcion"
                            label="Descripcion del plan"
                            multiline
                            rows={3}
                            type="text"
                            inputRef={inputDescripcion}
                            defaultValue={esEdicion ? updateValues.descripcion : ''}
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
                            defaultValue={esEdicion ? updateValues.precio : ''}
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
                            defaultValue={esEdicion ? updateValues.url : ''}
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
                        Seguro que quiere eliminar el plan {tituloPlan} ?
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
