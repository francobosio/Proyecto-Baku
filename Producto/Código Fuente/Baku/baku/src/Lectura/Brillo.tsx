import * as React from 'react';
//RADIO
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//GRID
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

//Slider
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Brightness6Icon from '@mui/icons-material/Brightness6';

const Brillo = () => {
    const [tipoColor, setTipoColor] = React.useState('nb');
    const handleChangeTipoColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoColor((event.target as HTMLInputElement).value);
    };

    const [value, setValue] = React.useState<number>(0);
    const [brillo, setBrillo] = React.useState<number>(value*0.01*255);
    const [rojo, setRojo] = React.useState<number>(0);
    const [verde, setVerde] = React.useState<number>(0);
    const [azul, setAzul] = React.useState<number>(0);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        const r = [59,89,118,148,178,207,217,223,229,235];
        const v = [37,55,74,92,111,129,146,164,181,198];
        const a = [11,17,23,29,35,41,68,97,127,157];
            //setRojo(value*0.01*255);
        if (value < 100){
            if (tipoColor == "sepia"){
                setRojo(r[Math.trunc(value*0.1)]);
                setVerde(v[Math.trunc(value*0.1)]);
                setAzul(a[Math.trunc(value*0.1)]);
            }
            if (tipoColor == "nb"){
                setRojo(value*0.01*255);
                setVerde(value*0.01*255);
                setAzul(value*0.01*255);
            }
            
            
        }
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
                background-color: rgb(${rojo},${verde},${azul}) !important;
                opacity: 1 !important;
                }
                .rpv-core__text-layer-text {
                    color: rgb(${brilloTexto()},${brilloTexto()},${brilloTexto()}) !important;
                }
                
                .rpv-core__text-layer-text::selection{
                    color: green;
                }
                `}
            </style>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                <Grid item xs={4} >
                    <FormControl component="fieldset">
                        <FormLabel component="legend" style={{ fontWeight: 'bold'}}>Tipo de Color</FormLabel>
                        <RadioGroup row aria-label="gender" name="gender1" value={tipoColor} onChange={handleChangeTipoColor}>
                            <FormControlLabel value="nb" control={<Radio />} label="Negro/Blanco" />
                            <FormControlLabel value="sepia" control={<Radio />} label="Sepia" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={4} >
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Brightness6Icon />
                            <Slider aria-label="Volume" value={value} onChange={handleChange} />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
};

export default Brillo;