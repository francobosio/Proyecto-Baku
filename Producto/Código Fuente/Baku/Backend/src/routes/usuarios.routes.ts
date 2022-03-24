import { Router } from "express";
import * as usuarioCtrl from './usuarios.controller'

const router = Router();

router.post('/usuarios', usuarioCtrl.createUsuario)

router.get('/usuarios/:auth0id', usuarioCtrl.getUsuario)

router.get('/usuario/ultimaPagina/:auth0id/:idLibro', usuarioCtrl.getUltimaPagina)

router.put('/usuarios/libroSubido', usuarioCtrl.putLibroPublicado)

router.put('/usuarios/libroLeido/', usuarioCtrl.putLibroLeido)

router.get('/usuarios', usuarioCtrl.getUsuarios)

router.put('/usuarios/modificarTipo', usuarioCtrl.putTipoUsuario)

export default router;