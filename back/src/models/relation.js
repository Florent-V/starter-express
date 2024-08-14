import { db } from './index.js';

export const defineAssociations = () => {
  db.role.belongsToMany(db.user, {
    through: 'user_role',
    foreignKey: 'roleId',
    otherKey: 'userId'
  });
  db.user.belongsToMany(db.role, {
    through: 'user_role',
    foreignKey: 'userId',
    otherKey: 'roleId'
  });
};