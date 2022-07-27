import { Schema, model, Document } from 'mongoose'

const marcadorSchema = new Schema({
    usuario: {
        type: String,
        required: true,
    },
    id_libro: {
        type: String,
        required: true,
    },
    highlightAreas: 
    [   
        {
       height: Number,
       left: Number,
       pageIndex: Number,
       top: Number,
       width: Number,
       _id : false
        }
    ],
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
    id: string;
    highlightAreas:any [];
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