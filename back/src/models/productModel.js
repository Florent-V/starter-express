// product.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Product = sequelize.define('Product', {
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
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

export default Product;