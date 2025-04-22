
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password?: string; 
  googleId?: string; 
  displayName?: string; 
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true }, 
  displayName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;