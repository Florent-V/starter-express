import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { synchroniseDatabase } from './models/index.js';

import testRoute from './routes/testRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//TODO Set up CORS policy for the API
const corsOptions = {
  origin: "*", // TODO Remplacez par le domaine de l'application front-end
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "Content-Type", "Accept"],
  credentials: true // Autorise l'envoi de cookies et informations d'authentification
};
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Set up cookie session
app.use(
  cookieSession({
    name: `${process.env.PROJECT_NAME}-session`,
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
  })
);

// Route de test
app.use('', testRoute);
// Route d'authentification
app.use('/api/auth', authRoute);
// Route user
app.use('/api/user', userRoute);

app.listen(port, async () => {
  console.log(`Serveur démarré sur le port ${port}`);
  try {
    await synchroniseDatabase();
    console.log('Database connected');
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});