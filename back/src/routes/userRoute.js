import express from 'express';
import { allAccess, userBoard, adminBoard, moderatorBoard } from '../controllers/userController.js';
import { authenticateToken, isAdmin, isModerator, isModeratorOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', allAccess);
router.get('/user', authenticateToken, userBoard);
router.get('/mod', authenticateToken, isModerator, moderatorBoard);
router.get('/admin', authenticateToken, isAdmin, adminBoard);

export default router;