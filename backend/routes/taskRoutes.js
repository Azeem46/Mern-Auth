import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { validateTaskCreation, validateTaskUpdate, validateTaskDeletion } from '../middleware/taskMiddleware.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(validateTaskCreation, addTask); // Add validation middleware

router.route('/:id')
  .patch(validateTaskUpdate, updateTask)  // Add validation middleware
  .delete(validateTaskDeletion, deleteTask);

export default router;
