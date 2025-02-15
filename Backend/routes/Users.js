import express from 'express';
import UserController from '../controllers/UserController.js';
import ValidationErrorMessage from '../middlewares/handleErrorMessage.js';
import { body } from 'express-validator';
import User from '../models/User.js';

const alreadyExists = async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
        throw new Error('E-mail already in use');
    }
    return true;
};

const notExists = async (value) => {
    const user = await User.findOne({ email: value });
    if (!user) {
        throw new Error('Email not found');
    }
    return true;
}

const router = express.Router();

router.post('/login', [
    body('email')
        .notEmpty().withMessage('Email is required')
        .custom(notExists),
    body('password')
        .notEmpty().withMessage('Password is required')
], ValidationErrorMessage, UserController.login);

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .custom(alreadyExists),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password should be at least 6 characters long')
], ValidationErrorMessage, UserController.register);

export default router;