// ACA DEFINIMOS COMO VA A SER LA ESTRUCTURA DEL MENSAJE DENTRO DE NUESTRA BASE DE DATOS
// VAMOS A TENER UN ID QUE ES EL QUE ENVIA EL MENSAJE, Y A QUE SALA (ID) LO ENVIA
// ASI EL RECEPTOR PODRIA VERLO. ADEMAS DE ESO VAMOS A PODER VER LA HORA EXACTA EN LA CUAL MANDÓ
//EL MENSAJE

import mongoose, {Document, Schema, Types, Model, model} from "mongoose";
import { Conversation } from "./conversation";


export interface Message{
conversationId: Types.ObjectId;
senderId: Types.ObjectId;
text: string;
readBy: Types.ObjectId; 
createdAt: Date;
}

const messageSchema = new Schema<Message>({
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'conversation',
      required: true
    },
    senderId:{
      types: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text:{
      type: String,
      required: true,
      trim: true
    },
    readBy:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
},
  {timestamps: true}
); 

messageSchema.index({ConversationId: 1, createdAt: 1}); 

export const MessageModel = mongoose.model<Message>("Message", messageSchema);
export type MessageDocument = mongoose.HydratedDocument<Message>; 

