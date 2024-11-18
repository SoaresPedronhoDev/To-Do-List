import { Router } from 'express';
import { todoGet } from '../controllers/todoController';

const router = Router();

router.get('/',todoGet)


export default router;
