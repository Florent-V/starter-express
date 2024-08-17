import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (id, username) => {
  return jwt.sign(
    { id, username },
    config.jwtPrivateKey,
    { 
      expiresIn: 3600,
      algorithm: 'RS256'
     }
  );
};

export const authToken = (token) => {
  return jwt.verify(token, config.jwtPublicKey);
};

export const checkAccess = (roles, requiredRoles) => {
  return roles.some(role => requiredRoles.includes(role.name));
};

export const getAuthorities = async (user) => {
  const roles = await user.getRoles();
  const authorities = [];
  for (let i = 0; i < roles.length; i++) {
    authorities.push(`ROLE_${roles[i].name.toUpperCase()}`);
  }
  return authorities;
};

export const decode = (token) => {
  return jwt.decode(token);
}
