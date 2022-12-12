import { Schema, model, Document } from 'mongoose'

const premiumSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripción: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true
    },
    urlCobro: {
        type: String
    },
}, {
    versionKey: false,
    timestamps: true,
})

interface IPremiumPlan extends Document {
    titulo: string;
    descripcion: string;
    urlCobro: string;
    precio: Number;
}
export default model<IPremiumPlan>('PremiumPlan', premiumSchema);