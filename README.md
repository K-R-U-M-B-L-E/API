# API

## Default Branch : DEV

"Dev" branch is the master branch for developpement of new features only ! Create your own branch to work on features
before merging on "dev" branch.

## Branch TEST

"Test" branch is used after a dev feature is done on the "dev" branch, to perform test.

## Branch NEXT

"Next" branch gather features tested that are ready to be merged into production.

## Branch PROD

"Prod" branch is the production branch. DO NOT MERGE ANYTHING ON IT !!

## Branch BACKUP

"Backup" branch is a copy of "Prod" branch, to avoid losing time when prod branch needs to be rebase in emergency.

# Documentation: Outils de developpement

## Prettier : formatage du code

- commande à lancer depuis **la racine du projet** pour formater le code:

```
  npx prettier --write . --config .\config\.prettierrc --ignore-path .\config\.prettierignore
```

## Postman et Docker : Tests en local

#### Commandes

- si vous êtes sur windows, assurez-vous que l'application Docker Desktop est bien ouverte

- commande à lancer depuis **la racine du projet** pour lancer le serveur de test:

```
  cd .\config\ && docker-compose up --build
```

- accéder à Postman depuis le naviguateur et lancer la testsuite :

https://krumble-api.postman.co/workspace/Krumble~ed50cd74-a4d3-4759-8a42-069c8d7ba254/run/24658675-b844f921-4040-4876-bc9c-1a0845135dc8

- accéder à la base de donnés mongo conteneurisé depuis le terminal (1ère solution):

```
  docker exec -it db_container mongod
 ```

- accéder à la base de donnés mongo conteneurisé depuis le terminal (2nde solution):

```
  mongosh --port 2717
```

#### Remarques :

- on utilise docker compose à cause d’un **problème de dépendance** : le docker backend ne peut démarrer qu’après le
  docker mongo

- Malheureusement, il n'y a pas d'option pour spécifier l'emplacement du fichier .dockerignore,
  Il est donc impossible de le placer dans le config avec le reste des fichiers de configuration.

- il est important de passer l'attribut --build à docker compose : sinon les modifications apportées ne sont pas prises
  en compte

#### Sources :

- la configuration docker a été mise en place avec l'aide de la vidéo :

https://www.youtube.com/watch?v=vm3YfOHf_Cc

- l'initialisation de la base de données mongodb a été mise en place avec l'aide de la
  réponse :

https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up

- la configuration d'eslint et de prettier a été mise en place grâce au github :

https://gist.github.com/geordyjames/b071e0bb13e74dea94ec37a704d26b8b