import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Estadistica.css';
import AppBarNos from '../AppBar/AppBar.js';
import Footy from '../Footy/Footy.jsx';
import {MiDrawer} from "../Drawer/Drawer.jsx"

//GRAFICOS
import BarChart from './Libros/BarChart.jsx';
import ColumnChart from './Libros/ColumnChart.jsx';
import Reporte from './Libros/Reporte';
import ReporteFechas from './Libros/ReporteFechas';
import DonutChart from './Usuarios/DonutChart'
import UPFColumnChart from './Usuarios/UPFColumnChart';
import TiempoDuracionUP from './Usuarios/TiempoDuracionUP';
import CantDenuncias from './Usuarios/CantDenuncias';

//FECHAS
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

//TAB
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//GRID
import Grid from '@mui/material/Grid';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const localeMap = {
    es: esLocale
  }

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        'background': '#99cfbf',
        width: "100%",
        position: "relative" //Se posiciona en base a su contenedor - (Posicionar en base a otro elemento)
    },
    content: {
        width: '90%',
        [theme.breakpoints.down('1200')]: {
            width: '92%' ,
        },
        'background': '#99cfbf',
        right: "0",
        position: 'absolute',
        paddingBottom: '12em',
        minHeight: '100vh'
    },
    title2: {
        paddingTop: '5px',
        margin: '0',
        fontSize: '30px',
        color: '#333',
    },
    container: {
        display: "flex",
        margin: '0',
        fontSize: '1 rem',
        fontFamily: "Roboto",
        backgroundColor: '#076F55',
        color: "white",
        width: '100%',
        textAlign: "center",
        minHeight: "48px",
        alignItems: "center",
        verticalAlign: "middle",
        justifyContent: "center",

    },
    tabs: {
        'background': '#076F55',
    },
}));

