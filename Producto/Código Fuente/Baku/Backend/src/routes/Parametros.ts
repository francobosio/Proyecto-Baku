import { Schema, model, Document } from 'mongoose'

const parametroSchema = new Schema({
    numeroUsuario: {
        type: String,
    },
    numeroLibro: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,
})

interface IParametro extends Document {
    numeroUsuario: number;
    numeroLibro: number;
}
export default model<IParametro>('Parametro', parametroSchema);