import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/userModel.js';
import { Op } from 'sequelize';


export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, config.jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export const verifyToken = (req, res, next) => {
  console.log('verifyToken', req);
  console.log('verifyToken', req.headers);
  const token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  try {
    jwt.verify(token, config.jwtSecret)
    req.user = verified;
    next();

  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const roles = await user.getRoles();

    const access = checkAccess(roles, ['admin']);
    if (access) {
      return next();
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",

    });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const roles = await user.getRoles();

    const access = checkAccess(roles, ['moderator']);
    if (access) {
      return next();
    }

    return res.status(403).send({
      message: "Require Moderator Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Moderator role!",
    });
  }
};

export const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const roles = await user.getRoles();

    const access = checkAccess(roles, ['moderator', 'admin']);
    if (access) {
      return next();
    }

    return res.status(403).send({
      message: "Require Moderator or Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Moderator or Admin role!",
    });
  }
};

const checkAccess = (roles, access) => {
  console.log('checkAccess', roles, access);
  return roles.some(role => access.includes(role.name));
};

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    });

    if (user) {
      return res.status(400).send({
        field: "email",
        message: user.username === req.body.username
          ? "Failed! Username is already in use!"
          : "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username or Email!",
      error
    });
  }
};
