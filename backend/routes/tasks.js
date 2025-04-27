import express from 'express';
import { protect } from '../middleware/auth.js';
import Task from '../models/Task.js';
import ActivityLog from '../models/ActivityLog.js';

const router = express.Router();

// Create a task
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, description, status, dueDate, color } = req.body;
    
    // Create task
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      color,
      user: req.user._id
    });
    
    // Create activity log
    await ActivityLog.create({
      user: req.user._id,
      task: task._id,
      action: 'created',
      details: `Task "${title}" was created`
    });
    
    res.status(201).json({
      success: true,
      task
    });
  } catch (err) {
    next(err);
  }
});

// Get all tasks for current user
router.get('/', protect, async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (err) {
    next(err);
  }
});

// Get a task
router.get('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }
    
    // Check task ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to access this task' 
      });
    }
    
    res.status(200).json({
      success: true,
      task
    });
  } catch (err) {
    next(err);
  }
});

// Update a task
router.put('/:id', protect, async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }
    
    // Check task ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to update this task' 
      });
    }
    
    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    // Create activity log for status change
    if (req.body.status && req.body.status !== task.status) {
      await ActivityLog.create({
        user: req.user._id,
        task: task._id,
        action: 'status_changed',
        details: `Task "${task.title}" status changed to ${req.body.status}`
      });
    } else {
      // Create activity log for general update
      await ActivityLog.create({
        user: req.user._id,
        task: task._id,
        action: 'updated',
        details: `Task "${task.title}" was updated`
      });
    }
    
    res.status(200).json({
      success: true,
      task
    });
  } catch (err) {
    next(err);
  }
});

// Delete a task
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }
    
    // Check task ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to delete this task' 
      });
    }
    
    // Save task title before deletion
    const taskTitle = task.title;
    
    // Delete task
    await task.deleteOne();
    
    // Create activity log
    await ActivityLog.create({
      user: req.user._id,
      task: req.params.id,
      action: 'deleted',
      details: `Task "${taskTitle}" was deleted`
    });
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

// Get activity logs for a user
router.get('/logs/activity', protect, async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({ user: req.user._id })
      .sort('-createdAt')
      .populate('task', 'title');
    
    res.status(200).json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (err) {
    next(err);
  }
});

export default router;