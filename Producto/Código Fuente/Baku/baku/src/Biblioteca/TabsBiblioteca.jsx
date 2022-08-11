import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListaLibrosRevisar from '../Revision/ListaLibrosRevisar.jsx';
import MisLibrosLeidos from './MisLibrosLeidos.jsx';
import MisLibrosPublicados from './MisLibrosPublicados.jsx';
const useStyles = makeStyles((theme) => ({
  //la ventada ocupe todo el ancho de la pantalla
    root: {
        maxWidth: '500vh',
        

    },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="MIS LIBROS LEIDOS" {...a11yProps(0)} />
          <Tab label="MIS LIBROS PUBLICADOS" {...a11yProps(1)} />
          <Tab label="MIS FAVORITOS" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MisLibrosLeidos/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MisLibrosPublicados/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ListaLibrosRevisar/>
      </TabPanel>
    </Box>
  );
}
