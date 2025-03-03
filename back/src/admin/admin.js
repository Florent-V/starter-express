// admin.js
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { componentLoader, Components } from './components.js'
import sequelize from '../database/connect.js';
import models from '../models/index.js';

console.log('models', models);

const fetchStats = async () => {
  const userCount = await models.user.count();
  const roleCount = await models.role.count();
  const productCount = await models.product.count();

  return [
    {
      entity: "utilisateurs",
      quantity: userCount
    },
    {
      entity: "roles",
      quantity: roleCount
    },
    {
      entity: "product",
      quantity: productCount
    }
  ]
};

// Initialiser AdminJS avec Sequelize
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const adminJS = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin-panel',
  dashboard: {
    component: Components.MyDashboard,
    handler: async () => {
      const stats = await fetchStats();
      console.log('stats:', stats);
      return stats;
    },
  },
  componentLoader,
  resources: [
    {
      resource: models.product,
      options: {
        // Options spécifiques au modèle
      },
    },
    // Ajoute d'autres ressources ici
  ],
  branding: {
    companyName: 'Task Manager', // Personnalise le titre de la page
    // logo: '/api/uploads/favicon-256.png', // Optionnel : chemin vers ton logo
    // favicon: '/api/uploads/favicon.ico', // Chemin vers ton favicon
  },
});

adminJS.watch()

// Initialiser l'adaptateur Express pour AdminJS
const adminRouter = AdminJSExpress.buildRouter(adminJS);

export { adminJS, adminRouter };
