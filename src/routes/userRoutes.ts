
import { Request, Response, NextFunction, Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt'; // para criptografar senhas
import jwt from 'jsonwebtoken'

const router = Router();

// rota de registro
router.post('/register', async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { email, password } = req.body;

    // verifica se o usuario ja existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
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

router.post('/',async (req :  Request, res: Response, next : NextFunction) : Promise<any> =>{

})

export default router;