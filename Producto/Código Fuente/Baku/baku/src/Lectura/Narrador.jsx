import React, { useEffect, useState} from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

var estuvoLeyendo = false
var userCancel = false
var jump = false

const Narrador = (props) => {
        //EJEMPLO DE REACT-SPEECH-KIT
        //https://github.com/MikeyParton/react-speech-kit/blob/master/examples/src/useSpeechSynthesis.jsx
    
        const { speak, cancel, speaking, voices } = useSpeechSynthesis(); //NARRADOR
        //const [estadoNarrador , setEstadoNarrador] = useState("En Pausa")
        //const [value, setValue] = React.useState([]);
        const [rate, setRate] = useState(1);

        const [play, setPlay] = React.useState(true);
        const [pause, setPause] = React.useState(false);

        useEffect(() => {

            if(jump){
                let voice = voices.filter(voice => voice.voiceURI === 'Microsoft Helena - Spanish (Spain)')
                if (voice.length === 0)
                {
                    voice = voices.filter(voice => voice.lang === 'es-ES')
                }
                speak({ text: props.textoLibro, voice: voice[0], rate: rate })
                jump = false
            }
            
        }, [props.textoLibro])

        if (speaking){
            estuvoLeyendo = true
        }
        else{
            if(estuvoLeyendo){
                if(userCancel){
                    
                    userCancel = false
                }else{
                    jump = true
                    props.jumpToPage(props.currentPage + 1)
                }
                estuvoLeyendo = false
            }
            userCancel = false
        }

        // if(props.currentPage == props.textoLibro.length - 1)
        // {
        //     userCancel = true
        // }

        const cancelar = () => {
            setPlay(true);
            setPause(false);
            cancel()
            props.setEstadoNarrador("En Pausa")
            userCancel = true
            estuvoLeyendo = false
        }

        const hablar = () => {
            setPlay(false);
            setPause(true);
            let voice = voices.filter(voice => voice.voiceURI === 'Microsoft Helena - Spanish (Spain)')
            if (voice.length === 0)
            {
                voice = voices.filter(voice => voice.lang === 'es-ES')
            }
            speak({ text: props.textoLibro, voice: voice[0], rate: rate })
            props.setEstadoNarrador("Reproduciendo")
        }

        //SE AGREGA PARA QUE ESPERE A QUE SE ELIMINE EL LIBRO Y SE CARGUE EL TEXTO EN VALUE
        // var deshabilitarPlay = true
        // if(props.textoLibro.length != 0){
        //     deshabilitarPlay = false
        // }

        const styleContainerRatePitch = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        };
        const styleVelocidad = {
            display: 'flex',
            flexDirection: 'column',
        };

        return (
            <div id="Narrador" style={{ display: 'flex', justifyContent: "center" }}>
                <style>
                    {   
                        `
                            .rpv-core__text-layer {
                                background-color: rgb(${props.rojo},${props.verde},${props.azul}) !${props.important};
                                opacity: ${props.tipoColor1 === "Ninguno" || props.tipoColor1 === ''?0:1} !${props.important};
                            }
                            .rpv-core__text-layer-text {
                                color: rgb(${props.value <= 50 ? 255 : 0},${props.value <= 50 ? 255 : 0},${props.value <= 50 ? 255 : 0}) !${props.important};
                                opacity: ${props.tipoColor1 === "Ninguno" || props.tipoColor1 === ''?0:1} !${props.important};
                                font-family: "${props.tipoLetra2}" !${props.importantTL};
                                transform: scaleX(${props.scaleX}) !${props.important2};
                            }
                            .rpv-core__text-layer-text::selection{
                                color: white !${props.important};
                            }
                        `
                    }
                </style>
                <Box sx={{ width: 275, border: 1, borderRadius: 1, borderColor: 'text.disabled', marginBottom: 1.75}}>
                    <div style={styleContainerRatePitch}>
                        {/* <Box sx={{ typography: 'body1', textAlign: 'center', m: 0  }}>({props.estadoNarrador})</Box> */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Box sx={{ typography: 'body1', textAlign: 'center', m: 0  }}>Narrador:</Box>
                            <IconButton id="miBoton" variant="text" onClick={hablar} color={play ? "default" : "primary"}>
                                <PlayArrowIcon/>
                            </IconButton>
                            <IconButton className={"pause"} variant="text" onClick={cancelar} color={pause ?"default" : "primary"}>
                                <PauseIcon/>
                            </IconButton>
                        </Box>
                        <div style={styleVelocidad}>
                            <Box sx={{ typography: 'body2', textAlign: 'center', mt: 0.5  }}>Velocidad: {rate}</Box>
                            <Slider 
                                disabled={speaking} 
                                aria-label="Velocidad"
                                defaultValue={1} 
                                value={rate} 
                                min={0.5}
                                max={2}
                                step={0.1} 
                                onChange={(event) => {
                                    setRate(event.target.value);
                                }} 
                            />
                        </div>
                    </div>
                </Box>
            </div>
        );
}
export default Narrador;