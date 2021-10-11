import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: '35rem',
      'backgroundColor': '#fff',
      'borderRadius': '0.2rem',
    },
    '& .MuiInputBase-input':{
      'color': '#000',
    }
  },
  
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        
      <TextField
          id="standard-textarea"
          name="descripcion"
          rows={3}
          multiline
        />
      </div>
    </form>
  );
}
