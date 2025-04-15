// app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import categoryRoutes from './routes/category.js';
import blogRoutes from './routes/blog.js';
import groupRoutes from './routes/group.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());  // For parsing application/json

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/group', groupRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);
app.use('/uploads', express.static('uploads'));


// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Node MongoDB CRUD API');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
