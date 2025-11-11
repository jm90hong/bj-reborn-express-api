

import { Router } from 'express';
import { createPost, deletePost, getPosts, updatePost } from '../controllers/PostController';

const router = Router();

router.post('/create', createPost);
router.get('/posts', getPosts);
router.delete('/delete/:id', deletePost);
router.put('/update', updatePost);

export default router;