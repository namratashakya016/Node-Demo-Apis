import Blog from '../models/blog.js';
import Category from '../models/category.js';
import mongoose from 'mongoose';

// ✅ Create a new blog post
export const createBlog = async (req, res) => {
  try {
    const { name, description, image, categoryId } = req.body;

    // Validate required fields
    if (!name || !description || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: {
          code: 400,
          details: 'Name, description, and categoryId are required'
        }
      });
    }

    // Validate categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID format',
        error: {
          code: 400,
          details: 'categoryId must be a valid ObjectId'
        }
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
        error: {
          code: 404,
          details: 'No category with provided ID'
        }
      });
    }

    const newBlog = new Blog({ name, description, image, categoryId });
    await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: newBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('categoryId');
    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Get a blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid blog ID format',
      error: {
        code: 400,
        details: 'ID must be a valid ObjectId'
      }
    });
  }

  try {
    const blog = await Blog.findById(id).populate('categoryId');
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        error: {
          code: 404,
          details: 'No blog with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog fetched successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Update a blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid blog ID format',
      error: {
        code: 400,
        details: 'ID must be a valid ObjectId'
      }
    });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        error: {
          code: 404,
          details: 'No blog with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog',
      error: {
        code: 400,
        details: error.message
      }
    });
  }
};

// ✅ Delete a blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid blog ID format',
      error: {
        code: 400,
        details: 'ID must be a valid ObjectId'
      }
    });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        error: {
          code: 404,
          details: 'No blog with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      data: deletedBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};
