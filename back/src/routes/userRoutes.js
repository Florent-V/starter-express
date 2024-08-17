import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, addRoleUser, removeRoleUser, getConnectedUser } from '../controllers/userController.js';
import { authenticateToken, isAdmin, isModerator, isModeratorOrAdmin } from '../middleware/authMiddleware.js';
import { validateUpdateUser } from '../middleware/userMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', isModeratorOrAdmin, getAllUsers);
router.get('/me', getConnectedUser);
router.get('/:id', isModeratorOrAdmin, getUserById);


router.patch('/:id', isAdmin, validateUpdateUser, updateUser);

router.post('/:userId/role/:roleId', isAdmin, addRoleUser);

router.delete('/:userId/role/:roleId', isAdmin, removeRoleUser);
router.delete('/:id', isAdmin, deleteUser);

export default router;