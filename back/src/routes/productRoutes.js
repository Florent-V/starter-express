import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateProduct, validateUpdateProduct } from '../middleware/productMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.post('/', upload.single('image'), validateProduct, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.patch('/:id', upload.single('image'), validateUpdateProduct, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
