import sequelize from '../database/connect.js';
import { Sequelize } from 'sequelize';

import Role from './roleModel.js';
import User from './userModel.js';
import Product from './productModel.js';

export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.role = Role;
db.user = User;
db.Product = Product;
