import React, { useEffect, useState, Component } from "react";
import ReactApexChart from "react-apexcharts";
import * as usuarioService from '../Sesión/Usuarios/UsuarioService'
import { makeStyles } from '@material-ui/core/styles';

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

const Reporte = () => {

        const classes = useStyles();

        const [usuarios, setUsuarios] = useState([])
        const loadUsuarios = async () => {
            const res = await usuarioService.getLeidosPorUsuario();
            console.log("Usuarios: res.data");
            console.log(res.data);
            setUsuarios(res.data);
            console.log(usuarios);
        }

        //El codigo del useEffect se renderiza despues de que se haya montado el componente
        useEffect(() => {
            loadUsuarios()
            window.scrollTo(0, 0)
        }, [])

        //Con esto renderizamos el gráfico después de que se hayan seteado los libros del Backend en la variable de estado
        var isVisible = false
        if(usuarios.length != 0){
            isVisible = true
        }

        //Para cada usuario obtenemos la CANTIDAD DE LIBROS LEIDOS en un ARRAY
        var librosLeidosCount = []
        usuarios.forEach(usuario => {
            librosLeidosCount = librosLeidosCount.concat(usuario.libros_leidos.length) 
        })
        console.log("librosLeidosCount: ")
        console.log(librosLeidosCount)

        // Calcula el promedio de todos los números
        const calcularPromedio = (values) => {
            const promedio = (values.reduce((sum, current) => sum + current)) / values.length;
            return promedio;
        };

        // Calcula la varianza (Promedio de las desviaciones elevadas al cuadrado)
        const calcularVarianza = (values) => {
            const promedio = calcularPromedio(values);
            const cuadradoDif = values.map((value) => {
                const dif = value - promedio;
                return dif * dif;
            });
            console.log("cuadradoDif: ")
            console.log(cuadradoDif)
            const varianza = calcularPromedio(cuadradoDif);
            return varianza;
        };

        // Calcula la desviación estándar (Raiz Cuadrada de la varianza - está en unidades de medida que los valores originales)
        const calcularDE = (varianza) => {
            return Math.sqrt(varianza);
        };

        if(librosLeidosCount.length != 0){
            var promLibrosLeidosXUsuario = Math.round(calcularPromedio(librosLeidosCount)*100)/100 //Redondeo a 2 decimales
            console.log("promLibrosLeidosXUsuario: ")
            console.log(promLibrosLeidosXUsuario)

            // Test
            const datosTest = [1, 4, 7, 9, 32, 48, 54, 66, 84, 91, 100, 121];
            var varianza = Math.round(calcularVarianza(librosLeidosCount)*100)/100;
            var de = Math.round(calcularDE(calcularVarianza(librosLeidosCount))*100)/100;
            console.log(`Varianza: ${varianza}`);
            console.log(`Desviación estándar: ${de}`);
        }
        

        

        return (
            <div id="Reporte">
                {isVisible && (
                    <div style={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                    }}>
                        <h3 className={classes.title3}>Promedio de libros leidos por usuario: {promLibrosLeidosXUsuario}</h3>
                        <h3 className={classes.title3}>Varianza: {varianza}</h3>
                        <h3 className={classes.title3}>Desviación estándar: {de}</h3>
                    </div>
                )}
            </div>
        );
}
export default Reporte;