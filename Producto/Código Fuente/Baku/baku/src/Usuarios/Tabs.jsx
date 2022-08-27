import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Suscripciones from './Suscripciones.jsx'
import UsuariosLibros from './UsuariosLibros.jsx';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* format more big and dark  */}
        <Tabs value={value} onChange={handleChange} aria-label="Tabs"  indicatorColor="secondary"
          textColor="inherit"  centered>
          <Tab icon={<PeopleOutlineIcon />} label="Usuarios" {...a11yProps(0)} />
          <Tab icon={<FactCheckOutlinedIcon />} label="Suscripciones" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UsuariosLibros/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Suscripciones/>
      </TabPanel>
    </Box>
  );
}
