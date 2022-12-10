import React, { useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import * as libroService from '../../Libros/LibroService'
//FECHAS
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

const localeMap = {
    es: esLocale
  }

const ReporteFechas = () => {

        const [locale] = React.useState("es");
        const [value, setValue] = React.useState(new Date());
        const [libros, setlibros] = useState([])
        const [ejecuto, setEjecuto] = useState(false)

        const loadLibros = async () => {
            const valueBack = encodeURIComponent(`${value.getMonth() + 1}/${value.getDate()}/${value.getFullYear()}`)
            const res = await libroService.obtenerLibrosFecha(valueBack, "sinHasta")
            setlibros(res.data)
            setEjecuto(true)
        }

        //El codigo del useEffect se renderiza despues de que se haya montado el componente
        useEffect(() => {
            loadLibros()
            //window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value])

        const obtenerTodosDiasDelMes = (mes, anho) =>
            Array.from(
                { length: new Date(anho, mes, 0).getDate() },
                (_, i) => new Date(anho, mes - 1, i + 1)
        );
        var todosDiasMes = obtenerTodosDiasDelMes(value.getMonth()  + 1 , value.getFullYear())
        //Array Contador - lleno de Ceros 
        var arrayContador = Array.apply(null, Array(todosDiasMes.length)).map(Number.prototype.valueOf,0);
        var isVisible = false
        if(ejecuto){
            isVisible = true
        }

        //Con esto renderizamos el gráfico después de que se hayan seteado los libros del Backend en la variable de estado
        if(libros.length !== 0){

            libros.forEach(libro => {
                var date = new Date(libro.createdAt).getUTCDate();
                arrayContador[date-1] += 1
            })
        }
            
            
        let dias = Array.from({length: todosDiasMes.length}, (_, i) => i + 1);
        //TEST
        //let miarray = Array.from({length: todosDiasMes.length}, () => Math.floor(Math.random() * 10));


        //APEXCHART

        var seriesLibros = [
            {
                name: 'Cantidad de Libros Publicados',
                data: arrayContador
            }
        ];
        
        //OPCIONES DEL GRÁFICO

        //const colors = ["#FFC300","#FF5733","#C70039","#900C3F","#581845","#3D3D6B","#2A7B9B","#00BAAD","#57C785","#ADD45C","#ADD45C"]
    
        var options= {
            chart: {
                type: 'line',
                stacked: true,
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#77B6EA'],
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            stroke: {
                curve: 'smooth'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#fff', '#f2f2f2'], // takes an array which will be repeated on columns
                    opacity: 0.3
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                title: {
                    text: 'DÍAS',
                    offsetY: -20,
                },
                labels: {
                    show: true,
                    minHeight: 100,
                    maxHeight: 130,
                    style: {
                        fontSize: '14px',
                    }
                },
                
                categories: dias,
                tickPlacement: 'on'
            },
            yaxis: {
                title: {
                    text: 'CANTIDAD DE LIBROS PUBLICADOS',
                },
                labels: {
                    show: true,
                },
            },
            responsive: [
              {
                breakpoint: 730,
                options: {
                    chart: {
                        height: 365,
                        width: 320
                    },
                    dataLabels: {
                        style: {
                            fontSize: '7.5px',
                        },
                    },
                    xaxis: {
                        title: {
                            text: 'DÍAS',
                            offsetY: -50,
                            style: {
                                fontSize: '11px',
                            }
                        },
                        labels: {
                            show: true,
                            minHeight: 100,
                            maxHeight: 130,
                            style: {
                                fontSize: '6.9px',
                            }
                        },
                        
                        categories: dias,
                        tickPlacement: 'on'
                    },
                    yaxis: {
                        title: {
                            text: 'CANTIDAD DE LIBROS PUBLICADOS',
                            style: {
                                fontSize: '11px',
                            }
                        },
                    },
                }
              }
            ]
        }
        
        const onKeyDown = (e) => {
            e.preventDefault();
        };

        return (
            <div id="Fechas" style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={localeMap[locale]}>
                    <DatePicker
                        views={['year', 'month']}
                        label="Mes y Año"
                        minDate={new Date('2022-01-02')}
                        maxDate={new Date()}
                        disableFuture={true}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} helperText={null} />}
                    />
                </LocalizationProvider>
                {isVisible && (
                    <div >
                        <ReactApexChart options={options} series={seriesLibros} height={450} width={600}/>
                    </div>
                )}
            </div>
        );
}
export default ReporteFechas;