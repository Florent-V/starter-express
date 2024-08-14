// Template Controller
const controllerTemplate = (modelName, entityName, modelFileName) => {
  return `import ${modelName} from '../models/${modelFileName}';

// Création d'un ${modelName}
export const create${modelName} = async (req, res) => {
  try {
    const ${entityName} = await ${modelName}.create(req.body);
    res.status(201).json(${entityName});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupération de tous les ${modelName}s
export const getAll${modelName}s = async (req, res) => {
  try {
    const ${entityName}s = await ${modelName}.findAll();
    res.status(200).json(${entityName}s);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupération d'un ${modelName} par ID
export const get${modelName}ById = async (req, res) => {
  try {
    const ${entityName} = await ${modelName}.findByPk(req.params.id);
    if (!${entityName}) {
      return res.status(404).json({ error: 'Not Found' });
    }
    res.status(200).json(${entityName});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mise à jour d'un ${modelName}
export const update${modelName} = async (req, res) => {
  try {
    const [updated] = await ${modelName}.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updated${modelName} = await ${modelName}.findByPk(req.params.id);
      res.status(200).json(updated${modelName});
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Suppression d'un ${modelName}
export const delete${modelName} = async (req, res) => {
  try {
    const deleted = await ${modelName}.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
`;
}

export default controllerTemplate;