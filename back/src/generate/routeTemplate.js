// Route Template
const routeTemplate = (modelName, controllerFileName) => {
  return `import express from 'express';
import { create${modelName}, getAll${modelName}s, get${modelName}ById, update${modelName}, delete${modelName} } from '../controllers/${controllerFileName}';

const router = express.Router();

router.post('/', create${modelName});
router.get('/', getAll${modelName}s);
router.get('/:id', get${modelName}ById);
router.put('/:id', update${modelName});
router.delete('/:id', delete${modelName});

export default router;
`;
}

export default routeTemplate;