import dotenv from 'dotenv';

dotenv.config();

export default {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtPrivateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  jwtPublicKey: process.env.PUBLIC_KEY.replace(/\\n/g, '\n')
};
