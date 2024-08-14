// role.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
  },
  },
  {
    tableName: 'role',
  }
);

export default Role;
