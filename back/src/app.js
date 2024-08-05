import express from 'express';
import { testNativeDbConnection, testSequelizeDbConnection } from './database/connect.js';

const app = express();
const port = 3000;


// Route de test
app.get('/test-native-connexion', async (req, res) => {
  await testNativeDbConnection();

  res.json({ message: 'API fonctionnelle' });
});

app.get('/test-sequelize-connexion', async (req, res) => {
  await testSequelizeDbConnection();

  res.json({ message: 'API fonctionnelle' });
});


app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});