// src/models/User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  displayName?: string;
  generateAuthToken(): string; 
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String }
});

// Método para gerar token JWT
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET!, 
    { expiresIn: '1d' }
  );
};


export default mongoose.model<IUser>('User', userSchema);