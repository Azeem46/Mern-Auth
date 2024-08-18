import express from 'express';
import { likeTask, unlikeTask } from '../controllers/likeController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming you have an auth middleware

const router = express.Router();

router.post('/tasks/:taskId/like', protect, likeTask);
router.delete('/tasks/:taskId/unlike', protect, unlikeTask);

export default router;
