import React, { useEffect, useState, Component, useRef } from "react";
import * as libroService from '../Libros/LibroService';
import { makeStyles } from '@material-ui/core/styles';
import { useSpeechSynthesis } from "react-speech-kit";
import { flushSync } from 'react-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
    title3: {
        paddingTop: '30px',
        margin: '0',
        fontSize: '30px',
        color: '#333',
    },
    title2: {
        paddingTop: '5px',
        margin: '0',
        fontSize: '30px',
        color: '#333',
    }
}));

var estuvoLeyendo = false
var userCancel = false
var jump = false

const Narrador = (props) => {

        console.log(props.currentPage)
        console.log("render")
        

        const classes = useStyles();

        const [value, setValue] = useState(""); //TEXTO DEL NARRADOR
        //const [jump, setJump] = useState(false); 
        const { speak, cancel, speaking } = useSpeechSynthesis(); //NARRADOR
        


        //TRAE EL TEXTO DE LA PAGINA ACTUAL
        const loadLibros = async () => {
            const res = await libroService.getLibroNarrador(props.idLibro, props.currentPage, props.titulo);
            console.log(res.data)
            setValue(res.data.arrayLimpio)
        }

        //El codigo del useEffect se renderiza despues de que se haya montado el componente
        useEffect(() => {
            loadLibros()
        }, [])

        useEffect(() => {
            console.log(jump)
            if(jump){
                const timer = setTimeout(() => {
                    console.log("Hello, World!")
                    speak({ text: value[props.currentPage] })
                    //setJump(false)
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
                    console.log("SALTAR")
                    jump = true
                    props.jumpToPage(props.currentPage + 1)
                    // props.setContadorSeteado(true)
                    
                }
                estuvoLeyendo = false
            }
            userCancel = false
        }

        console.log("estuvoLeyendo: " + estuvoLeyendo,"userCancel: " + userCancel)

        if(props.currentPage == value.length - 1)
        {
            userCancel = true
        }
        console.log(props.currentPage, value.length - 1)

        const cancelar = () => {
            cancel()
            userCancel = true
            estuvoLeyendo = false
        }

        const hablar = () => {
            speak({ text: value[props.currentPage] })
        }

        return (
            <div id="Narrador">
                    <Box sx={{ display: 'flex', justifyContent: 'center', border: 1, borderRadius: 1, borderColor: 'text.disabled'}}>
                        <Box sx={{ typography: 'body1', textAlign: 'center', m: 1  }}>Narrador:</Box>
                        <IconButton variant="text" disabled={false} onClick={hablar}>
                            <PlayArrowIcon/>
                        </IconButton>
                        <IconButton className={"pause"} variant="text" onClick={cancelar}>
                            <PauseIcon/>
                        </IconButton>
                    </Box>
            </div>
        );
}
export default Narrador;