import express from 'express';
import UserController from '../controllers/UserController.js';
import ValidationErrorMessage from '../middlewares/handleErrorMessage.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/login', UserController.login);

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password should be at least 6 characters long')
], ValidationErrorMessage, UserController.register);

export default router;