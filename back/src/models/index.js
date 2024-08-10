import sequelize from '../database/connect.js';
import { Sequelize } from 'sequelize';

import Role from './roleModel.js';
import User from './userModel.js';

export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.role = Role;
db.user = User;


