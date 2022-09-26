import * as React from 'react';
import Typography from '@mui/material/Typography';

//GRID
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

//Slider
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';

//TOOLTIP
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

//NEWBRILLO
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

//TIPO DE LETRA
import TipoLetra from './TipoLetra';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

const Brillo = () => {

    //TIPO DE LETRA
    const cbTipoColor = ['Ninguno','Negro/Blanco','Sepia']
    const [tipoColor1, setTipoColor1] = React.useState('Ninguno'); //Después debería mantener la preferencia del usuario

    const [important, setImportant] = React.useState('');
    const [value, setValue] = React.useState<number>(0);

    const [rojo, setRojo] = React.useState<number>(0);
    const [verde, setVerde] = React.useState<number>(0);
    const [azul, setAzul] = React.useState<number>(0);

    function colores(nuevoValor: string) {
        const r = [59,89,118,148,178,207,217,223,229,235];
        const v = [37,55,74,92,111,129,146,164,181,198];
        const a = [11,17,23,29,35,41,68,97,127,157];
        if (nuevoValor == "Sepia"){
            setRojo(r[Math.trunc(value*0.1)]);
            setVerde(v[Math.trunc(value*0.1)]);
            setAzul(a[Math.trunc(value*0.1)]);
            setImportant("important");
        }
        if (nuevoValor == "Negro/Blanco"){
            setRojo(value*0.01*255);
            setVerde(value*0.01*255);
            setAzul(value*0.01*255);
            setImportant("important");
        }
        if (nuevoValor == "Ninguno"){
            setImportant("");
        }
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setTipoColor1(event.target.value as string);
        colores(event.target.value as string)
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        colores(tipoColor1)
    };

    function brilloTexto() {
        if (value < 50)
        {
            return  255;

        }
        return 0;
      }
    
    return (
        <div style={{ marginLeft: '10px'}}>
            <style >
                {
                `.rpv-core__text-layer {
                    background-color: rgb(${rojo},${verde},${azul}) !${important};
                    opacity: ${tipoColor1 == "Ninguno" || tipoColor1 == ''?0:1} !${important};
                }
                .rpv-core__text-layer-text {
                    color: rgb(${brilloTexto()},${brilloTexto()},${brilloTexto()}) !${important};
                    opacity: ${tipoColor1 == "Ninguno" || tipoColor1 == ''?0:1} !${important};
                }
                
                .rpv-core__text-layer-text::selection{
                    color: green;
                }
                `}
            </style>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                <Grid item xs={4} >
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
                <Grid item xs={4} >
                    <Box sx={{ width: 200 }} >
                        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography>
                                Brillo
                            </Typography>
                            <CustomTooltip title={
                                <React.Fragment>
                                    <b>{'Brillo se deshabilitará cuando Tipo de Color sea "Ninguno"'}</b>
                                    <p><b>{'Las palabras resaltadas se deshabilitarán cuando Tipo de Color sea distinto de "Ninguno"'}</b></p>
                                </React.Fragment>
                            }>
                                <ErrorIcon fontSize='small' color="disabled"/>
                            </CustomTooltip>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Tooltip title="Brillo">
                                <Brightness6Icon />
                            </Tooltip>
                            <Slider disabled={tipoColor1 == "Ninguno" || tipoColor1 == ''?true:false} aria-label="Volume" value={value} max={99} onChange={handleChange} />
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <TipoLetra tipoColor1={tipoColor1}/>
                </Grid>
            </Grid>
        </div>
    )
};

export default Brillo;