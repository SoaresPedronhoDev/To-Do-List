import { Request, Response, NextFunction, Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt'; // para criptografar senhas
import path from 'path';

const router = Router();

// rota de registro
router.post('/register', async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { email, password } = req.body;

    // verifica se o usuario ja existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    //cria um novo usuario
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error); // passa o erro para o middleware de tratamento de erros
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Senha não encontrada para o usuário' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ 
      message: 'Login bem-sucedido',
      token,
      user: { 
        email: user.email, 
        displayName: user.displayName 
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro durante o login', error });
  }
});

// Rota para servir a página do dashboard
router.get('/dashboard', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/userDashboard.html'));
});

export default router;