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
        required:true
    },
    usuario:{
        type: String,
        trim:true
    },
    genero:{
        type: [String],
        trim: true,
    },
    editorial:{
        type: String,
        trim: true,
    },
    aptoTodoPublico:{
        type: Boolean,
    },
    aceptaTerminos:{
        type: Boolean,
        required: true,
    },
    estado:{
        type: String,
    },
    visitas:{
        type: Number,
        default:"0",
    },
    visitas24Horas:{
        type: Number,
        default:"0",
    },
    favoritos:{
        type: Number,
        default:"0",
    },
    indicadorAS:
    {
        type: Number,
        default:"0",
    },
    ordenRanking:
    {
        type: Number,
    }
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
    editorial: string;
    autor: string;
    genero: string;
    aptoTodoPublico: boolean;
    aceptaTerminos: boolean;
    estado: string;
    visitas: number;
    visitas24Horas: number;
    favoritos: number;
    indicadorAS: number;
    ordenRanking: number;
}
export default model<ILibro>('Libro', libroSchema);