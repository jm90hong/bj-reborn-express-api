import { Router } from 'express';
import { createComment, deleteComment, getComments, updateComment } from '../controllers/CommentController';

const router = Router();

router.post('/create', createComment);
router.get('/comments', getComments);
router.put('/update', updateComment);
router.delete('/delete/:id', deleteComment);

export default router;

