import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'


const useStyles = makeStyles({
    fondo:{
        'background': 'linear-gradient(180deg, #076F55 0%, #FFFFFF 100%);'
    },
});

function Registro(){
    const estilos = useStyles();
    return(
        <div className={estilos.fondo}>
            <Container maxWidth="xs">
              
            </Container>
        </div>
    )
};


export default Registro;