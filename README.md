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
- [AdminJS](#adminjs)
- [Docker](#docker)
- [Contributing](#contributing)

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

## AdminJS

You can access the AdminJS interface at http://localhost:${API_PORT}/admin-panel to manage your database.
For now it just a basic implementation to facilitate the development.
But with a little work you can add more features to use it in production.
Be carefull access to admin-panel is not protected by JWT token.
You will have to desactivate it in product or implement a middleware to protect it.

![img.png](img.png)

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

Contributions are welcome! Please follow these steps to contribute:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
