#!/bin/bash

# Exécuter les commandes SQL
echo "Executing..."
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "
GRANT ALL PRIVILEGES ON *.* TO '${MYSQL_USER}'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
DROP USER 'root'@'%';
DROP USER 'root'@'localhost';
"

echo "Database initialization completed."
