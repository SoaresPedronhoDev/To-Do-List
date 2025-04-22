import { Request, Response, NextFunction, Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config(); 

const router = Router();

// Rota para servir a página do dashboard
router.get('/dashboard', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public/userDashboard.html'));
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();


    const token = newUser.generateAuthToken();
    
    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: { email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});


router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Password is missing for the user' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // grea token depois do login ser valido
    const token = user.generateAuthToken();

    res.status(200).json({ 
      message: 'Login successful',
      token,
      user: { 
        email: user.email, 
        displayName: user.displayName 
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
});

export default router;