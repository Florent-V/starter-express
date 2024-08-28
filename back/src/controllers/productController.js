import Product from '../models/productModel.js';
import NotFoundError from '../error/notFoundError.js';
import ForbiddenError from '../error/forbiddenError.js';

// Création d'un Product
export const createProduct = async (req, res, next) => {
  try {
    const userId = req.user.id; //
    req.body.image = req.file ? req.file.filename : "default.jpg";
    req.body.userId = userId;
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};

// Récupérer les produits de l'utilisateur connecté
export const getUserProducts = async (req, res) => {
  const userId = req.user.id;

  try {
    const products = await Product.findAll({ where: { userId } });
    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

// Récupération de tous les Products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

// Récupération d'un Product par ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new NotFoundError('Product Not Found');

    req.product = product;
    next();
  } catch (error) {
    return next(error);
  }
};

// Mise à jour d'un Product
export const updateProduct = async (req, res, next) => {
  try {
    if (req.file) req.body.image = req.file.filename;
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) throw new NotFoundError('Product Not Found');

    const updatedProduct = await Product.findByPk(req.params.id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

// Suppression d'un Product
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) throw new NotFoundError('Product Not Found');

    res.status(204).json();
  } catch (error) {
    return next(error);
  }
};

// Middleware pour vérifier l'accès à un produit
export const authorizeProductAccess = async (req, res, next) => {
  try {
    if (req.product.userId !== req.user.id) {
      throw new ForbiddenError('Access denied: You do not have permission to access this product');
    }
    res.data = req.product;
    next();
  } catch (error) {
    return next(error);
  }
};
