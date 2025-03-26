

import express from 'express';
import Item from '../models/Item';
import { authenticate } from '../middlewares/auth';

const router = express.Router();


router.use(authenticate);

router.post('/', async (req: any, res) => {
  try {
    const item = new Item({
      ...req.body,
      user: req.user._id
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error });
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

export default router;