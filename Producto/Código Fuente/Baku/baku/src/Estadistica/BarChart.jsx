import React, { useEffect, useState, Component } from "react";
import ReactApexChart from "react-apexcharts";
import * as libroService from '../Libros/LibroService'

const BarChart = () => {

        const [libros, setlibros] = useState([])
        const loadLibros = async () => {
            const res = await libroService.obtenerLibros();
            //console.log(res.data);
            setlibros(res.data);
        }

        //El codigo del useEffect se renderiza despues de que se haya montado el componente
        useEffect(() => {
            loadLibros()
            window.scrollTo(0, 0)
        }, [])

        //Con esto renderizamos el gráfico después de que se hayan seteado los libros del Backend en la variable de estado
        var isVisible = false
        if(libros.length != 0){
            isVisible = true
        }
        //console.log("libros")
        //console.log(libros)
        //console.log("isVisible")
        //console.log(isVisible)

    
        //Array de TODOS LOS GENEROS que hay en todos los libros
        var array1 = []
        libros.forEach(libro => {
            array1 = array1.concat(libro.genero)
        })
        //console.log(array1)
    
        //Crea un array de generos unicos
        const unique = array1
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
        //console.log(unique);
    
        //Crea el array donde cada objeto es un genero (name) con su cantidad de libros (value)
        let generos = [];
        unique.forEach(function (elemento, indice, array) {
            const generoCount = {
                name: elemento,
                value: array1.countCertainElements(elemento) //For Each para contar 
            };
            generos.push(generoCount);
        });
        
        generos.sort(function (a, b) {
            if (a.value < b.value) {
              return 1;
            }
            if (a.value > b.value) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
        
        //console.log(generos);
    
        const sumall = generos.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        
        let generosCategorias = [];
        let generosData = [];
        generos.forEach(function (elemento, indice, array) {
            generosCategorias.push(elemento.name);
            generosData.push(Math.round(elemento.value*100/sumall*100)/100);
        });
        //console.log(generosCategorias);
        //console.log(generosData);    
    
        var seriesGeneros = [
            {
                name: 'Porcentaje de Libros',
                data: generosData
            }
        ];
        
        //OPCIONES DEL GRÁFICO

        const colors = ["#FFC300","#FF5733","#C70039","#900C3F","#581845","#3D3D6B","#2A7B9B","#00BAAD","#57C785","#ADD45C","#ADD45C"]
    
        var options2= {
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
                    horizontal: true,
                    distributed: true,  //Distribuye los colores
                    barHeight: '75%',
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetX: 0,
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
                    text: 'PORCENTAJE DE LIBROS',
                },
                labels: {
                    show: true,
                    formatter: function (val) {
                      return val + "%";
                    }
                },
                
                categories: generosCategorias,
                tickPlacement: 'on'
            },
            yaxis: {
                title: {
                    text: 'GÉNEROS',
                },
                labels: {
                    show: true,
                    rotateAlways: true,
                    minHeight: 100,
                    maxHeight: 150,
                    formatter: function (val) {
                        if (isNaN(val)) {
                            return val;
                            }
                        return val + "%";
                    },
                    style: {
                        fontSize: '14px',
                    }
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
            }
        }

        return (
            <div id="Bar">
                {isVisible && (
                    <ReactApexChart options={options2} series={seriesGeneros} type="bar" height={450} width={600}/>
                )}
            </div>
        );
}
export default BarChart;