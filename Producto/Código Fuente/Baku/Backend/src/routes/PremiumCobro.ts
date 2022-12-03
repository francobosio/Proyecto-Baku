import { Schema, model, Document } from 'mongoose'

const cobroSchema = new Schema({
    webhookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    frontId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
})

interface ICobro extends Document {
    titulo: string;
    descripcion: string;
    urlCobro: string;
}
export default model<ICobro>('Cobro', cobroSchema);