import models from './index.js';

const { role, user, product } = models;

export const defineAssociations = () => {
  role.belongsToMany(user, {
    through: 'user_role',
    foreignKey: 'roleId',
    otherKey: 'userId'
  });
  user.belongsToMany(role, {
    through: 'user_role',
    foreignKey: 'userId',
    otherKey: 'roleId'
  });
  product.belongsTo(user, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  user.hasMany(product, {
    foreignKey: 'userId'
  });
};
