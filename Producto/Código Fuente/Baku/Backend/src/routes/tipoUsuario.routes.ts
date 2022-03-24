import { Router } from 'express'
import * as tipoUsuarioCtrl from './tipoUsuario.controller';


const router = Router();

router.post('/tipoUsuarios', tipoUsuarioCtrl.createTipoUsuario)

router.get('/tipoUsuarios', tipoUsuarioCtrl.getTipoUsuarios)

export default router;