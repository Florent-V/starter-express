import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import config from '../config/config.js';

// Configuration de la base de données
const dbConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
};

// Fonction pour tester la connexion à la base de données
export async function testNativeDbConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('SELECT 1');
    console.log('Connexion à la base de données réussie');
    await connection.end();
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
}

export async function testSequelizeDbConnection() {
  try {
    const sequelize = new Sequelize(
      config.db.name,
      config.db.user,
      config.db.password,
      {
        host: config.db.host,
        dialect: config.db.dialect,
        pool: {
          max: config.db.pool.max,
          min: config.db.pool.min,
          acquire: config.db.pool.acquire,
          idle: config.db.pool.idle
        }
    });
    await sequelize.authenticate();
    console.log('Connexion à la base de données Sequelize réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données Sequelize:', error);
    process.exit(1);
  }
}