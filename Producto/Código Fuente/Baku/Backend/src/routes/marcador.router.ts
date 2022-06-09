import { Router } from 'express'
import * as marcadorCtrl from './marcador.controller'

const router = Router();

router.post('/guardarNota', marcadorCtrl.guardarNota);

router.get('/marcador', marcadorCtrl.getMarcador);

export default router