// product.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  releaseDate: {
    type: DataTypes.DATE,
  },
  },
  {
    tableName: 'product',
  }
);

