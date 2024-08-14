import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  firstName: Joi.string().min(3).max(30),
  lastName: Joi.string().min(3).max(30),
  email: Joi.string().email(),
});
