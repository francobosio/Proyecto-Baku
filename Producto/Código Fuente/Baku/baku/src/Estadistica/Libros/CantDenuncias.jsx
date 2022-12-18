import ReactApexChart from "react-apexcharts";
import * as denunciaService from '../../Denuncia/DenunciaService.ts';
import {useEffect, useState,} from 'react'
import { Box } from "@mui/system";

const CantDenuncias = (props) => {
        const [ejecuto, setEjecuto] = useState(false)
        const [denuncias, setDenuncias] = useState([]);
    
        const loadDenuncias = async () => {
            const res = await denunciaService.getDenunciasxAutorxlibro();
            setDenuncias(res.data)
            setEjecuto(true)
        }

        const [numeroLibro, setNumeroLibro] = useState(1);
    
        const loadReclamos = async () => {
            const autorRes = await denunciaService.obtenerParametros();
            setNumeroLibro(autorRes.data[0].numeroLibro)
        }

        useEffect(() => {
            loadDenuncias();
            loadReclamos();
        }, []);

        let denunciasfecha = denuncias.filter(denuncia => new Date(denuncia.createdAt) >= props.fechaDesde && new Date(denuncia.createdAt) <= props.fechaHasta);

        var isVisible = false
        let avisoVisible = false
        if(ejecuto){
            if(denunciasfecha.length !== 0){
                isVisible = true
                avisoVisible = false
            }
            else {
                isVisible = false
                avisoVisible = true
            }
        }

        const result = denunciasfecha.map(item => item.libro[0].titulo)

        let arrayDenuncias = []
        result.forEach(element => {
            if(arrayDenuncias.length > 0) {
                if(arrayDenuncias.includes(arrayDenuncias.find( libro => libro.name === element ))){
                    arrayDenuncias[arrayDenuncias.indexOf(arrayDenuncias.find( libro => libro.name === element))].value += 1
                } else {
                    arrayDenuncias.push({name: element, value: 1})
                }
            }
            else {
                arrayDenuncias.push({name: element, value: 1})
            }
        })

        let arrayDenunciasSin10 = arrayDenuncias.filter(element => element.value < numeroLibro)

        arrayDenunciasSin10.sort(function (a, b) {
            if (a.value < b.value) {
              return 1;
            }
            if (a.value > b.value) {
              return -1;
            }
            // a debe ser igual a b
            return 0;
          });

        //LOS 10 LIBROS CON MAS RECLAMOS
        const arrayDenuncias10 = arrayDenunciasSin10.slice(0, 10)
        
        //Agrego esta variable que verifica si exite un valor para el filtro seleccionado
        let librosReclamados = [];
        let cantReclamos = [];
        arrayDenuncias10.forEach(function (elemento) {
            librosReclamados.push(elemento.name);
            cantReclamos.push(elemento.value);
        });

        var series = [
            {
                name: "Cantidad de Reclamos",
                data: cantReclamos
            },
        ]

        //OPCIONES DEL GRÁFICO

        const colors = ["#FFC300","#FF5733","#C70039","#900C3F","#581845","#3D3D6B","#2A7B9B","#00BAAD","#57C785","#ADD45C","#ADD45C"]
    
        var options= {
            chart: {
                type: 'bar',
                stacked: true,
                toolbar: { //Zoom, mover y descargar
                    show: true
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    columnWidth: '50%',
                    distributed: true,  //Distribuye los colores
                    barHeight: '75%',
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: 0,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            legend: {
                show: false
            },
            stroke: {
                width: 2
            },
            grid: {
                row: {
                colors: ['#fff', '#f2f2f2']
                }
            },
            xaxis: {
                title: {
                    text: 'LIBROS',
                    offsetY: -20,
                },
                labels: {
                    show: true,
                    rotate: -65,
                    rotateAlways: true,
                    minHeight: 200,
                    maxHeight: 230,
                    hideOverlappingLabels: false, //No ocultar las etiquetas superpuestas
                    trim: true, //Corta los nombres muy largos en los labels y lo completa con puntos suspensivos ...
                    style: {
                        fontSize: '14px',
                    }
                },
                
                categories: librosReclamados,
                tickPlacement: 'on'
            },
            yaxis: {
                title: {
                    text: 'RECLAMOS',
                },
                labels: {
                    show: true,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
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
                    plotOptions: {
                        bar: {
                            borderRadius: 7,
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '11px',
                        }
                    },
                    xaxis: {
                        title: {
                            text: 'LIBROS',
                            offsetY: -10,
                            style: {
                                textAnchor: 'middle',
                                dominantBaseline: 'auto',
                                fontWeight: '900',
                                fill: 'rgb(55, 61, 63)',
                                fontSize: '11px',
                            }
                        },
                        labels: {
                            minHeight: 20,
                            style: {
                                fontSize: '11px',
                            }
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'RECLAMOS',
                            style: {
                                fontSize: '11px',
                            }
                        },
                    }
                }
              }
            ]
        }

        return (
            <div id="Reclamo" style={{
                height: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {isVisible && (
                    <ReactApexChart options={options} series={series} type="bar" height={489} width={553}/>
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
export default CantDenuncias;