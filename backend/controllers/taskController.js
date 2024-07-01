import asyncHandler from '../middleware/asyncHandler.js';
import Task from '../models/taskModel.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const task = new Task({
    user: req.user._id,
    title,
    description,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// @desc    Get a task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.equals(req.user._id)) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;

  const task = await Task.findById(req.params.id);

  if (task && task.user.equals(req.user._id)) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed ?? task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task && task.user.equals(req.user._id)) {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  });

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
