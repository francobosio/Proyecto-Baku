import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';

//TOOLTIP
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

const TipoLetra = (props: { tipoColor1: string; }) => {

    //TIPO DE LETRA
    const cbTipoLetra = ['Ninguno','sans-serif', 'calibri', 'Comic Sans MS']
    const [tipoLetra2, setTipoLetra2] = React.useState('Ninguno');
    const [scaleX, setScaleX] = React.useState<number>(0);
    const [important, setImportant] = React.useState('');
    const [important2, setImportant2] = React.useState('');

    function scaleXnumber(nuevoValor: string) {
        if (nuevoValor == "sans-serif"){
            setImportant("important");
            setImportant2("");
        }
        if (nuevoValor == "calibri"){
            setScaleX(0.97);
            setImportant("important");
            setImportant2("important");
        }
        if (nuevoValor == "Comic Sans MS"){
            setScaleX(0.85);
            setImportant("important");
            setImportant2("important");
        }
        if (nuevoValor == "Ninguno"){
            setImportant("");
            setImportant2("");
        }
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setTipoLetra2(event.target.value as string);
        scaleXnumber(event.target.value as string);
    };
    
    return (
        <div style={{ marginLeft: '10px'}}>
            <style>
                {   
                    `
                        .rpv-core__text-layer {
                        }
                        .rpv-core__text-layer-text {
                            font-family: "${tipoLetra2}" !${important};
                            transform: scaleX(${scaleX}) !${important2};
                        }
                    `
                }
            </style>
            <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-simple-select-label">Tipo de Letra</InputLabel>
                    <Select
                        disabled={props.tipoColor1 == "Ninguno" || props.tipoColor1 == ''?true:false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo de Letra"
                        defaultValue={tipoLetra2}
                        value={tipoLetra2}
                        onChange={handleChangeSelect}
                    >
                        {cbTipoLetra.map((tipo) => (
                            <MenuItem
                            key={tipo}
                            value={tipo}
                            >
                            {tipo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <CustomTooltip title='Tipo de Letra se deshabilitará cuando Tipo de Color sea "Ninguno"'>
                    <ErrorIcon fontSize='small' color="disabled"/>
                </CustomTooltip>
            </Stack>
            
        </div>
    )
};

export default TipoLetra;