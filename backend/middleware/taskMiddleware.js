import { check, validationResult } from 'express-validator';

// Validation rules for creating a task
export const validateTaskCreation = [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').optional().isString().withMessage('Description must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation rules for updating a task
export const validateTaskUpdate = [
  check('title').optional().isString().withMessage('Title must be a string'),
  check('description').optional().isString().withMessage('Description must be a string'),
  check('isCompleted').optional().isBoolean().withMessage('isCompleted must be a boolean'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation rules for deleting a task
export const validateTaskDeletion = [
  check('id').isMongoId().withMessage('Invalid task ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
