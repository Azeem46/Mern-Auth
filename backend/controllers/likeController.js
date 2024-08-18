import Like from '../models/likeModel.js';
import Task from '../models/taskModel.js';

export const likeTask = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const existingLike = await Like.findOne({ user: req.user._id, task: taskId });
  if (existingLike) {
    return res.status(400).json({ message: 'Task already liked' });
  }

  const like = new Like({
    user: req.user._id,
    task: taskId
  });

  await like.save();

  task.likesCount += 1;
  await task.save();

  res.status(201).json({ message: 'Task liked', like });
};

export const unlikeTask = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const like = await Like.findOneAndDelete({ user: req.user._id, task: taskId });
  if (!like) {
    return res.status(400).json({ message: 'Task not liked yet' });
  }

  task.likesCount -= 1;
  await task.save();

  res.status(200).json({ message: 'Task unliked' });
};
