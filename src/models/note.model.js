import { Schema, model } from "mongoose";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        color: {
            type: String,
            trim: true,
            default: '#ffffff'
        },
        isArchive: {
            type: Boolean,
            default: false
        },
        trash: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export default model('Note', noteSchema)