import { Router } from 'express'
import * as tipoUsuarioCtrl from './tipoUsuario.controller';


const router = Router();

router.post('/tipoUsuariosNuevo', tipoUsuarioCtrl.createTipoUsuario)

router.get('/tipoUsuarios', tipoUsuarioCtrl.getTipoUsuarios)

router.put('/tipoUsuarios/eliminar', tipoUsuarioCtrl.eliminarTipoUsuario)

export default router;