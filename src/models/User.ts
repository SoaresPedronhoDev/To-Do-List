import mongoose, { Schema, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IUser extends Document {
  email: string;
  password?: string; 
  googleId?: string; 
  displayName?: string; 
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true }, 
  displayName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Método para gerar token JWT
userSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET || 'default-secret',
    { expiresIn: '1h' }
  );
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;