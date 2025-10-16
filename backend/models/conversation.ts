//En este file crearemos la coleccion para las conversaciones activas (esta solo se activa con 2 pasos:
// 1) El usuario esta logeado (JWT)      2)Los dos usuarios hicieron match (interes mutuo))

import mongoose , {Document, Types} from "mongoose";


export interface ConversationDocument extends Document{
    _id: Types.ObjectId;
    participants: Types.ObjectId[]; // array xq van a haber 2 IDs

    // Ultimo mensaje
    lastMessage?:{
        text: string,
        senderId: Types.ObjectId,
        timestamp: true
    };

    unreadCount: {
        [userId: string]: number; 
    };

    createdAt: Date;
    updatedAt: Date;
}

const conversationSchema = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }],
    lastMessage: {
        text: String,
        senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'USer'},
        timestamp: true
    },
    unreadCount:{
        type: Map,
        of: Number,
        default: {}
    },
},
{
    timestamps: true
}
);

conversationSchema.index({participants: 1});
conversationSchema.index({'participants': 1, status: 1});

export const Conversation = mongoose.model<ConversationDocument>('Conversation', conversationSchema);