import { Router } from 'express'
import * as denunciaCtrl from './denuncias.controller'


const router = Router();

router.put('/denuncia/enviar', denunciaCtrl.enviarMail);

router.post('/denuncia/guardar', denunciaCtrl.guardarDenuncia);

router.put('/denuncia/contadorxUsuario', denunciaCtrl.putContadorDenuncias);

router.put('/denuncia/contadorxlibro', denunciaCtrl.putContadorDenunciasxLibro );

router.get('/denuncia/obtenerCompleto', denunciaCtrl.getDenunciasxLibroxUsuario);

router.put('/denuncia/bloquearAutorLibro', denunciaCtrl.bloquearAutorLibro);

router.put('/denuncia/eliminarReclamo', denunciaCtrl.eliminarReclamo);

router.put('/denuncia/guardarParametros', denunciaCtrl.guardarParametros);

router.get('/denuncia/obtenerParametros', denunciaCtrl.obtenerParametros);

export default router