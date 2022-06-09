import { Router } from 'express'
import * as notificacionCtrl from './notificacion.controller'

const router = Router();

router.get('/notificacion', notificacionCtrl.getNotificacion);

router.post('/notificacion', notificacionCtrl.createNotificacion);

router.get('/notificacion/:idAuthUsuario', notificacionCtrl.getNotificacionUsuarioActual);

router.put('/notificacion/marcarTodasComoLeidas', notificacionCtrl.marcarTodasComoLeidas);

router.put('/notificacion/marcarComoLeida', notificacionCtrl.notificacionLeida);
export default router