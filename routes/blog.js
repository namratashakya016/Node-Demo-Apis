import express from 'express';
import upload from '../middlewares/upload.js';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';

const router = express.Router();

router.post('/',upload.single('image'), createBlog);
router.get('/', getBlogs); 
router.get('/:id', getBlogById); 
router.put('/:id', updateBlog); 
router.delete('/:id', deleteBlog); 

export default router;
