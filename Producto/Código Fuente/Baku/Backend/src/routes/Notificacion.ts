import {Schema,model,Document} from 'mongoose'

const notificacionSchema = new Schema({
    auth0usuario:{
        type: String
    },
    titulo:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true
    },
    tipo:{
        type: String,
        required:true
    },
    esNoleido:{
        type: Boolean,
        required:true
    },id_libro:{
        type: String
    },
    avatar:{
        type: String
    }
},{
    versionKey: false,
    timestamps: true,
    autoIndex: false,
})

interface INotificacion extends Document {
    auth0usuario: string;
    titulo: string;
    descripcion: string;
    tipo: string;
    esNoleido: boolean;
    id_libro: string;
    avatar: string;
    
}


export default model<INotificacion>('Notificacion', notificacionSchema);