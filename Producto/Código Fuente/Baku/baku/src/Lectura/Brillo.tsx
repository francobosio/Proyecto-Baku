import * as React from 'react';
import Typography from '@mui/material/Typography';

//GRID
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

//Slider
import Stack from '@mui/material/Stack';
import ErrorIcon from '@mui/icons-material/Error';

//TOOLTIP
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

//NEWBRILLO
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

//ALERTA
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//BUTTONS
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

//HIJO A PADRE
interface IChildtoParentProps {
    tipoColor1: string,
    setTipoColor1: (arg: string) => void,
    value: number,
    setValue: (arg: number) => void,
    rojo: number,
    setRojo: (arg: number) => void,
    verde: number,
    setVerde: (arg: number) => void,
    azul: number,
    setAzul: (arg: number) => void,
    important: string,
    setImportant: (arg: string) => void,
    tipoLetra2: string,
    scaleX: number,
    importantTL: string,
    important2: string,
}

const Brillo: React.FC<IChildtoParentProps> = ({tipoColor1, setTipoColor1, value, setValue, rojo, setRojo, verde, setVerde, azul, setAzul, important, setImportant, tipoLetra2, scaleX, importantTL, important2}) => {

    //TIPO DE LETRA
    const cbTipoColor = ['Ninguno','Negro/Blanco','Sepia']
    //const [tipoColor1, setTipoColor1] = React.useState('Ninguno'); //Después debería mantener la preferencia del usuario
    

    //const [important, setImportant] = React.useState('');
    //const [value, setValue] = React.useState<number>(0);

    //const [rojo, setRojo] = React.useState<number>(0);
    //const [verde, setVerde] = React.useState<number>(0);
    //const [azul, setAzul] = React.useState<number>(0);

    function colores(nuevoValor: string) {
        const r = [29,59,89,118,148,178,207,217,223,229,235];
        const v = [18,37,55,74,92,111,129,146,164,181,198];
        const a = [5,11,17,23,29,35,41,68,97,127,157];
    
        if (nuevoValor === "Sepia"){
            setRojo(r[Math.trunc(value*0.1)]);
            setVerde(v[Math.trunc(value*0.1)]);
            setAzul(a[Math.trunc(value*0.1)]);
            setImportant("important");
        }
        if (nuevoValor === "Negro/Blanco"){
            setRojo(Math.round(value*0.01*255));
            setVerde(Math.round(value*0.01*255));
            setAzul(Math.round(value*0.01*255));
            setImportant("important");
        }
        if (nuevoValor === "Ninguno"){
            setImportant("");
        }
    }

    React.useEffect(() => {
        colores(tipoColor1)
    }, [value])

    

    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState: SnackbarOrigin) => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setTipoColor1(event.target.value as string);
        colores(event.target.value as string)
        if(event.target.value !== "Ninguno")
        {
            handleClick({
                vertical: 'bottom',
                horizontal: 'right',
              })
        }
            
    };

    const resta = () => {
        if (value > 0) {
            setValue(value - 10);
        }   
    };

    const suma = () => {
        if (value < 100) {
            setValue(value + 10);
        }
    };

    return (
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: "center" , justifyContent: "center"}}>
            <style >
                {
                `.rpv-core__text-layer {
                    background-color: rgb(${rojo},${verde},${azul}) !${important};
                    opacity: ${tipoColor1 === "Ninguno" || tipoColor1 === ''?0:1} !${important};
                }
                .rpv-core__text-layer-text {
                    color: rgb(${value <= 50 ? 255 : 0},${value <= 50 ? 255 : 0},${value <= 50 ? 255 : 0}) !${important};
                    opacity: ${tipoColor1 === "Ninguno" || tipoColor1 === ''?0:1} !${important};
                    font-family: "${tipoLetra2}" !${importantTL};
                    transform: scaleX(${scaleX}) !${important2};
                }
                
                .rpv-core__text-layer-text::selection{
                    color: white !${important};
                }
                `}
            </style>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justifyContent="center">
                <Grid container item xs={12} md={6} xl={6} justifyContent="center">
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-simple-select-label">Tipo de Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tipo de Color"
                            defaultValue={tipoColor1}
                            value={tipoColor1}
                            onChange={handleChangeSelect}
                        >
                            {cbTipoColor.map((tipo) => (
                                <MenuItem
                                key={tipo}
                                value={tipo}
                                >
                                {tipo}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item xs={12} md={6} xl={6} justifyContent="center">
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Box sx={{ width: 220, borderBottom: 1, borderColor: 'text.disabled', marginBottom: 0.5}}>
                            <Stack spacing={1} direction="row" sx={{ ml: 1 , mr: 2}} alignItems="center">
                                <Typography>
                                    Brillo:
                                </Typography>
                                <IconButton disabled={tipoColor1 === "Ninguno" || tipoColor1 === ''?true:false} onClick={resta}>
                                    <RemoveCircleIcon/>
                                </IconButton>
                                <Box sx={{ border: 1, borderRadius: 1, borderColor: 'text.disabled', typography: 'body1', textAlign: 'center', width: '100rem'  }}>
                                    {value}
                                </Box>
                                <IconButton disabled={tipoColor1 === "Ninguno" || tipoColor1 === ''?true:false} onClick={suma}>
                                    <AddCircleIcon/>
                                </IconButton>
                            </Stack>
                        </Box>
                        <CustomTooltip title={
                            <React.Fragment>
                                <b>{'Brillo se deshabilitará cuando Tipo de Color sea "Ninguno"'}</b>
                                <p><b>{'Las palabras resaltadas se deshabilitarán cuando Tipo de Color sea distinto de "Ninguno"'}</b></p>
                            </React.Fragment>
                        }>
                            <ErrorIcon fontSize='small' color="disabled"/>
                        </CustomTooltip>
                    </Stack>
                </Grid>
            </Grid>
            
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                autoHideDuration={4000}
                action={action}
            >
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Los Marcadores se visualizarán cuando Tipo de Color sea Ninguno
                </Alert>
            </Snackbar>
        </div>
    )
};

export default Brillo;