import { Schema, model, Document } from 'mongoose'

const denunciaSchema = new Schema({
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    subject: {
        type: String,
    },
    mensajeCuerpo: {
        type: String,
    },
    concepto: {
        type: String,
    },
    autorAuth0: {
        type: String,
    },
    libroId:{
        type: String,
    },
    reclamosxUsuario:{
        type: Number,
        default:"0",
    },
    reclamosxLibro:{
        type: Number,
        default:"0",
    }
}, {
    versionKey: false,
    timestamps: true,
})

interface IDenuncia extends Document {
    from: string;
    to: string;
    subject: string;
    mensajeCuerpo: string;
    concepto: string;
    autorAuth0: string;
    libroId: string;
    reclamosxUsuario: number;
    reclamosxLibro: number;
}
export default model<IDenuncia>('Denuncia', denunciaSchema);