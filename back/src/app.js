const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Fonction pour tester la connexion à la base de données
async function testDbConnection() {
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

// Route de test
app.get('/', async (req, res) => {
  await testDbConnection();
  res.json({ message: 'API fonctionnelle' });
});


app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});