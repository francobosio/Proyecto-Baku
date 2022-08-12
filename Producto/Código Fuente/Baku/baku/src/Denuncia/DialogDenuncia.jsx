import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as denunciaService from '../Denuncia/DenunciaService';
import * as usuarioService from '../Sesión/Usuarios/UsuarioService';

const options = [
  'Contenido sexual explicito',
  'Contenido violento o repulsivo',
  'Acoso o bullying',
  'Actividades peligrosas y dañinas',
  'Abuso de menores',
  'Fomenta el terrorismo',
  'Contenido engañoso o spam',
  'Infringe derechos de autor',
  'Otros:'
];

export default function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, pAutor, pLibro, ...other } = props;
  React.useEffect(() => {
    if (open === true) {
      setOpen2(open)
    } else {
      setCerrar(true)
    }
    if (cerrar === false) {
      setOpen2(cerrar)
    }
    /* console.log("open: "+open)
    console.log("open2:" + open2) */
  }, [open])

  const [cerrar, setCerrar] = React.useState(true)
  const [open2, setOpen2] = React.useState(open)
  /* console.log("open: "+open)
  console.log("open2:" + open2)
  console.log("cerrar: "+cerrar) */
  const inputDenuncia = React.useRef("")
  const [value, setValue] = React.useState(valueProp);
  const [cuadroTexto, setCuadroTexto] = React.useState("");
  const radioGroupRef = React.useRef(null);
  //cerrar el dialogo al cerrar el modal de confirmacion 

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }

  };

  const handleClose = () => {
    if (open===false) {setOpen2(true);}else {setOpen2(false);}
    setCerrar(false);
    inputDenuncia.current.value = "";
  };

  const handleAceptar = async () => {
    setCerrar(false);
    inputDenuncia.current.value = "";
    const contadorDenunciasTotalAutor = await denunciaService.putContadorDenuncias(pAutor);
    const contadorDenucniasxLibroAutor = await denunciaService.putContadorDenunciasxLibro(pLibro);
    const autorAuth0 = await usuarioService.getUsuario(pAutor);
    console.log("Libro: ", pLibro);
    console.log("autorAuth0: ", autorAuth0.data);
    var from = 'Baku <bakulibros@gmail.com>';
    var to = autorAuth0.data.correo_electronico;
    console.log("to: ", to);
    var subject = 'Libro bloqueado';
    var mensajeCuerpo = 'Hola buenos dias!, le queriamos comentar que su libro fue denunciado en varias ocaciones por cautela a sido bloqueado contacte a un administrador si esto es un error gracias';
    var concepto = value;
    if (value === 'Otros:') {
      //obtener el valor del radio button seleccionado
      concepto = cuadroTexto;
    }
    console.log(concepto)
    setCerrar(false);
    console.log("Contador de denuncias del autor:" + contadorDenunciasTotalAutor.data);
    console.log("Contador de denuncias del libro:" + contadorDenucniasxLibroAutor.data);
    if (contadorDenunciasTotalAutor.data >= 5 || contadorDenucniasxLibroAutor.data >= 5) {
     await denunciaService.putEnviarDenuncia(from,to,subject,mensajeCuerpo,concepto,pAutor,pLibro);
    await denunciaService.postGuardarDenuncia(from,to,subject,mensajeCuerpo,concepto,pAutor,pLibro);  
  };

  } 
  const handleInputChange = event => {
    setCuadroTexto(event.target.value);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    // console.log(open)
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 800 } }}
      maxWidth="lg"
      TransitionProps={{ onEntering: handleEntering }}
      open={open2}
      {...other}
    >
      <DialogTitle>Denunciar este libro</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="Denuncia"
          name="Denuncia"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
        <TextField
          disabled={value !== "Otros:"}
          id="outlined-basic"
          inputRef={inputDenuncia}
          label="Escribe aquí tu denuncia"
          variant="outlined"
          multiline
          onChange={handleInputChange}
          sx={{ "marginTop": "1rem" }}
          rows={4}
          rowsMax={4}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleAceptar}>Confirmar</Button>
        {/*  <Button autoFocus onClick={() => this.setState({ open: !open })}>
          Cancel
        </Button>
        <Button onClick={() => this.setState({ open: !open })}>Ok</Button> */}
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};