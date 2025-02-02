import express from 'express';
import RecipeController from '../controllers/RecipeController.js';
import { body } from 'express-validator';
import ValidationErrorMessage from '../middlewares/handleErrorMessage.js';

const router = express.Router();

router.get('', RecipeController.index);

router.post('', [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('ingredients').notEmpty().withMessage('Ingredients is required').isArray({min: 3}).withMessage('Ingredients should be an array of at least 3 items')
], ValidationErrorMessage, RecipeController.store);

router.get('/:id', RecipeController.show);
router.patch('/:id', RecipeController.update);
router.delete('/:id', RecipeController.destroy);

export default router;