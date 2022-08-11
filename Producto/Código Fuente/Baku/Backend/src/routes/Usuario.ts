import { Schema, model, Document } from 'mongoose';

const usuarioSchema = new Schema({
    auth0_id: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
    },
    tipoUsuario: {
        type: String,
    },
    correo_electronico: {
        type: String,
        required: true,
    },
    fecha_nacimiento: {
        type: Date,
    },
    libros_publicados: [],
    libros_leidos: [],
    libros_favoritos: [],
    suscriptores:[],
    mensajes: [
        {
            _id:String,
            id_libro:String,
            titulo: String,
            descripcion: String,
            tipo: String,
            esNoleido: Boolean,
            createdAt: Date,
            updatedAt: Date
        }
    ],
    estado: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
})

interface IUsuario extends Document {
    auth0_id: string;
    apellido: string;
    nombre: string;
    tipoUsuario: string;
    correo_electronico: string;
    fecha_nacimiento: Date;
    libros_publicados: any[];
    libros_leidos: any[];
    libros_favoritos: any[];
    mensajes: any[];
    suscriptores: any[];
    estado: string;
    avatar: string;
    marcadoresxLibro: any[]
}

export default model<IUsuario>('Usuario', usuarioSchema);