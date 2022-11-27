import { Router } from 'express'
import multer from '../libs/multer'
import * as libroCtrl from './libros.controller'
import * as libroCtrlJs from './libros.narrador.controller'

const router = Router();

const camposArchivo = multer.fields([{ name:'imagenPath', maxCount: 1 }, { name:'archivoTexto', maxCount: 1 }]);

router.get('/libros', libroCtrl.getLibros);

router.get('/librosRegistrados', libroCtrl.getLibrosRegistrados);

router.get('/librosPublicados', libroCtrl.getLibrosPublicados);

router.get('/librosPublicados/menorEdad', libroCtrl.getLibrosPublicadosMenorEdad);

router.get('/libro/:id', libroCtrl.getLibro)

router.get('/libro/revision/:id', libroCtrl.getLibroRevision)

router.post('/libros', camposArchivo, libroCtrl.createLibro)

router.get('/libros/delete/:id', libroCtrl.deleteLibro)

router.put('/libros/:id', libroCtrl.updateLibro)

router.get('/libros/buscar/:buscar', libroCtrl.buscarLibro)

router.get('/libros/buscar/genero/:genero', libroCtrl.buscarLibroGenero)

//los parametros se paran por el body de la peticion
router.put('/libro/cambiarEstado', libroCtrl.updateLibroEstado)

router.get('/autor/:libroId', libroCtrl.getBuscarAutor)


router.get('/autor/libros/:id', libroCtrl.getLibrosAutor)

router.get('/libros', libroCtrl.obtenerLibros);

router.get('/librosFecha/:fechaDesde/:fechaHasta', libroCtrl.obtenerLibrosFecha)

router.get('/librosFavoritos', libroCtrl.obtenerLibrosMasFavoritos)

 router.get('/libros/ranking', libroCtrl.obtenerRanking)

router.get('/libro/narrador/:archivoTexto/:currentPage/:titulo', libroCtrlJs.getLibroNarrador)
 
export default router