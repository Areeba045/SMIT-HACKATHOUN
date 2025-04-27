import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['created', 'updated', 'deleted', 'status_changed']
  },
  details: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;