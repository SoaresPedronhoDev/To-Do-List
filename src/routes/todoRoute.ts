import { Router } from 'express';
import { todoGet } from '../controllers/todoController';

const router = Router();

router.get('/',todoGet) // passa a rota localhost:5001/Todo como rota, e usa a funcao todoGet para trabalhar ela


export default router;
