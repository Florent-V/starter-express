import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(1).required(),
  description: Joi.string().min(3).max(255).required(),
  available: Joi.boolean().required(),
  quantity: Joi.number().min(1).required(),
  releaseDate: Joi.date().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  price: Joi.number().min(1),
  description: Joi.string().min(3).max(255),
  available: Joi.boolean(),
  quantity: Joi.number().min(1),
  releaseDate: Joi.date(),
});