const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: 'Status must be one of: pending, in-progress, completed'
    },
    default: 'pending'
  },
  due_date: {
    type: Date,
    required: [true, 'Due date is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true
});

// Index for efficient queries
taskSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Task', taskSchema);
