import express from 'express';
import upload from '../middlewares/upload.js';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// CRUD API routes         r
router.post('/', upload.single('image'), createUser);// Create Use
router.get('/', getUsers);            // Get all Users
router.get('/:id', getUserById);      // Get single User
router.put('/:id', updateUser);       // Update User
router.delete('/:id', deleteUser);    // Delete User

export default router;
