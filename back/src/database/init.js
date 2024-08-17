import models from "../models/index.js";
import sequelize from '../database/connect.js';
import { defineAssociations } from '../models/relation.js';
import { seedDatabase } from "./seed.js";

// Initialisation et synchronisation de la base de données
const initDB = async (option) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Setup relations
    defineAssociations();

    // Synchronisation des modèles avec la base
    await sequelize.sync({ [option]: true });
    console.log(`Database synced with ${option} option.`);

    // Seed the database with test data
    if (option === 'force') {
      await seedDatabase();
      console.log('Database seeded with test data.');
    }

  } catch (error) {
    console.error('Something went wrong with the database:', error);
  }
};

export default initDB;
