import React, { useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import * as usuarioService from '../../Sesión/Usuarios/UsuarioService'

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

        //Con esto renderizamos el gráfico después de que se hayan seteado los libros del Backend en la variable de estado
        var isVisible = false
        if(ejecuto){
            isVisible = true
        }

        let count_free_premium = [0, 0]
        usuarios.forEach(usuario => {
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
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }

        return (
            <div id="Bar" style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {isVisible && (
                    <ReactApexChart options={options} series={series} type="pie" height={450} width={550}/>
                )}
            </div>
        );
}
export default DonutChart;