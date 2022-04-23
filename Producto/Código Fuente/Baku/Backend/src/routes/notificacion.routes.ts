import { Router } from 'express'
import * as notificacionCtrl from './notificacion.controller'

const router = Router();

router.get('/notificacion', notificacionCtrl.getNotificacion);

router.post('/notificacion', notificacionCtrl.createNotificacion);


export default router