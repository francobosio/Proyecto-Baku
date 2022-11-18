import { useEffect, useState} from "react";
import * as usuarioService from '../../Sesión/Usuarios/UsuarioService'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(title, dataNumber) {
    return { title, dataNumber};
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "black",
      color: theme.palette.common.white,
      opacity: "0.7"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const Reporte = (props) => {

        const [usuarios, setUsuarios] = useState([])
        const loadUsuarios = async () => {
            const res = await usuarioService.getLeidosPorUsuario();
            setUsuarios(res.data);
        }

        //El codigo del useEffect se renderiza despues de que se haya montado el componente
        useEffect(() => {
            loadUsuarios()
            window.scrollTo(0, 0)
        }, [props.fechaDesde, props.fechaHasta])

        //Con esto renderizamos el gráfico después de que se hayan seteado los libros del Backend en la variable de estado
        var isVisible = false
        if(usuarios.length !== 0){
            isVisible = true
        }

        //Filtramos los libros leidos según las fechas desde y hasta
        usuarios.forEach(usuario => {
            let libros_leidos = usuario.libros_leidos.filter(libro_leido => new Date(libro_leido.creado) >= props.fechaDesde && new Date(libro_leido.creado) <= props.fechaHasta );
            usuario.libros_leidos = libros_leidos
        })

        //Para cada usuario obtenemos la CANTIDAD DE LIBROS LEIDOS en un ARRAY
        var librosLeidosCount = []
        usuarios.forEach(usuario => {
            librosLeidosCount = librosLeidosCount.concat(usuario.libros_leidos.length) 
        })
        //console.log("librosLeidosCount: ")
        //console.log(librosLeidosCount)

        // Calcula el promedio de todos los números
        const calcularPromedio = (values) => {
            const promedio = (values.reduce((sum, current) => sum + current)) / values.length;
            return promedio;
        };

        // Calcula la varianza (Promedio de las desviaciones elevadas al cuadrado) - VARIANZA DE UNA POBLACION
        const calcularVarianza = (values) => {
            const promedio = calcularPromedio(values);
            const cuadradoDif = values.map((value) => {
                const dif = value - promedio;
                return dif * dif;
            });
            //console.log("cuadradoDif: ")
            //console.log(cuadradoDif)
            const varianza = calcularPromedio(cuadradoDif);
            return varianza;
        };

        // Calcula la desviación estándar (Raiz Cuadrada de la varianza - está en unidades de medida que los valores originales)
        //DESVIACION ESTANDAR DE UNA POBLACION
        const calcularDE = (varianza) => {
            return Math.sqrt(varianza);
        };

        if(librosLeidosCount.length !== 0){
            //console.log("🚀 ~ file: Reporte.jsx ~ line 113 ~ Reporte ~ librosLeidosCount", librosLeidosCount)
            var promLibrosLeidosXUsuario = Math.round(calcularPromedio(librosLeidosCount)*100)/100 //Redondeo a 2 decimales
            //console.log("promLibrosLeidosXUsuario: ")
            //console.log(promLibrosLeidosXUsuario)

            // Test
            //const datosTest = [1, 4, 7, 9, 32, 48, 54, 66, 84, 91, 100, 121];
            var varianza = Math.round(calcularVarianza(librosLeidosCount)*100)/100;
            var de = Math.round(calcularDE(calcularVarianza(librosLeidosCount))*100)/100;
            //console.log(`Varianza: ${varianza}`);
            //console.log(`Desviación estándar: ${de}`);

            
        }

        const rows = [
            createData('Promedio de libros leídos por usuario', promLibrosLeidosXUsuario),
            createData('Varianza', varianza),
            createData('Desviación estándar', de),
            createData(`LA MAYORÍA DE LOS USUARIOS ESTÁ LEYENDO ENTRE ${promLibrosLeidosXUsuario - de < 0 ? 0 : Math.round((promLibrosLeidosXUsuario - de)*1)/1} Y ${Math.round((promLibrosLeidosXUsuario + de)*1)/1} LIBROS`),
        ];

        return (
            <div id="Reporte">
                {isVisible && (
                    <div style={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "5.44rem"
                    }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Título</StyledTableCell>
                                        <StyledTableCell align="right">Datos</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {row.title}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.dataNumber}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </div>
        );
}
export default Reporte;