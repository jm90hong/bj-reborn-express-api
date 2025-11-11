import { Router } from 'express';
import { createItem, deleteItem, getItems, updateItem } from '../controllers/ItemController';

const router = Router();

router.post('/create', createItem);
router.get('/items', getItems);
router.put('/update', updateItem);
router.delete('/delete/:id', deleteItem);

export default router;

