import _ from 'lodash';
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";

// Récupération de tous les Utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll();
    users = _.map(users, obj => _.omit(obj.get(), ['password']));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupération d'un Utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Not Found' });
    }
    user = _.omit(user.get(), ['password']);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mise à jour d'un Utilisateur
export const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      let updatedUser = await User.findByPk(req.params.id);
      updatedUser = _.omit(updatedUser.get(), ['password']);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Suppression d'un Utilisateur
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modification du rôle d'un Utilisateur
export const addRoleUser = async (req, res) => {
  try {
    const { userId, roleId } = req.params;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ error: 'User or Role not found' });
    }
    // Ajouter le rôle à l'utilisateur
    await user.addRole(role);
    res.status(200).json({ message: 'Role added to user successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Suppression du rôle d'un Utilisateur
export const removeRoleUser = async (req, res) => {
  try {
    const { userId, roleId } = req.params;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
        return res.status(404).json({ error: 'User or Role not found' });
    }

    // Supprimer le rôle de l'utilisateur
    await user.removeRole(role);
    res.status(200).json({ message: 'Role removed from user successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
