import {Schema,model,Document} from 'mongoose'

const tipousuariosSchema = new Schema({
    id:{
        type: String
    },
    nombre:{
        type: String
    }
},{
    versionKey: false,
    timestamps: true,
    autoIndex: false,
})

interface ITipoUsuario extends Document {
    id: string;
    nombre: string;
}
export default model<ITipoUsuario>('TipoUsuario', tipousuariosSchema);