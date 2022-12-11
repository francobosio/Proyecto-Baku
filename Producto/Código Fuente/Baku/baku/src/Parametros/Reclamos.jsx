import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@material-ui/core/TextField';
import * as denunciaService from '../Denuncia/DenunciaService';

export default function ColumnTypesGrid() {
    const [numeroUsuario, setNumeroUsuario] = React.useState(1);
    const [numeroLibro, setNumeroLibro] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [errorUsuario, setErrorUsuario] = React.useState(false);
    const [errorLibro, setErrorLibro] = React.useState(false);

    const loadReclamos = async () => {
        const autorRes = await denunciaService.obtenerParametros();
        console.log(autorRes.data)
        setNumeroUsuario(autorRes.data[0].numeroUsuario)
        setNumeroLibro(autorRes.data[0].numeroLibro)
    }

    React.useEffect(() => {
        loadReclamos()
    }, [])
    

    const handleClickOpen = () => {
        if (!errorUsuario && !errorLibro) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickUsuario = (event) => {
        console.log(event.target.value);
        if (event.target.value > 0) {
            setErrorUsuario(false);
            setNumeroUsuario(event.target.value);
        } else {
            setErrorUsuario(true);
        }
    };

    const handleClickLibro = (event) => {
        console.log(event.target.value);
        if (event.target.value > 0) {
            setErrorLibro(false);
            setNumeroLibro(event.target.value);
        } else {
            setErrorLibro(true);
        }
    };

    const handleGuardar = async () => {
        setOpen(false);
        await denunciaService.guardarParametros(numeroUsuario, numeroLibro);
    };


    return (
        <div style={{ height: '40em', width: '100%' }}>
            <Typography variant="h6" gutterBottom component="div">
                Límite de reclamos a Usuario para el bloqueo automático
            </Typography>
            <Stack direction="row" spacing={7} sx={{ marginTop: '2em' }}>
                <TextField
                    id="standard-number"
                    type="number"
                    label={errorUsuario && "Error"}
                    helperText={errorUsuario && "Solo números positivos"}
                    error={errorUsuario}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={numeroUsuario}
                    onChange={handleClickUsuario}
                    variant="outlined"
                />

            </Stack>
            <br />
            <Typography variant="h6" gutterBottom component="div">
                Límite de reclamos a Libros para el bloqueo automático
            </Typography>
            <Stack direction="row" spacing={7} sx={{ marginTop: '2em' }}>
                <TextField
                    id="standard-number"
                    type="number"
                    label={errorLibro && "Error"}
                    helperText={errorLibro && "Solo números positivos"}
                    error={errorLibro}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={numeroLibro}
                    onChange={handleClickLibro}
                    variant="outlined"
                />
            </Stack>

            <Button variant="outlined" sx={{ color: 'info', height: '4em', width: '28',marginTop: '4.5em'}} onClick={() => handleClickOpen()} >
                Guardar
            </Button>

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        ¿Seguro que quiere guardar el nuevo limite?
                    </DialogTitle>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleGuardar}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

