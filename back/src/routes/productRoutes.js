import express from 'express';
import { createProduct, getUserProducts, getAllProducts, getProductById, updateProduct, deleteProduct, authorizeProductAccess } from '../controllers/productController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';
import { validateProduct, validateUpdateProduct } from '../middleware/productMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.post('/', upload.single('image'), validateProduct, createProduct);

router.get('/', getUserProducts);
router.get('/all', isAdmin, getAllProducts);
router.get('/:id', getProductById, authorizeProductAccess);

router.patch('/:id', getProductById, authorizeProductAccess, upload.single('image'), validateUpdateProduct, updateProduct);
router.delete('/:id', getProductById, authorizeProductAccess, deleteProduct);

export default router;
