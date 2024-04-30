import express from 'express';
import { getPosts, getPost ,getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

import auth from '../middleware/auth.js';

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost); // with ':' I am trying to do dynamic action

export default router;