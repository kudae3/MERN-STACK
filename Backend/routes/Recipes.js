import express from 'express';
import RecipeController from '../controllers/RecipeController.js';

const router = express.Router();

router.get('', RecipeController.index);
router.post('', RecipeController.create);
router.get('/:id', RecipeController.show);
router.patch('/:id', RecipeController.update);
router.delete('/:id', RecipeController.delete);

export default router;