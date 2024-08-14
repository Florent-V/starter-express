// Update database/index.js
import fs from 'node:fs';

const updateDatabaseIndex = (entityName, modelName, modelFileName, indexPath) => {
  const importStatement = `import ${modelName} from './${modelFileName}';\n`;
  const dbAssignmentStatement = `db.${entityName} = ${modelName};\n`;

  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  if (!indexContent.includes(importStatement)) {
    // Ajouter l'import à la fin des imports
    const lastImportIndex = indexContent.lastIndexOf("import");
    const insertionPoint = indexContent.indexOf('\n', lastImportIndex);
    indexContent = indexContent.slice(0, insertionPoint + 1) + importStatement + indexContent.slice(insertionPoint + 1);
  }
  
  if (!indexContent.includes(dbAssignmentStatement)) {
    // Ajouter l'assignation à la fin des assignations db
    const dbEndIndex = indexContent.lastIndexOf('db.');
    const insertionPoint = indexContent.indexOf('\n', dbEndIndex);
    indexContent = indexContent.slice(0, insertionPoint + 1) + dbAssignmentStatement + indexContent.slice(insertionPoint + 1);
  }

  return indexContent;
}

export default updateDatabaseIndex;