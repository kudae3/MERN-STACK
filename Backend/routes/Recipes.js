import express from 'express';
import RecipeController from '../controllers/RecipeController.js';
import { body } from 'express-validator';
import ValidationErrorMessage from '../middlewares/handleErrorMessage.js';

const router = express.Router();

const noDuplicates = (value) => {
    if (Array.isArray(value)) {
        const uniqueItems = new Set(value);
        if (uniqueItems.size !== value.length) {
            throw new Error('Ingredients should not contain duplicates');
        }
    }
    return true;
};

router.get('', RecipeController.index);

router.post('', [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('ingredients')
    .notEmpty().withMessage('Ingredients is required')
    .custom(noDuplicates)
    .isArray({min: 3}).withMessage('Ingredients should be an array of at least 3 items')
], ValidationErrorMessage, RecipeController.store);

router.get('/:id', RecipeController.show);
router.patch('/:id', RecipeController.update);
router.delete('/:id', RecipeController.destroy);

export default router;