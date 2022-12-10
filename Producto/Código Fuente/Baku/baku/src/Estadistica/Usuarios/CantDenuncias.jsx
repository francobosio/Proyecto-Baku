import ReactApexChart from "react-apexcharts";
import * as denunciaService from '../../Denuncia/DenunciaService.ts';
import {useEffect, useState,} from 'react'

const CantDenuncias = (props) => {
        const [denuncias, setDenuncias] = useState([]);
    
        const loadDenuncias = async () => {
            const res = await denunciaService.getDenunciasxAutorxlibro();
            setDenuncias(res.data)
        }

        useEffect(() => {
            loadDenuncias();
        }, []);
    
        var colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']

        function trigoSeries(cnt, strength) {
            var data = [];
            for (var i = 0; i < cnt; i++) {
                data.push(Math.round(((Math.cos(i / strength) * (i / strength) + i / strength+1) * (strength*2))*1)/1);
            }
        
            return data;
        }

        function maxArray(array) {
            let max = array[0];
            for (let i = 0; i < array.length; i++) {
                if (array[i + 1] > array[i])    
                    max = array[i + 1]
            }
            return max;
        }

        const arrayDenuncias = trigoSeries(30, 10)
        if (denuncias.length > 0 && arrayDenuncias.length === 30) {
            arrayDenuncias[arrayDenuncias.length - 1] = denuncias.length
        }
     
        var series = [
            {
                name: "Cantidad de Reclamos",
                data: arrayDenuncias
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
                    text: 'CANTIDAD DE RECLAMOS'
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
            responsive: [
                {
                  breakpoint: 730,
                  options: {
                      chart: {
                          height: 290,
                          width: 320
                      },
                      xaxis: {
                          title: {
                              text: 'DÍAS',
                              style: {
                                  fontSize: '11px',
                              }
                          },
                          labels: {
                                rotate: -65,
                                rotateAlways: true,
                                style: {
                                    fontSize: '9px',
                                }
                          },
                      },
                      yaxis: {
                          title: {
                              text: 'CANTIDAD DE RECLAMOS',
                              style: {
                                  fontSize: '11px',
                              }
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
                    <ReactApexChart options={optionsLine} series={series} type="line" height={378} width={550}/>
            </div>
        );
}
export default CantDenuncias;