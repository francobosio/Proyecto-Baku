import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
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

const TipoLetra = (props: { tipoColor1: string; value: number; rojo: number; verde: number; azul: number; important: string; tipoLetra2: string;
    setTipoLetra2: (arg: string) => void; scaleX: number; setScaleX: (arg: number) => void; importantTL: string; setImportantTL: (arg: string) => void; 
    important2: string; setImportant2: (arg: string) => void;}) => {

    //TIPO DE LETRA
    const cbTipoLetra = ['Ninguno','Sans-serif', 'Calibri', 'Comic Sans MS']
    //const [tipoLetra2, setTipoLetra2] = React.useState('Ninguno');
    // const [scaleX, setScaleX] = React.useState<number>(0);
    // const [importantTL, setImportantTL] = React.useState('');
    // const [important2, setImportant2] = React.useState('');

    function scaleXnumber(nuevoValor: string) {
        if (nuevoValor == "Sans-serif"){
            props.setImportantTL("important");
            props.setImportant2("");
        }
        if (nuevoValor == "Calibri"){
            props.setScaleX(0.97);
            props.setImportantTL("important");
            props.setImportant2("important");
        }
        if (nuevoValor == "Comic Sans MS"){
            props.setScaleX(0.85);
            props.setImportantTL("important");
            props.setImportant2("important");
        }
        if (nuevoValor == "Ninguno"){
            props.setImportantTL("");
            props.setImportant2("");
        }
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        props.setTipoLetra2(event.target.value as string);
        scaleXnumber(event.target.value as string);
    };
    
    return (
        <div style={{ marginLeft: '10px'}}>
            <style>
                {   
                    `
                        .rpv-core__text-layer {
                            background-color: rgb(${props.rojo},${props.verde},${props.azul}) !${props.important};
                            opacity: ${props.tipoColor1 == "Ninguno" || props.tipoColor1 == ''?0:1} !${props.important};
                        }
                        .rpv-core__text-layer-text {
                            color: rgb(${props.value <= 50 ? 255 : 0},${props.value <= 50 ? 255 : 0},${props.value <= 50 ? 255 : 0}) !${props.important};
                            opacity: ${props.tipoColor1 == "Ninguno" || props.tipoColor1 == ''?0:1} !${props.important};
                            font-family: "${props.tipoLetra2}" !${props.importantTL};
                            transform: scaleX(${props.scaleX}) !${props.important2};
                        }
                        .rpv-core__text-layer-text::selection{
                            color: white !${props.important};
                        }
                    `
                }
            </style>
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
                <CustomTooltip title='Tipo de Letra se deshabilitará cuando Tipo de Color sea "Ninguno"'>
                    <ErrorIcon fontSize='small' color="disabled"/>
                </CustomTooltip>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-simple-select-label">Tipo de Letra</InputLabel>
                    <Select
                        disabled={props.tipoColor1 == "Ninguno" || props.tipoColor1 == ''?true:false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo de Letra"
                        defaultValue={props.tipoLetra2}
                        value={props.tipoLetra2}
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
            </Stack>
            
        </div>
    )
};

export default TipoLetra;