import * as React from 'react';
import Typography from '@mui/material/Typography';

//GRID
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

//Slider
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Brightness6Icon from '@mui/icons-material/Brightness6';

//COMBOBOX
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//TOOLTIP
import Tooltip from '@mui/material/Tooltip';

const Brillo = () => {
    //TIPO DE LETRA
    const cbTipoColor = ['Ninguno','Negro/Blanco','Sepia','Violeta']
    const [important, setImportant] = React.useState('');

    const [tipoColor2, setTipoColor2] = React.useState<string | null>(cbTipoColor[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [value, setValue] = React.useState<number>(0);
    const [brillo, setBrillo] = React.useState<number>(value*0.01*255);
    const [rojo, setRojo] = React.useState<number>(0);
    const [verde, setVerde] = React.useState<number>(0);
    const [azul, setAzul] = React.useState<number>(0);
    const [opacidad, setOpacidad] = React.useState<number>(0);

    function colores(nuevoValor: string | null) {
        const r = [59,89,118,148,178,207,217,223,229,235];
        const v = [37,55,74,92,111,129,146,164,181,198];
        const a = [11,17,23,29,35,41,68,97,127,157];
        //if (value < 100){
            if (nuevoValor == "Sepia"){
                setRojo(r[Math.trunc(value*0.1)]);
                setVerde(v[Math.trunc(value*0.1)]);
                setAzul(a[Math.trunc(value*0.1)]);
                setImportant("important");
                setOpacidad(1);
            }
            if (nuevoValor == "Negro/Blanco"){
                setRojo(value*0.01*255);
                setVerde(value*0.01*255);
                setAzul(value*0.01*255);
                setImportant("important");
                setOpacidad(1);
            }
            if (nuevoValor == "Violeta"){
                setRojo(value*0.01*202);
                setVerde(value*0.01*103);
                setAzul(value*0.01*456);
                setImportant("important");
                setOpacidad(1);
            }
            if (nuevoValor == "Ninguno"){
                setOpacidad(0);
                setImportant("important");
            }
        //}
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        colores(tipoColor2)
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
                    opacity: ${tipoColor2 == "Ninguno" || tipoColor2 == null?0:1} !${important};
                }
                .rpv-core__text-layer-text {
                    color: rgb(${brilloTexto()},${brilloTexto()},${brilloTexto()}) !${important};
                    opacity: ${tipoColor2 == "Ninguno" || tipoColor2 == null?0:1} !${important};
                }
                
                .rpv-core__text-layer-text::selection{
                    color: green;
                }
                `}
            </style>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                <Grid item xs={4} >
                    <Autocomplete
                        size="small"
                        value={tipoColor2}
                        onChange={(event: any, newValue: string | null) => {
                        setTipoColor2(newValue);
                        console.log(newValue)
                        colores(newValue) //llamarlo en otro lado
                        }}
                        id="controllable-states-demo"
                        options={cbTipoColor}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Tipo de Color" />}
                    />
                </Grid>
                <Grid item xs={4} >
                    <Box sx={{ width: 200 }} >
                        <Typography gutterBottom>
                            Brillo
                        </Typography>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <Tooltip title="Brillo">
                            <Brightness6Icon />
                        </Tooltip>
                        <Slider disabled={tipoColor2 == "Ninguno" || tipoColor2 == null?true:false} aria-label="Volume" value={value} max={99} onChange={handleChange} />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
};

export default Brillo;