import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'review', 'done'],
    default: 'open'
  },
  dueDate: {
    type: Date
  },
  color: {
    type: String,
    default: '#4299e1' // Default blue color
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for faster queries
taskSchema.index({ user: 1, status: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;