import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
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
  adminId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: true, 
  },
  memberId: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
