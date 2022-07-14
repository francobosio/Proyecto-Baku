import { Router } from 'express'
import * as marcadorCtrl from './marcador.controller'

const router = Router();

router.post('/guardarNota', marcadorCtrl.guardarNota);

router.get('/obtenerNotas/:idUsuarioActual/:idLibroALeer', marcadorCtrl.obtenerNotaPorUsuarioLibro);

router.delete('/eliminarNota/:_id', marcadorCtrl.deleteNota)

//VER SI ENVIA Y TRAE ALGOOO

export default router