import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Templates
import modelTemplate from './modelTemplate.js';
import controllerTemplate from './controllerTemplate.js';
import routeTemplate from './routeTemplate.js';
import updatedAppJsContent from './updateApp.js';
import updateDatabaseIndex from './updateDatabaseIndex.js';

const encoding = 'utf-8';

// Get __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), '..');

// Get entity name from command line arguments
const entityName = process.argv[2];
if (!entityName) {
  console.error('Vous devez spécifier un nom d\'entité.');
  process.exit(1);
}

// Folder and file names
const modelName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
const modelFileName = `${entityName}Model.js`
const controllerFileName = `${entityName}Controller.js`
const routesFileName = `${entityName}Route.js`
const middlewareFileName = `${entityName}Middleware.js`

// Paths
const modelPath = path.join(__dirname, 'models', modelFileName);
const controllerPath = path.join(__dirname, 'controllers', controllerFileName);
const routesPath = path.join(__dirname, 'routes', routesFileName);
const middlewarePath = path.join(__dirname, 'middleware', middlewareFileName);
const indexPath = path.join(__dirname, 'models', 'index.js');
const appJsPath = path.join(__dirname, 'app.js');

console.log('modelName :', modelName);
console.log('entityName :', entityName);
console.log('modelFileName', modelFileName);
console.log('controllerFileName :', controllerFileName);
console.log('routesFileName :', routesFileName);
console.log('middlewareFileName :', middlewareFileName);
console.log('modelPath', modelPath);
console.log('controllerPath :', controllerPath);
console.log('routesPath :', routesPath);
console.log('middlewarePath :', middlewarePath);
console.log('appJsPath :', appJsPath);
console.log('indexPath :', indexPath);
// console.log('modelTemplate :', modelTemplate(modelName, entityName));
// console.log('controllerTemplate :', controllerTemplate(modelName, entityName, modelFileName));
// console.log('routeTemplate :', routeTemplate(modelName, controllerFileName));
// console.log('updatedAppJsContent :', updatedAppJsContent(entityName, modelName, routesFileName, appJsPath));
// console.log('updateDatabaseIndex :', updateDatabaseIndex(entityName, modelName, modelFileName, indexPath));

// Middleware Express
const middlewareTemplate = `// ${middlewareFileName}`;

// Créer les répertoires si nécessaire
fs.mkdirSync(path.dirname(modelPath), { recursive: true });
fs.mkdirSync(path.dirname(controllerPath), { recursive: true });
fs.mkdirSync(path.dirname(routesPath), { recursive: true });
fs.mkdirSync(path.dirname(middlewarePath), { recursive: true });
// Écriture des fichiers

fs.writeFileSync(modelPath, modelTemplate(modelName, entityName), encoding);
fs.writeFileSync(controllerPath, controllerTemplate(modelName, entityName, modelFileName), encoding);
fs.writeFileSync(routesPath, routeTemplate(modelName, controllerFileName), encoding);
fs.writeFileSync(middlewarePath, middlewareTemplate, encoding);
fs.writeFileSync(appJsPath, updatedAppJsContent(entityName, modelName, routesFileName, appJsPath), encoding);
fs.writeFileSync(indexPath, updateDatabaseIndex(entityName, modelName, modelFileName, indexPath), encoding);

console.log('Les fichiers ont été générés avec succès et app.js a été mis à jour.');
