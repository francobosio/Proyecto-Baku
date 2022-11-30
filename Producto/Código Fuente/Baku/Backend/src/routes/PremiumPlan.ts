import { Schema, model, Document } from 'mongoose'

const premiumSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
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
}
export default model<IPremiumPlan>('PremiumPlan', premiumSchema);