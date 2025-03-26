

import mongoose, { Schema, Document } from "mongoose";\
import IUser from "./User";

export interface IItem extends Document {

  description: string;
  isDone: boolean
  user: Schema.Types.ObjectId;

}

const itemSchema = new Schema({

    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    
  }, { timestamps: true });

  export default mongoose.model<IItem>('Item', itemSchema);