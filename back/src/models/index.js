import sequelize from '../database/connect.js';
import { Sequelize } from 'sequelize';
import { defineAssociations } from '../models/relation.js';
import { seedDatabase } from '../database/init.js';

import Role from './roleModel.js';
import User from './userModel.js';

export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = Role;
db.user = User;

export const synchroniseDatabase = async () => {
  defineAssociations();
  try {
    await sequelize.sync({ alter: true });
    console.log('Les tables ont été synchronisées.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation des tables:', error);
    process.exit(1);
  }
};

export const resetDatabase = async () => {
  try {
    await sequelize.drop();
    console.log('All tables dropped!');
    defineAssociations();
    await sequelize.sync({ force: true });
    console.log('Les tables ont été synchronisées.');
    await seedDatabase();
  } catch (error) {
    console.error('Erreur lors de la synchronisation des tables:', error);
    process.exit(1);
  }
};
