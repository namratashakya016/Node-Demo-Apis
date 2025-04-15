import Group from '../models/group.js';
import mongoose from 'mongoose';

// ✅ Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, description, image, adminId, memberId, status } = req.body;

    if (!name || !adminId || !memberId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: {
          code: 400,
          details: 'name, adminId and memberId are required'
        }
      });
    }

    const newGroup = new Group({ name, description, image, adminId, memberId, status });
    await newGroup.save();

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      data: newGroup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating group',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Get all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('adminId')
      .populate('memberId');

    res.status(200).json({
      success: true,
      message: 'Groups fetched successfully',
      data: groups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching groups',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Get group by ID
export const getGroupById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid group ID format',
      error: {
        code: 400,
        details: 'ID must be a valid ObjectId'
      }
    });
  }

  try {
    const group = await Group.findById(id)
      .populate('adminId')
      .populate('memberId');

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found',
        error: {
          code: 404,
          details: 'No group with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Group fetched successfully',
      data: group
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching group',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};

// ✅ Update group by ID
export const updateGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid group ID format',
      error: {
        code: 400,
        details: 'ID must be a valid ObjectId'
      }
    });
  }

  try {
    const updatedGroup = await Group.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedGroup) {
      return res.status(404).json({
        success: false,
        message: 'Group not found',
        error: {
          code: 404,
          details: 'No group with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Group updated successfully',
      data: updatedGroup
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating group',
      error: {
        code: 400,
        details: error.message
      }
    });
  }
};

// ✅ Delete group by ID
export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid group ID format',
      error: {
        code: 400,
        details: 'ID must be a valid ObjectId'
      }
    });
  }

  try {
    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      return res.status(404).json({
        success: false,
        message: 'Group not found',
        error: {
          code: 404,
          details: 'No group with given ID'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Group deleted successfully',
      data: deletedGroup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting group',
      error: {
        code: 500,
        details: error.message
      }
    });
  }
};
