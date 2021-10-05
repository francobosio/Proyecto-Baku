import {Schema,model,Document} from 'mongoose'

const libroSchema = new Schema({
    imagenPath:{
        type: String,
        required:true
    },
    public_id_imagen:{
        type: String,
        required:true
    },
    titulo:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        trim: true
    },
    archivoTexto:{
        type: String,
        required:true
    },
    public_id_pdf:{
        type: String,
        required:true
    }
},{
    versionKey: false,
    timestamps: true
})

interface ILibro extends Document {
    imagenPath: string;
    titulo: string;
    descripcion: string;
    archivoTexto: string;
}
export default model<ILibro>('Libro', libroSchema);