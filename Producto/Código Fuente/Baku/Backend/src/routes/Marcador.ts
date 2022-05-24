import { Schema, model, Document } from 'mongoose'

const marcadorSchema = new Schema({
    usuario: {
        type: String,
        required: true,
    },
    libro: {
        type: String,
        required: true,
    },
   HighlightArea: {
        height: String,
        left: String,
        pageIndex: String,
        top: String,
        width: String
    },
    content: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },
    startPageIndex: {
        type: String
    },
    startOffset:
    {
        type: String
    },
    startDivIndex: {
        type: String
    },
    endPageIndex: {
        type: String
    },
    endOffset: {
        type: String

    },
    endDivIndex: {
        type: String
    },
}, {
    versionKey: false,
    timestamps: true,
})

interface IMarcador extends Document {
    usuario: string;
    libro: string;
    HighlightArea: any;
    content: string;
    quote: string;
    startPageIndex: string;
    startOffset: string;
    startDivIndex: string;
    endPageIndex: string;
    endOffset: string;
    endDivIndex: string;

}
export default model<IMarcador>('Marcador', marcadorSchema);