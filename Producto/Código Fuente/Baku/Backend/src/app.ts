import express, { response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import libroRoutes from './routes/libros.routes'
import usuarioRoutes from './routes/usuarios.routes'
import tipoUsuarioRoutes from './routes/tipoUsuario.routes'
import notificacionRoutes from './routes/notificacion.routes'
import marcadorRoutes from './routes/marcador.routes'
import denunciaRoutes from './routes/denuncias.routes'
import premiumPlanRoutes from './routes/premiumPlan.routes'
import premiumCobroRoutes from './routes/premiumCobro.routes'
import path from 'path'
import responseTime from 'response-time'
import cron from 'node-cron'
import {eliminarVisitas24Hr,establecerRanking} from './routes/libros.controller'



const app = express()
app.set('port', config.PORT);

//Se ejecuta a las 19:00 de cada dia '0 19 * * * *'
//Se ejecuta cada 10 segundos '*/10 * * * * *'

cron.schedule('0 19 * * * *',  () => {
  let tiempo = new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
  console.log('Se ejecuto eliminarVisitas24Hr '+ tiempo)
  eliminarVisitas24Hr()
} )

cron.schedule('0 8 * * * *',  () => {

  let tiempo = new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
  console.log('Se ejecuto establecerRanking '+ tiempo)
  establecerRanking(8);
} )

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(responseTime());
//esta carpeta sera utilizada  para almacenar archivos publicos
app.use('/uploads' , express.static(path.resolve('upload')))
//rutas
app.use(libroRoutes)
app.use(usuarioRoutes)
app.use(tipoUsuarioRoutes)
app.use(notificacionRoutes)
app.use(marcadorRoutes)
app.use(denunciaRoutes)
app.use(premiumPlanRoutes)
app.use(premiumCobroRoutes)

export default app;