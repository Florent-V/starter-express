import sequelize from './connect.js';
import { defineAssociations } from '../models/relation.js';
import { seedDatabase } from '../database/init.js';


export const synchroniseDatabase = async (db, option) => {
  defineAssociations();
  try {
    await db.sequelize.sync({ [option]: true });
    console.log(`Database synced with ${option} option.`);
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