import React, { useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import * as usuarioService from '../../Sesión/Usuarios/UsuarioService'
import { Box } from "@mui/system";

const DonutChart = (props) => {
        
        
        const [ejecuto, setEjecuto] = useState(false)

        const [usuarios, setUsuarios] = useState([])
        const loadUsuarios = async () => {
            const res = await usuarioService.obtenerTodosUsuarios();
            setUsuarios(res.data);
            setEjecuto(true)
        }

        //El codigo del useEffect se renderiza despues de que se haya montado el componente
        useEffect(() => {
            loadUsuarios()
            window.scrollTo(0, 0)
        }, [])
        
        let usuariosfecha = usuarios.filter(usuario => new Date(usuario.createdAt) >= props.fechaDesde && new Date(usuario.createdAt) <= props.fechaHasta && usuario.tipoUsuario[0].id !== '3');

        //Con esto renderizamos el gráfico después de que se hayan seteado los libros del Backend en la variable de estado
        var isVisible = false
        let avisoVisible = false
        if(ejecuto){
            if(usuariosfecha.length !== 0){
                isVisible = true
                avisoVisible = false
            }
            else {
                isVisible = false
                avisoVisible = true
            }
        }


        let count_free_premium = [0, 0]
        usuariosfecha.forEach(usuario => {
            if (parseInt(usuario.tipoUsuario[0].id) === 2) {
                count_free_premium[0] += 1
            } 
            else {
                if (parseInt(usuario.tipoUsuario[0].id) === 1){
                    count_free_premium[1] += 1
                }
            }
        })
        
        //OPCIONES DEL GRÁFICO

        const colors = ["#FFC300","#FF5733","#C70039","#900C3F","#581845","#3D3D6B","#2A7B9B","#00BAAD","#57C785","#ADD45C","#ADD45C"]
    
        var series = count_free_premium
        var options = {
            chart: {
                width: 380,
                type: 'pie',
            },
            colors: colors,
            labels: ['Usuarios Premium', 'Usuarios Free'],
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '16px',
            },
            responsive: [{
                breakpoint: 730,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom',
                        fontSize: '15px',
                    }
                }
            }]
        }

        return (
            <div id="Donut" style={{
                height: "465px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {isVisible && (
                    <ReactApexChart options={options} series={series} type="pie" height={450} width={550}/>
                )}
                {avisoVisible && (
                    <Box sx={{ 
                            width: "75%",
                            m: 2,
                            p: 1,  
                            border: 2, 
                            borderRadius: 1, 
                            borderColor: 'red',
                            typography: 'body1', 
                            textAlign: 'center',
                            color: 'red',
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            marginBottom: "3.75rem"
                        }}>
                        NO EXISTEN DATOS PARA EL RANGO DE FECHA SELECCIONADO
                    </Box>
                )}

            </div>
        );
}
export default DonutChart;