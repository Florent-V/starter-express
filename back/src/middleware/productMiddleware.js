import { productSchema, updateProductSchema } from "../joiSchema/productJoiSchema.js";
import _ from 'lodash';

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  req.body = _.pick(req.body, ['name', 'description', 'price', 'image', 'available', 'quantity', 'releaseDate']);

  next();
}

export const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  req.body = _.pick(req.body, ['name', 'description', 'price', 'image', 'available', 'quantity', 'releaseDate']);

  next();
}