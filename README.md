# CRUD REST API start with Nodejs + Express + MySQL + Sequelize + Docker + JWT Authentification
---

> This is a simple API made in Nodejs and Express with :
> - CRUD operations with MySQL and Sequelize
> - JWT Authentication
> - Roles based authentication  
> - Docker

## Table of Contents

- [Configuration](#configuration)
- [How To Setup](#how-to-setup)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Configuration

1. Copy the `.env.template` file to `.env` and configure the variables as needed.
2. Configuration of PRIVATE and PUBLIC key for JWT token :
- Generate private key :  
`openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096`
- Generate public key :  
`openssl rsa -pubout -in private_key.pem -out public_key.pem`
- Copy the content of the private and public key in the .env file :  
`cat private_key.pem`  
`cat public_key.pem` 

## How To Setup

- `git clone https://github.com/Florent-V/starter-express.git`
- `cd starter-express`
- configure .env file. See [Setup configuration](#configuration)
- `docker compose up --build`
- Enjoy !

> The project will start locally at localhost:${API_PORT}

> I haven't try to launch the project without docker, but you can try with `npm start` or `npm run dev` if you have a MySQL database running on your machine. Don't forget to configure the .env file in the root of the project.

## API Endpoints

**Test**
- GET /test-native-conexion
- GET /test-sequelize-conexion
---
**Authentification**
- POST /signup
- POST /signin
- POST /logout
---
**User**
All following routes are protected by JWT token. You need to be authenticated to access them.
- GET /user  `Get all users (only for admin or moderator)`
- GET /user/me
- GET /user/{:id} `Get a user by id (only for admin)`
- PATCH /user/{:id} `Edit a user by id (only for admin)`
- POST /user/{:userId}/role/{:roleId} `Add a role to a user (only for admin)`
- DELETE /user/{:id} `Delete a user by id (only for admin)`
- DELETE /user/{:userId}/role/{:roleId} `Delete a role to a user (only for admin)`
---
**Product**
All following routes are protected by JWT token. You need to be authenticated to access them.
Product are linked to a user. Only the user who created the product can get, edit or delete it.
- GET /product `Get all user's products`
- GET /product/all `Get all products (only for admin)`
- POST /product
- GET /product/{:id} `Get a product by id(only for the user who created it)`
- PATCH /product/edit/{:id} `Edit a product by id(only for the user who created it)`
- POST /product/{:id} `Delete a product by id(only for the user who created it)`
- DELETE /product/{:id} `Delete a product by id(only for the user who created it)`

I've made a script to generate a crud for a new entity :
- `npm run generate-crud -- EntityName`

## Docker

### Start the containers
```bash	
docker-compose up --build
```

### Stop the containers
```bash
docker-compose down
```

### Restart the containers
```bash
docker-compose down
docker-compose up --build
```

### Access to the MySQL container
```bash
docker exec -it ${PROJECT_NAME}-app-${ENV_NAME} sh
```

### Access to the Node container
```bash
docker exec -it ${PROJECT_NAME}-db-${ENV_NAME} sh
```

### Execute a SQL script in the MySQL container

#### Method 1 : Script already in the container
```bash
docker exec -i <container_name_or_id> mysql -u<username> -p<password> <database_name> < /path/to/script.sql
```

```bash
docker exec -i my_mysql_container mysql -uroot -pmysecretpassword mydatabase < /path/to/script.sql
```

#### Method 2 : Copy the script in the container and execute it

```bash
docker cp /path/to/script.sql <container_name_or_id>:/script.sql
docker exec -i <container_name_or_id> mysql -u<username> -p<password> <database_name> < /script.sql
```

#### Method 3 : Access to the shell
```bash
docker exec -it <container_name_or_id> sh
# and
mysql -u<username> -p<password>
# and
source /path/to/script.sql
```
Or
```bash
docker exec -it <container_name_or_id> mysql -u<username> -p<password>
# and
source /path/to/script.sql
```

#### Method 4 : Docker-compose

Before the `docker-compose up --build` command, add the following lines in the `docker-compose.yml` file if you want to execute the scripts at the start of the MySQL container :

```yml
services:
  app:
    volumes:
      - ./sql:/docker-entrypoint-initdb.d
```

Then, create a `sql` folder at the root of the project and put your `.sql` files in it.


#### Export the database
```bash
docker exec -i <container_name_or_id> mysqldump -u<username> -p<password> <database_name> > /path/to/script.sql
```
Or
```bash
docker exec -it <container_name_or_id> sh
# and
mysqldump -u<username> -p<password> <database_name> > /path/to/script.sql
```


## Contributing

Les contributions sont les bienvenues ! Veuillez suivre les étapes suivantes pour contribuer :

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`).
4. Poussez vers la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

## License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.


Redémarrez vos conteneurs avec :

docker-compose down
docker-compose up --build


Lorsque le conteneur MySQL démarrera, il exécutera automatiquement tous les scripts .sql présents dans le dossier /docker-entrypoint-initdb.d (qui correspond à votre dossier sql local) lors de la première initialisation de la base de données.

Quelques points importants à noter :

Cette méthode n'exécutera les scripts que lors de la première initialisation de la base de données. Si vous modifiez le script SQL et que vous voulez le réexécuter, vous devrez supprimer le volume de données MySQL et le recréer :