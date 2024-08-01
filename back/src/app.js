const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuration de la base de données
const dbConfig = {
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PWD,
  database: process.env.MYSQL_DB_NAME,
};

async function testConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connecté à la base de données MySQL.');
    await connection.end();
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
  }
}

testConnection();

// Endpoint simple
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur Node.js démarré sur http://localhost:${port}`);
});
