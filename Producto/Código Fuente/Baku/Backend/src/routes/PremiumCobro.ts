import { Schema, model, Document } from 'mongoose'

const cobroSchema = new Schema({
    webhookId: {
        type: String
    },
    userId: {
        type: String
    },
    frontId: {
        type: String
    },
    fechaVencimiento: {
        type: Date
    },
    estado: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true,
})

interface ICobro extends Document {
    webhookId: string;
    userId: string;
    frontId: string;
    fechaVencimiento: Date;
    estado: string;

}
export default model<ICobro>('Cobro', cobroSchema);