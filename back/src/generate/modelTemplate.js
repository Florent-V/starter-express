// Template Model
const modelTemplate = (modelName, entityName) => {
  return `// ${modelName}Model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const ${modelName} = sequelize.define('${modelName}', {
  // Définition des champs
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Ajouter d'autres champs ici
  },
  {
    tableName: '${entityName}',
  }
);

export default ${modelName};
`;
}
  
export default modelTemplate;