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
  const { onClose, value: valueProp, open, pAutor, pLibro, reclamador, ...other } = props;
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
  const [nuevoModal, setNuevoModal] = React.useState(false)
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
    if (open === false) { setOpen2(true); } else { setOpen2(false); }
    setCerrar(false);
    inputDenuncia.current.value = "";
  };

  const handleAceptar = async () => {
    setCerrar(false);
    inputDenuncia.current.value = "";
    let reclamador = await usuarioService.getUsuario(pAutor);
    let contadorDenunciasTotalAutor = await denunciaService.putContadorDenuncias(pAutor);
    let contadorDenucniasxLibroAutor = await denunciaService.putContadorDenunciasxLibro(pLibro);
    const autorAuth0 = await usuarioService.getUsuario(pAutor);
    var from = 'Baku <bakulibros@gmail.com>';
    var to = autorAuth0.data.correo_electronico;
    var subject = 'Cuenta y Libro bloqueado';
    var concepto = value;
    if (value === 'Otros:') {
      concepto = cuadroTexto;
    }
    var mensajeCuerpo = `Hola ${autorAuth0.data.nombre} ${autorAuth0.data.apellido}. Le enviamos este email desde Baku para informarle que su libro fue denunciado en varias ocasiones y de acuerdo a los Términos y Condiciones acordados, ha sido bloqueado y ya no podrá ser accedido desde nuestra plataforma. El motivo lo puede encontrar detallado debajo.
    Si usted considera que esto se trata de un error o equivocación, puede contactarnos a través de nuestras redes sociales y analizaremos su caso si así lo amerita.
    Desde ya, muchas gracias.`;
    setCerrar(false);
    const reclamadorAuth0 = reclamador.data.usuario;
    const contadorAutor = parseInt(contadorDenunciasTotalAutor.data) + 1;
    const contadorLibro = parseInt(contadorDenucniasxLibroAutor.data) + 1;
    setNuevoModal(true);
    await denunciaService.postGuardarDenuncia(from, to, subject, mensajeCuerpo, concepto, pAutor, pLibro, contadorAutor, contadorLibro, reclamadorAuth0);
    if (contadorAutor >= 2 || contadorLibro >= 2) {
      console.log("bloquear" + contadorAutor + " " + contadorLibro)
      await denunciaService.putBloquearAutoryLibro(pAutor, pLibro);
      console.log("datos" + pAutor + " " + pLibro)
      await denunciaService.putEnviarDenuncia(from, to, subject, mensajeCuerpo, concepto, pAutor, pLibro);
    }
  }

  const handleInputChange = event => {
    setCuadroTexto(event.target.value);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    // console.log(open)
  };

  const handleCerrar = () => {
    setNuevoModal(false);
  }

  return (
    <div><Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 800 } }}
      maxWidth="lg"
      TransitionProps={{ onEntering: handleEntering }}
      open={open2}
      {...other}
    >

      <DialogTitle>Reclamar este libro</DialogTitle>
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
              label={option} />
          ))}
        </RadioGroup>
        <TextField
          disabled={value !== "Otros:"}
          id="outlined-basic"
          inputRef={inputDenuncia}
          label="Escribe aquí tu reclamo"
          variant="outlined"
          multiline
          onChange={handleInputChange}
          sx={{ "marginTop": "1rem" }}
          rows={4}
          rowsMax={4}
          fullWidth />
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

      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 700, backgroundColor: 'edf7ed' } }}
        maxWidth="lg"
        TransitionProps={{ onEntering: handleEntering }}
        open={nuevoModal}
        {...other}
      >
        <DialogTitle>Gracias. Su reclamo fue procesado y se lo analizará a la brevedad.</DialogTitle>
        <DialogActions>
          <Button onClick={handleCerrar}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};