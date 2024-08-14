import sequelize from './connect.js';
import Role from '../models/roleModel.js';
import User from '../models/userModel.js';

export const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const roles = await Role.bulkCreate([
      { name: 'user' },
      { name: 'moderator' },
      { name: 'admin' },
    ]);

    const users = await User.bulkCreate([
      {
        username: 'user',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'user@mail.com',
        password: '$2a$10$KH1D8E6BfPJFsoxBJYA5TuVItCzipAxI52JiRl0gKLKCgMOsjM.6q',
      },
      {
        username: 'moderator',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'moderator@mail.com',
        password: '$2a$10$KH1D8E6BfPJFsoxBJYA5TuVItCzipAxI52JiRl0gKLKCgMOsjM.6q',
      },
      {
        username: 'admin',
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'admin@mail.com',
        password: '$2a$10$KH1D8E6BfPJFsoxBJYA5TuVItCzipAxI52JiRl0gKLKCgMOsjM.6q',
      },
    ]);

    await users[0].addRole(roles[0]);
    await users[1].addRole(roles[1]);
    await users[2].addRole(roles[1]);
    await users[2].addRole(roles[2]);

    console.log('Données de test créées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la création des données de test :', error);
    process.exit(1);
  }
};
