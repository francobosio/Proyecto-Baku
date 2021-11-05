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
        trim: true,
    },
    descripcion:{
        type: String,
        trim: true,
    },
    archivoTexto:{
        type: String,
        required:true
    },
    public_id_pdf:{
        type: String,
        required:true
    },
    autor:{
        type: String,
        trim: true,
    },
    //array de generos
    genero:{
        type: [String],
        trim: true,
    },
    aptoTodoPublico:{
        type: Boolean,
    },
    aceptaTerminos:{
        type: Boolean,
        required: true,
    },
},{
    versionKey: false,
    timestamps: true,
    autoIndex: false,
})

interface ILibro extends Document {
    imagenPath: string;
    public_id_imagen: string;
    titulo: string;
    descripcion: string;
    archivoTexto: string;
    public_id_pdf: string;
    autor: string;
    genero: string;
    aptoTodoPublico: boolean;
    aceptaTerminos: boolean;
}
export default model<ILibro>('Libro', libroSchema);