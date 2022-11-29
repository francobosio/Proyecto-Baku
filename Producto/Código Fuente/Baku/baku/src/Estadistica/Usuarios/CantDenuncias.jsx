import ReactApexChart from "react-apexcharts";

const CantDenuncias = (props) => {

        // the default colorPalette for this dashboard
        //var colorPalette = ['#01BFD6', '#5564BE', '#F7A600', '#EDCD24', '#F74F58'];
        var colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']

        function trigoSeries(cnt, strength) {
            var data = [];
            for (var i = 0; i < cnt; i++) {
                data.push(Math.round(((Math.cos(i / strength) * (i / strength) + i / strength+1) * (strength*2))*1)/1);
            }
        
            return data;
        }

        // function sumatoriaArray(array) {
        //     let sum = 0;
        //     for (let i = 0; i < array.length; i++) {
        //         sum += array[i]
        //     }
        //     return Math.round(sum*100)/100;
        // }

        function maxArray(array) {
            let max = array[0];
            for (let i = 0; i < array.length; i++) {
                if (array[i + 1] > array[i])    
                    max = array[i + 1]
            }
            return max;
        }
    
        var series = [
            {
                name: "Cantidad de Denuncias",
                data: trigoSeries(30, 10)
            },
        ]

        var optionsLine = {
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                stroke: {
                    width: 4,
                    curve: 'smooth'
                },
            },
            colors: colorPalette,
            title: {
                floating: false,
                text: `CANTIDAD ACTUAL: ${String(Math.round(series[0].data.at(-1)*100)/100)}`,
                align: 'center',
                style: {
                    //color: '#222',
                    fontSize: '15px'
                }
            },
            markers: {
                size: 1
            },
            grid: {
                row: {
                    colors: ['#fff', '#f2f2f2']
                }
            },
            xaxis: {
                title: {
                    text: 'DÍAS'
                },
                labels: {
                    show: true
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                title: {
                    text: 'CANTIDAD DE DENUNCIAS'
                },
                tickAmount: 2,
                labels: {
                    show: true
                },
                axisBorder: {
                    show: true,
                },
                axisTicks: {
                    show: false
                },
                min: 0,
                max: maxArray(series[0].data) + 10
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetY: -20,
                offsetX: -30
            },

        
        }

        return (
            <div id="Bar" style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                    <ReactApexChart options={optionsLine} series={series} type="line" height={378} width={550}/>
            </div>
        );
}
export default CantDenuncias;