export default function Estadistica() {

    const classes = useStyles();

    //Contador de un determinado elemento en un Array
    // eslint-disable-next-line no-extend-native
    Array.prototype.countCertainElements = function (value) {
        return this.filter((arrayElement) => arrayElement === value).length;
    };

    const [locale] = React.useState("es");
    const [fechaDesde, setFechaDesde] = React.useState(new Date( new Date().getFullYear(), new Date().getMonth(), 1));
    const [fechaHasta, setFechaHasta] = React.useState(new Date());
    
    // TABS
    const [valueTab, setValueTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    const onKeyDown = (e) => {
        e.preventDefault();
    };
    

    return (
        <div className={classes.root}>
            <MiDrawer pestaña={9}/>
            <main className={classes.content}>
                <AppBarNos />
                <Box className={classes.container}>
                      REPORTE DE ESTADÍSTICAS
                </Box>
                <Box sx={{ width: '100%' }}>
                    <AppBar position="static">
                        <style>
                            {   
                                `
                                    .MuiTabs-indicator {
                                        background-color: #519A88;
                                    }
                                    .css-119x4c3-MuiButtonBase-root-MuiTab-root.Mui-selected {
                                        opacity: 1;
                                        background-color: #83B7AA;
                                        color: #076F55;
                                        font-weight: bold;
                                    }
                                    .css-119x4c3-MuiButtonBase-root-MuiTab-root {
                                        font-size: 1rem !important
                                    }
                                `
                            }
                        </style>
                        <Tabs
                            className={classes.tabs}
                            value={valueTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                        <Tab label="LIBROS"{...a11yProps(0)} wrapped/>
                        <Tab label="USUARIOS" {...a11yProps(1)} wrapped/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={valueTab} index={0}>
                        <h1 className="title">REPORTE DE ESTADÍSTICAS DE LIBROS</h1>
                        <div className="filtros" 
                            style={{ 
                                display: "flex",
                                justifyContent: "center",
                                width: "100%"
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={localeMap[locale]}>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    label="Fecha Desde"
                                    minDate={new Date('2022-10-02')}
                                    maxDate={fechaHasta}
                                    disableFuture={true}
                                    value={fechaDesde}
                                    onChange={(newValue) => {
                                        setFechaDesde(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} helperText={null} />}
                                />
                            </LocalizationProvider>
                            <div style={{ width: "1rem" }}></div>
                            <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={localeMap[locale]}>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    label="Fecha Hasta"
                                    minDate={fechaDesde}
                                    maxDate={new Date()}
                                    disableFuture={true}
                                    value={fechaHasta}
                                    onChange={(newValue) => {
                                        setFechaHasta(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} helperText={null} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="chartsA" 
                            style={{ 
                                display: "flex",
                                justifyContent: "space-around",

                        }}>
                            <Grid container alignItems="flex-start">
                                <Grid container item xs={12} justifyContent="center" alignItems="center">
                                    <div className="chart1" 
                                        style={{ 
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                    }}>
                                        <h3 className="title3">Porcentaje del total de libros <br/> publicados por género</h3>
                                        
                                        <BarChart 
                                            fechaDesde={fechaDesde}
                                            fechaHasta={fechaHasta}
                                        />
                                    </div>
                                </Grid>
                                <Grid container item xs={12} justifyContent="center" alignItems="center">
                                    <div className="chart2" >
                                        <h3 className="title3">Ranking - 10 libros más leídos</h3>
                                        <ColumnChart 
                                            fechaDesde={fechaDesde}
                                            fechaHasta={fechaHasta}
                                            />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="chartsB" 
                            style={{ 
                                display: "flex",
                                justifyContent: "space-around",
                                marginTop: "4rem"
                        }}>
                            <Grid container alignItems="flex-start">
                                <Grid container item xs={12} justifyContent="center" alignItems="center">
                                    <div className="chart3" 
                                        style={{ 
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            height: 450,
                                            width: 600
                                    }}>
                                        <h3 className="title3">Libros leídos por usuario</h3>
                                        <Reporte 
                                            fechaDesde={fechaDesde}
                                            fechaHasta={fechaHasta}
                                        />
                                    </div>
                                </Grid>
                                <Grid container item xs={12} justifyContent="center" alignItems="center">
                                    <div className="chart4" 
                                        style={{ 
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            height: 600,
                                            width: 600
                                    }}>
                                        <h3 className="title3">Cantidad de Libros Publicados por Día</h3>
                                
                                        <ReporteFechas />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </TabPanel>
                    <TabPanel value={valueTab} index={1}>
                        <h1 className="title">REPORTE DE ESTADÍSTICAS DE USUARIOS</h1>
                        <div className="filtros" 
                            style={{ 
                                display: "flex",
                                justifyContent: "center",
                                width: "100%"
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={localeMap[locale]}>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    label="Fecha Desde"
                                    minDate={new Date('2022-06-02')}
                                    maxDate={fechaHasta}
                                    disableFuture={true}
                                    value={fechaDesde}
                                    onChange={(newValue) => {
                                        setFechaDesde(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} helperText={null} />}
                                />
                            </LocalizationProvider>
                            <div style={{ width: "1rem" }}></div>
                            <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={localeMap[locale]}>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    label="Fecha Hasta"
                                    minDate={fechaDesde}
                                    maxDate={new Date()}
                                    disableFuture={true}
                                    value={fechaHasta}
                                    onChange={(newValue) => {
                                        setFechaHasta(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} onKeyDown={onKeyDown} helperText={null} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="chartsC" 
                            style={{ 
                                display: "flex",
                                justifyContent: "space-around",

                        }}>
                            <Grid container alignItems="flex-start">
                                <Grid container item xs={12} justifyContent="center" alignItems="center">
                                    <div className="chart1" 
                                        style={{ 
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            height: 450,
                                            width: 600
                                    }}>
                                        <h3 className="title3">Porcentaje de Usuarios Premium <br/> y Usuarios Free</h3>
                                        <DonutChart 
                                            fechaDesde={fechaDesde}
                                            fechaHasta={fechaHasta}
                                        />
                                    </div>
                                </Grid>
                                <Grid container item xs={12} justifyContent="center" alignItems="center">
                                    <div className="chart2">
                                        <h3 className="title3">Cantidad de
                                        Usuarios Premium y Free <br/> suscriptos por mes</h3>
                                        <UPFColumnChart/>
                                        
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="chartsD" 
                            style={{ 
                                display: "flex",
                                justifyContent: "space-around",

                        }}>
                            <Grid container alignItems="flex-start">
                                <Grid container item xs={12} justifyContent="center" alignItems="center">                        
                                    <div className="chart3" 
                                        style={{ 
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            height: 550,
                                            width: 600
                                    }}>
                                        <h3 className="title3">Tiempo de duración de suscripción de usuarios premium</h3>
                                        <TiempoDuracionUP/>
                                    </div>
                                </Grid>
                                <Grid container item xs={12} justifyContent="center" alignItems="center">                                    
                                    <div className="chart4" 
                                        style={{ 
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            height: 450,
                                            width: 600
                                    }}>
                                        <h3 className="title3">Cantidad de reclamos de los <br/> últimos 30 días</h3>
                                        <CantDenuncias/>
                                    </div>
                                </Grid>
                            </Grid>                            
                        </div>
                    </TabPanel>
                </Box>

                <br></br>
                <footer style={{position: "absolute", bottom: 0, width: "100%"}}>
                    <Footy />
                </footer>
                
            </main>
        </div>
    );
}