import {Schema,model,Document} from 'mongoose'

const tipoUsuarioSchema = new Schema({
    id:{
        type: String,
        required:true
    },
    nombre:{
        type: String,
        required:true
    },
},{
    versionKey: false,
    timestamps: true,
    autoIndex: false,
})

interface ITipoUsuario extends Document {
    id: string;
    nombre: string;

}
export default model<ITipoUsuario>('TipoUsuario', tipoUsuarioSchema);