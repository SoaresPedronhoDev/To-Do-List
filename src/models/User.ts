import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

interface IUser extends Document {
  email: string;
  password?: string;
  displayName?: string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  displayName: { type: String }
}, { timestamps: true });

//metodo pra comparar senhas
userSchema.method('comparePassword', async function(this: IUser, candidatePassword: string) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
});

// metodo para gerar token
userSchema.method('generateAuthToken', function() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('❌ JWT_SECRET não configurado - Verifique seu arquivo .env');
  }
  return jwt.sign(
    { _id: this._id },
    secret,
    { expiresIn: '1d' }
  );
});

// middleware para hash da senha
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password!, 10);
  next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);
export default User;