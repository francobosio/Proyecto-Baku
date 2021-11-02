import { Router } from "express";
import multer from "../libs/multer";
import * as usuarioCtrl from './usuarios.controller'

const router = Router();

router.post('/usuarios', usuarioCtrl.createUsuario)

router.get('/usuarios/:auth0id', usuarioCtrl.getUsuario)

router.put('/usuarios/libroSubido', usuarioCtrl.putLibroPublicado)

export default router;