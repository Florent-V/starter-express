// Update app.js
import fs from 'node:fs';

const updatedAppJsContent = (entityName, modelName, routesFileName, appJsPath) => {
  const appImportStatement = `import ${entityName}Routes from './routes/${routesFileName}';\n`;
  const useStatement = `// ${modelName} Routes\napp.use('/api/${entityName}', ${entityName}Routes);\n`;

  // Vérifier si les lignes existent déjà
  let appJsContent = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsContent.includes(appImportStatement)) {
    // Ajouter l'import à la fin des imports
    const lastImportIndex = appJsContent.lastIndexOf("import");
    const insertionPoint = appJsContent.indexOf('\n', lastImportIndex);
    appJsContent = appJsContent.slice(0, insertionPoint + 1) + appImportStatement + appJsContent.slice(insertionPoint + 1);
  }
  if (!appJsContent.includes(useStatement)) {
    const lastUseIndex = appJsContent.lastIndexOf('app.use(');
    const insertionPoint = appJsContent.indexOf('\n', lastUseIndex);
    appJsContent = appJsContent.slice(0, insertionPoint + 1) + useStatement + appJsContent.slice(insertionPoint + 1);
  }

  return appJsContent;
}

export default updatedAppJsContent;