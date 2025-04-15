import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  description: {
    type: String,
    required: true,
    trim: true, 
  },
  image: {
    type: String, 
    required: false, 
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
