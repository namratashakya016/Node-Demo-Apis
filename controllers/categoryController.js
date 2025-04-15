import slugify from 'slugify'; 
import Category from '../models/category.js';


// ✅ Create a new category
export const createCategory = async (req, res) => {
  const { name, description, status } = req.body;

  try {
    const slug = slugify(name, { lower: true, strict: true }); // 👈 Add this
    const newCategory = new Category({ name, description, status, slug });
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Category already exists',
        error: {
          code: 409,
          details: error.keyValue
        }
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error creating category',
      error: {
        code: 400,
        details: error.message
      }
    });
  }
};


// ✅ Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Get category by ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
        error: {
          code: 404,
          details: 'No category with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category fetched successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Update a category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  try {
    const updatedData = { name, description, status };

    if (name) {
      updatedData.slug = slugify(name, { lower: true, strict: true });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
        error: {
          code: 404,
          details: 'No category with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating category',
      error: {
        code: 400,
        details: error.message
      }
    });
  }
};


// ✅ Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
        error: {
          code: 404,
          details: 'No category with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: deletedCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};
