import { Router } from 'express';
import {todoGet, loginGet, loginPost, registerGet, registerPost } from '../controllers/loginController';

const router = Router();

router.get('/',todoGet)

// Rota GET para "/login"
router.get('/login', loginGet);

// Rota POST para "/login"
router.post('/login', loginPost);

// Rota GET para "/register"
router.get('/register', registerGet);

// Rota POST para "/register"
router.post('/register', registerPost);

export default router;
