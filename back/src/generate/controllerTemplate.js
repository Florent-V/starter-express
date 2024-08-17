// Template Controller
const controllerTemplate = (modelName, entityName, modelFileName) => {
  return `import ${modelName} from '../models/${modelFileName}';
import NotFoundError from '../error/notFoundError.js';

// Création d'un ${modelName}
export const create${modelName} = async (req, res, next) => {
  try {
    const ${entityName} = await ${modelName}.create(req.body);
    res.status(201).json(${entityName});
  } catch (error) {
    return next(error)
  }
};

// Récupération de tous les ${modelName}s
export const getAll${modelName}s = async (req, res, next) => {
  try {
    const ${entityName}s = await ${modelName}.findAll();
    res.status(200).json(${entityName}s);
  } catch (error) {
    return next(error)
  }
};

// Récupération d'un ${modelName} par ID
export const get${modelName}ById = async (req, res, next) => {
  try {
    const ${entityName} = await ${modelName}.findByPk(req.params.id);
    if (!${entityName}) throw new NotFoundError('${entityName} Not Found');

    res.status(200).json(${entityName});
  } catch (error) {
    return next(error)
  }
};

// Mise à jour d'un ${modelName}
export const update${modelName} = async (req, res, next) => {
  try {
    const [updated] = await ${modelName}.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) throw new NotFoundError('${entityName} Not Found');

    const updated${modelName} = await ${modelName}.findByPk(req.params.id);
    res.status(200).json(updated${modelName});
  } catch (error) {
    return next(error)
  }
};

// Suppression d'un ${modelName}
export const delete${modelName} = async (req, res, next) => {
  try {
    const deleted = await ${modelName}.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) throw new NotFoundError('${entityName} Not Found');
    
    res.status(204).json();
  } catch (error) {
    return next(error)
  }
};
`;
}

export default controllerTemplate;