import express from 'express';
import { signup, signin, logout } from '../controllers/authController.js';
import { validateSignup, validateSignin } from '../middleware/validationMiddleware.js';
import { checkDuplicateUsernameOrEmail } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, checkDuplicateUsernameOrEmail, signup);
router.post('/signin', validateSignin, signin);
router.post('/logout', logout);

export default router;
