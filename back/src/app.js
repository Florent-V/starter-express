import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { synchroniseDatabase, resetDatabase } from './database/utils.js';
import { db } from './models/index.js';
import  { errorHandler, notFound, logError } from './middleware/errorMiddleware.js';

import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

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
    sameSite: 'strict'
  })
);

// serve the `backend/public` folder for public resources
app.use(express.static('public'))

// Test Routes
app.use('', testRoutes);
// Auth Routes
app.use('/api/auth', authRoutes);
// User Routes
app.use('/api/user', userRoutes);
// Tutorial Routes
app.use('/api/product', productRoutes);

//error middleware
app.use(logError);
app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Serveur démarré sur le port ${port}`);
  try {
    await synchroniseDatabase(db, 'alter');
    //await resetDatabase();
    console.log('Database connected');
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
