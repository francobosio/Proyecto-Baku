import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import libroRoutes from './routes/libros.routes'
import usuarioRoutes from './routes/usuarios.routes'
import path from 'path'
const app = express()

app.set('port', config.PORT);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//esta carpeta sera utilizada  para almacenar archivos publicos
app.use('/uploads' , express.static(path.resolve('upload')))

//rutas
app.use(libroRoutes)
app.use(usuarioRoutes)


export default app;