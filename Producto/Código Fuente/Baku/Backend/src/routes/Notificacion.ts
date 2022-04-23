import {Schema,model,Document} from 'mongoose'

const notificacionSchema = new Schema({
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
    },
},{
    versionKey: false,
    timestamps: true,
    autoIndex: false,
})

interface INotificacion extends Document {
    titulo: string;
    descripcion: string;
    tipo: string;
    esNoleido: boolean;
    
}


export default model<INotificacion>('Notificacion', notificacionSchema);