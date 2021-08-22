import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

  export default function Selector() {

    const [state, setState] = React.useState('');
  
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      return (
        <div>
          <FormControl fullWidth="true">
            <InputLabel htmlFor="nacionalidad">Nacionalidad</InputLabel>
            <Select
              native
              value={state.age}
              onChange={handleChange}
              inputProps={{
                name: 'nacionalidad',
                id: 'nacionalidad',
              }}
            >
              <option aria-label="None" value="" />
              <option value={'Argentina'}>Argentina</option>
              <option value={'Bolivia'}>Bolivia</option>
              <option value={'Chile'}>Chile</option>
              <option value={'Colombia'}>Colombia</option>
              <option value={'Ecuador'}>Ecuador</option>
              <option value={'Mexico'}>Mexico</option>
              <option value={'Paraguay'}>Paraguay</option>
              <option value={'Perú'}>Perú</option>
              <option value={'Uruguay'}>Uruguay</option>
              <option value={'Venezuela'}>Venezuela</option>
            </Select>
          </FormControl>
        </div>
      )
    }
