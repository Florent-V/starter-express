Redémarrez vos conteneurs avec :

docker-compose down
docker-compose up --build


Lorsque le conteneur MySQL démarrera, il exécutera automatiquement tous les scripts .sql présents dans le dossier /docker-entrypoint-initdb.d (qui correspond à votre dossier sql local) lors de la première initialisation de la base de données.

Quelques points importants à noter :

Cette méthode n'exécutera les scripts que lors de la première initialisation de la base de données. Si vous modifiez le script SQL et que vous voulez le réexécuter, vous devrez supprimer le volume de données MySQL et le recréer :

## NodeJs CRUD REST API

---

> This is a simple API made in Nodejs with CRUD Operation for Tutorials, with JWT Authentication. Routes are protected by the authentication

### How To Setup

- `git clone https://github.com/sagar608/nodejs-crud-api.git`
- `cd nodejs-crud-api`
- `npm install`
- configure .env file
- `npm start` || `npm run dev`

> The project will start locally at localhost:3000

# API Endpoints

---

- POST /user/signup
- POST /user/login

- GET /tutorial/
- POST /tutorial/new
- GET /tutorial/{:id}
- POST /tutorial/edit/{:id}
- POST /tutorial/delete/{:id}