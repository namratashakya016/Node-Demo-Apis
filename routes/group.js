import express from 'express';
import upload from '../middlewares/upload.js';
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from '../controllers/groupController.js';

const router = express.Router();

router.post('/', upload.single('image'),createGroup);
router.get('/', getGroups);
router.get('/:id', getGroupById);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

export default router;
