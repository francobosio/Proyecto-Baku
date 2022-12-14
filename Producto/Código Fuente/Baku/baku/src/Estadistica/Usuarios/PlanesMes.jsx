import { useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";

const PlanesMes = (props) => {

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
                name: 'Ingresos Plan Anual',
                data: [41000, 36000, 26000, 45000, 48000, 52000, 53000, 41000, 47000, 32000, 22000]
            },
            {
                name: 'Ingresos Plan Mensual',
                data: [85000, 101000, 98000, 87000, 105000, 91000, 114000, 94000, 105000, 86000, 14000]
            }
        ]
        var options = {
            chart: {
                type: 'bar',
                height: 350
            },
            colors: ["#008FFB", "#00E396"],
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
                labels: {
                    style: {
                        fontSize: '14px',
                    },
                },
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
            yaxis: {
                title: {
                    text: 'INGRESOS'
                },
                labels: {
                    formatter: function (val) {
                        return "$" + val;
                    },
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                    return '$' + val
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
                    legend: {
                        fontSize: '11px',
                    }
                },
              }
            ]
        }

        return (
            <div id="Plan" style={{ 
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
export default PlanesMes;