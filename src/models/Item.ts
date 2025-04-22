import mongoose from 'mongoose';

interface IItem extends mongoose.Document {
  description: string;
  completed: boolean;
  user: mongoose.Types.ObjectId; // Dono do item
}

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IItem>('Item', itemSchema);