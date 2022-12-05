import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TipoUsuario from './TipoUsuario';
import Permisos from './Permisos.jsx';
import PlanPremium from './PlanPremium.jsx';

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
          {/* <Tab label="Permisos" {...a11yProps(0)} /> */}
          <Tab label="Tipo de Usuario" {...a11yProps(1)} />
          <Tab label="Planes Premium" {...a11yProps(0)} />
        </Tabs>
      </Box>
{/*       <TabPanel value={value} index={0}>
        <Permisos/>
      </TabPanel> */}
      <TabPanel sx={{height:'100em'}} value={value} index={1}>
        <TipoUsuario/>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <PlanPremium/>
      </TabPanel>
    </Box>
  );
}
