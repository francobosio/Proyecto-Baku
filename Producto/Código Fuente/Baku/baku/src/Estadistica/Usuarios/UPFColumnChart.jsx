import { useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";

const UPFColumnChart = (props) => {

        const [ejecuto, setEjecuto] = useState(false)
        const loadUsuarios = async () => {
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
        
        //OPCIONES DEL GRÁFICO
    
        var series = [
            {
                name: 'Usuarios Premium',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 47, 32]
            },
            {
                name: 'Usuarios Free',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 105, 86]
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
            legend: {
                show: true,
                fontSize: '16px',
                offsetY: 21,
                height: 50,
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
                    text: 'MESES'
                },
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
            yaxis: {
                title: {
                    text: 'CANTIDAD DE USUARIOS'
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
            },
            responsive: [
              {
                breakpoint: 730,
                options: {
                    chart: {
                        height: 290,
                        width: 320
                    },
                }
              }
            ]
        }

        return (
            <div id="Bar" style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {isVisible && (
                    <ReactApexChart options={options} series={series} type="bar" height={415} width={550}/>
                )}
            </div>
        );
}
export default UPFColumnChart;