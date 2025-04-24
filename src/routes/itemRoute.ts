import express from 'express';
import Item from '../models/Item';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.use(authenticate);

router.post('/', async (req: any, res) => {
  try {
    const { description } = req.body;
    
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ message: 'Descrição é obrigatória e deve ser uma string' });
    }

    const item = new Item({
      description: description.trim(),
      completed: false,
      user: req.user._id
    });
    
    await item.save();
    res.status(201).json(item);
  } catch (error: any) {
    console.error('Erro ao criar item:', error);
    res.status(400).json({ 
      message: 'Erro ao criar item', 
      error: error.message || 'Erro desconhecido' 
    });
  }
});

router.get('/', async (req: any, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Rota para alternar o status de conclusão do item
router.put('/:id/toggle', async (req: any, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    
    item.completed = !item.completed;
    await item.save();
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Rota para excluir um item
router.delete('/:id', async (req: any, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.json({ message: 'Item excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;