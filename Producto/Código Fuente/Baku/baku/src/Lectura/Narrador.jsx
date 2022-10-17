import React, { useEffect, useState} from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Box from '@mui/material/Box';

var estuvoLeyendo = false
var userCancel = false
var jump = false

const Narrador = (props) => {
        //EJEMPLO DE REACT-SPEECH-KIT
        //https://github.com/MikeyParton/react-speech-kit/blob/master/examples/src/useSpeechSynthesis.jsx
    
        const { speak, cancel, speaking, voices } = useSpeechSynthesis(); //NARRADOR
        const [estadoNarrador , setEstadoNarrador] = useState("En Pausa")
        //const [value, setValue] = React.useState([]);

        useEffect(() => {

            if(jump){
                const timer = setTimeout(() => {
                    speak({ text: props.textoLibro[props.currentPage], voice: voices[0], rate: 0.64  })
                    
                    jump = false
                }, 100);
                return () => clearTimeout(timer);
            }
            
        }, [props.currentPage])

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

        if(props.currentPage == props.textoLibro.length - 1)
        {
            userCancel = true
        }

        const cancelar = () => {
            cancel()
            setEstadoNarrador("En Pausa")
            userCancel = true
            estuvoLeyendo = false
        }

        const hablar = () => {
            speak({ text: props.textoLibro[props.currentPage], voice: voices[0], rate: 0.64 })
            setEstadoNarrador("Reproduciendo")
        }

        //SE AGREGA PARA QUE ESPERE A QUE SE ELIMINE EL LIBRO Y SE CARGUE EL TEXTO EN VALUE
        var deshabilitarPlay = true
        if(props.textoLibro.length != 0){
            deshabilitarPlay = false
        }

        return (
            <div id="Narrador">
                    <Box sx={{ display: 'flex', justifyContent: 'center', border: 1, borderRadius: 1, borderColor: 'text.disabled'}}>
                        <Box sx={{ typography: 'body1', textAlign: 'center', m: 1  }}>Narrador:</Box>
                        <IconButton variant="text" disabled={deshabilitarPlay} onClick={hablar}>
                            <PlayArrowIcon/>
                        </IconButton>
                        <IconButton className={"pause"} variant="text" onClick={cancelar}>
                            <PauseIcon/>
                        </IconButton>
                        <Box sx={{ typography: 'body1', textAlign: 'center', m: 1  }}>({estadoNarrador})</Box>
                    </Box>
            </div>
        );
}
export default Narrador;