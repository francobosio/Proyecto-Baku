import { Router } from 'express'
import multer from '../libs/multer'
import * as libroCtrl from './libros.controller'

const router = Router();
const camposArchivo = multer.fields([{ name:'imagenPath', maxCount: 1 }, { name:'archivoTexto', maxCount: 1 }]);

router.get('/libros', libroCtrl.getLibros);

router.get('/libro/:id', libroCtrl.getLibro)

router.post('/libros', camposArchivo, libroCtrl.createLibro)

router.get('/libros/delete/:id', libroCtrl.deleteLibro)

router.put('/libros/:id', libroCtrl.updateLibro)

export default router