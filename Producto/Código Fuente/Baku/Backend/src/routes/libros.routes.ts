import {Router} from 'express'
const router = Router();

import * as libroCtrl from './libros.controller'

router.get('/libros', libroCtrl.getLibros);

router.get('/libros/:id', libroCtrl.getLibro)

router.post('/libros', libroCtrl.createLibro)

router.delete('/libros/:id', libroCtrl.deleteLibro)

router.put('/libros/:id', libroCtrl.updateLibro)

export default router