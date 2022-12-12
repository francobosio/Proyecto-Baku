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
    },
    notificadoMes: {
        type: Boolean
    },
    plan: {
        type: String
    },
    importe: {
        type: Number
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
    notificadoMes: Boolean;
    plan: String;
    importe: Number;
}
export default model<ICobro>('Cobro', cobroSchema);