import { Request, Response, NextFunction, Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt'; // para criptografar senhas

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

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, password } = req.body;

    // verifica se o usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // verifica senha
    if (!user.password) {
      return res.status(400).json({ message: 'Password is missing' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      user: { 
        email: user.email, 
        displayName: user.displayName 
      } 
    });

  } catch (error) {
    next(error); //passa o erro para o tratamento de erros 
  }
});

export default router;