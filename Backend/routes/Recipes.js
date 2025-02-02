import express from 'express';
import RecipeController from '../controllers/RecipeController.js';

const router = express.Router();

// Get all recipes
router.get('/', RecipeController.index);

export default router;