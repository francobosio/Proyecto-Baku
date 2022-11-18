import { useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";

const TiempoDuracionUP = (props) => {
        
        
        const [ejecuto, setEjecuto] = useState(false)
        const loadUsuarios = async () => {;
            setEjecuto(true)
        }

        //El codigo del useEffect se renderiza despues de que se haya montado el componente
        useEffect(() => {
            loadUsuarios()
        }, [])

        //Con esto renderizamos el gráfico después de que se hayan seteado los libros del Backend en la variable de estado
        var isVisible = false
        if(ejecuto){
            isVisible = true
        }
        
        //OPCIONES DEL GRÁFICO
    
        var series = [
            {
                name: 'Meses',
                data: [
                    9, 8, 7, 6, 5,
                    4, 3, 2, 1
                  ]
            }
        ]
        var options = {
            chart: {
                type: 'bar',
                height: 350
            },
            colors: ["#FFC300", "#FF5733"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            grid: {
                row: {
                colors: ['#fff', '#f2f2f2']
                }
            },
            xaxis: {
                title: {
                    text: 'CANTIDAD DE USUARIOS'
                },
                categories: [ 26, 35, 36, 41, 41, 45, 48, 52, 53 ],
            },
            yaxis: {
                title: {
                    text: 'TIEMPO DE DURACIÓN DE SUSCRIPCIÓN'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                    return val
                    }
                }
            }
        }

        return (
            <div id="Bar" style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "1.70rem"
            }}>
                {isVisible && (
                    <ReactApexChart options={options} series={series} type="bar" height={350} width={550}/>
                )}
            </div>
        );
}
export default TiempoDuracionUP;