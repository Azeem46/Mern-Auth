import Task from '../models/taskModel.js';

// Get all tasks
export const getTasks = async (req, res) => {
  const userId = req.user._id; // Assuming req.user contains the authenticated user's information
  try {
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new task
export const addTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id; // Assuming req.user contains the authenticated user's information
  const task = new Task({ title, description, user: userId });
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const userId = req.user._id; // Assuming req.user contains the authenticated user's information
  try {
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title || task.title;
    task.description = description || task.description;
    task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
    task.updatedAt = new Date();

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Assuming req.user contains the authenticated user's information
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

