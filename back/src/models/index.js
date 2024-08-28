import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Déterminer le répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

// Fonction pour charger dynamiquement les modèles
const loadModels = async () => {
  const files = fs.readdirSync(__dirname).filter(file => {
    return file.endsWith('Model.js') && file !== 'index.js';
  });

  // Importer chaque modèle de manière dynamique
  for (const file of files) {
    const model = await import(path.join(__dirname, file));
    const modelName = path.basename(file, 'Model.js');
    models[modelName] = model.default;
  }
};

await loadModels();

export default models;
