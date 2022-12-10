import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MisLibrosLeidos from './MisLibrosLeidos.jsx';
import MisLibrosPublicados from './MisLibrosPublicados.jsx';
import MisFavoritos from './MisFavoritos.jsx';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
      keys.reduce((output, key) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const matches = useMediaQuery(theme.breakpoints.up(key));
          return !output && matches ? key : output;
      }, null) || 'xs'
  );
}

const calculo = (width) => {
  if (width > 1100) {
      const ancho = width;
      return ancho
  } else if (width <= 1100) {
      const ancho = 790;
      return ancho
  }
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  let columnas;
  let banderaTab=false; 
  let anchoImageList;
  const valor = theme.breakpoints.values[useWidth()];
  let width = calculo(valor);
  if ( useMediaQuery(theme.breakpoints.only('xs'))) { columnas=2;banderaTab=true ;anchoImageList=360}
  if ( useMediaQuery(theme.breakpoints.only('sm'))) { columnas=2;banderaTab=true ;anchoImageList="120%"}
  if ( useMediaQuery(theme.breakpoints.only('md'))) { columnas=2;banderaTab=true ;anchoImageList="85%"}
  if ( useMediaQuery(theme.breakpoints.only('lg'))) { columnas=5;banderaTab=false;anchoImageList="95%"}
  if ( useMediaQuery(theme.breakpoints.only('xl'))) { columnas=5;banderaTab=false;anchoImageList="100%"}

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
       {!banderaTab ? <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="MIS LIBROS LEIDOS" {...a11yProps(0)} />
          <Tab label="MIS LIBROS PUBLICADOS" {...a11yProps(1)} />
          <Tab label="MIS FAVORITOS" {...a11yProps(2)} />
        </Tabs>:
        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="LEIDOS" {...a11yProps(0)} />
          <Tab label="PUBLICADOS" {...a11yProps(1)} />
          <Tab label="FAVORITOS" {...a11yProps(2)} />
        </Tabs>
        }
      </Box>
      <TabPanel value={value} index={0}>
        <MisLibrosLeidos columnas={columnas} altura={width} anchoImageList={anchoImageList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MisLibrosPublicados columnas={columnas} altura={width}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <MisFavoritos columnas={columnas} altura={width}/>
      </TabPanel>
    </Box>
  );
}
