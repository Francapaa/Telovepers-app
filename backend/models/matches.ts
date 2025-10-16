// en este file vamos a estar creando la estructura de como guardar los matches de las personas
import { timeStamp } from "console";
import mongoose, {Document, Types} from "mongoose";

export interface MatchDocuement extends Document{
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    targetUserId: Types.ObjectId; 
    action: 'like'|'dislike';

    isMatch: boolean
    matchedAt?: Date;

    seen: boolean; // Extremadamente importante porque sino se quedaria en un loop mostrando al mismo usuario

    createdAt: Date;
    updatedAt: Date;
}

const matchSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        targetUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        action:{
            type: String,
            enum: ['like', 'dislike'],
            required: true
        },
        isMatch: {
            type: Boolean,
            default: false
        },
        matchedAt: {
            type: Date
        },
        seen: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
    
);
matchSchema.index({userId: 1, targeUserId: 1}, {unique: true});
matchSchema.index({userId: 1, isMatch: 1});
matchSchema.index({targetUserId: 1});

export const Match = mongoose.model<MatchDocuement>('Match', matchSchema);