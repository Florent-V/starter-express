import { signupSchema, signinSchema } from "../utils/validationSchema.js";
import _ from 'lodash';

export const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  req.body = _.pick(req.body, ['username', 'firstName', 'lastName', 'email', 'password']);

  next();
}

export const validateSignin = (req, res, next) => {
  const { error } = signinSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  req.body = _.pick(req.body, ['email', 'password']);

  next();
}