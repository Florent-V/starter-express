import express from 'express';
import { testNativeDbConnection, testSequelizeDbConnection } from '../database/test.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running...');
});

router.get('/test-native-connexion', async (req, res) => {
  await testNativeDbConnection();

  res.json({ message: 'API fonctionnelle' });
});

router.get('/test-sequelize-connexion', async (req, res) => {
  await testSequelizeDbConnection();

  res.json({ message: 'API fonctionnelle' });
});

// réinitialize database
router.get('/reset-database', async (req, res) => {

  res.json({ message: 'API fonctionnelle' });
});

export default router;