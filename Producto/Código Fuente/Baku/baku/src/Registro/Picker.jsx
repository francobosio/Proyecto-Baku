import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';

const localeMap = {
  es: esLocale
}

export default function Picker() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(Date.now());
  const [locale] = React.useState("es");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
      <KeyboardDatePicker
        margin="normal"
        id="fechaNacimiento"
        label="Fecha de Nacimiento"
        format="dd/MM/yyyy"
        disableFuture={true}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}