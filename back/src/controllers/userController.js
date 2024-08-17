import _ from 'lodash';
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import { getAuthorities } from '../utils/security.js';

// Récupération de tous les Utilisateurs
export const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.findAll();
    users = _.map(users, obj => _.omit(obj.get(), ['password']));
    res.status(200).json(users);
  } catch (error) {
    return next(error)
  }
};

// Récupération d'un Utilisateur par ID
export const getUserById = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id);
    if (!user) throw new NotFoundError('User Not Found');

    user = _.omit(user.get(), ['password']);
    res.status(200).json(user);
  } catch (error) {
    return next(error)
  }
};

// Mise à jour d'un Utilisateur
export const updateUser = async (req, res, next) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) throw new NotFoundError('User Not Found');

    let updatedUser = await User.findByPk(req.params.id);
    updatedUser = _.omit(updatedUser.get(), ['password']);
    res.status(200).json(updatedUser);
  } catch (error) {
    return next(error)
  }
};

// Suppression d'un Utilisateur
export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) throw new NotFoundError('User Not Found');

    res.status(204).json();
  } catch (error) {
    return next(error)
  }
};

// Modification du rôle d'un Utilisateur
export const addRoleUser = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) throw new NotFoundError('User or Role Not Found');

    // Ajouter le rôle à l'utilisateur
    await user.addRole(role);
    res.status(200).json({ message: 'Role added to user successfully' });
  } catch (error) {
    return next(error)
  }
};

// Suppression du rôle d'un Utilisateur
export const removeRoleUser = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) throw new NotFoundError('User or Role Not Found');

    // Supprimer le rôle de l'utilisateur
    await user.removeRole(role);
    res.status(200).json({ message: 'Role removed from user successfully' });
  } catch (error) {
    return next(error)
  }
};

// Récupération des informations de l'utilisateur connecté
export const getConnectedUser = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id);
    const autorities = await getAuthorities(user);
    user = _.omit(user.get(), ['password']);
    user.autorities = autorities;
    
    res.status(200).json(user);
  } catch (error) {
    return next(error)
  }
};
