import express from 'express';
import { likeTask, unlikeTask } from '../controllers/likeController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/tasks/:taskId/like', protect, likeTask);
router.delete('/tasks/:taskId/unlike', protect, unlikeTask);

export default router;
