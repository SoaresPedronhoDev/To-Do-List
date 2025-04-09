import { Request, Response, NextFunction, Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

const router = Router();

// Rota de registro
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
    
  } catch (error) {
    next(error);
  }
});

// Rota de login
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = user.generateAuthToken();

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
      sameSite: 'strict',
      path: '/'
    });

    res.status(200).json({
      message: 'Login bem-sucedido',
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    next(error);
  }
});

export default router;