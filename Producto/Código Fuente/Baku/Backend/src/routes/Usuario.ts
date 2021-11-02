import {Schema,model,Document} from 'mongoose'

const usuarioSchema = new Schema({
    auth0_id:{
        type: String,
        required:true
    },
    apellido:{
        type: String,
        required:true
    },
    nombre:{
        type: String,
        required: true,
    },
    correo_electronico:{
        type: String,
        required: true,
    },
    fecha_nacimiento:{
        type: Date,
    },
    libros_publicados:[
        {
            id_libro: String,
            ultima_pagina: Number,
        }
    ],
    libros_leidos:[
        {
            id_libro: String,
            fecha_publicacion: Date,
        }
    ],
},{
    versionKey: false,
    timestamps: true
})

interface IUsuario extends Document {
    auth0_id: string;
    apellido: string;
    nombre: string;
    correo_electronico: string;
    fecha_nacimiento: Date;
    libros_publicados: any [];
    libros_leidos:any [];
}

export default model<IUsuario>('Usuario', usuarioSchema);