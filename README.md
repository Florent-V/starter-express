Redémarrez vos conteneurs avec :

docker-compose down
docker-compose up --build


Lorsque le conteneur MySQL démarrera, il exécutera automatiquement tous les scripts .sql présents dans le dossier /docker-entrypoint-initdb.d (qui correspond à votre dossier sql local) lors de la première initialisation de la base de données.

Quelques points importants à noter :

Cette méthode n'exécutera les scripts que lors de la première initialisation de la base de données. Si vous modifiez le script SQL et que vous voulez le réexécuter, vous devrez supprimer le volume de données MySQL et le recréer :

