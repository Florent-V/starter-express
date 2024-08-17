import { productSchema, updateProductSchema } from "../joiSchema/productJoiSchema.js";
import _ from 'lodash';
import BadRequestError from "../error/badRequestError.js";

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) throw new BadRequestError(error.details[0].message);

  req.body = _.pick(req.body, ['name', 'description', 'price', 'image', 'available', 'quantity', 'releaseDate']);

  next();
}

export const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) throw new BadRequestError(error.details[0].message);

  req.body = _.pick(req.body, ['name', 'description', 'price', 'image', 'available', 'quantity', 'releaseDate']);

  next();
}