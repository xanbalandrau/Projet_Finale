# Back-end

## Description

## Prérequis

- Node.js
- npm

## Dépendance installé

<img src="../ressources/screendupackage">

## Lancé

```
npm start
```
Pour les dev :
```
npm run dev
```

## Utilisation

Pour se connecter sur le dashboard :

```
email : xan@gmail.com
password : xan
```

## UML

<img src="../ressources/" width="1000">

## Structure du projet

```
.
├── node_modules
├── uploads
├── src/
│   ├── controllers/
│   │   ├── skillController.js
│   │   ├── userController.js
│   ├── db/
│   │   ├── db.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   ├── models/
│   │   ├── Settings.js
│   │   ├── Skills.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── skillRoutes.js
│   │   ├── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── README.md
├── server.js
```

- Dans .env :

```

```

- Dans .gitignore :

```
node_modules
.env
```

## API Endpoints

| Méthode    | Endpoint                | Description                      |
| ---------- | ----------------------- | -------------------------------- |
| **GET**    | `/api/users/`           | Liste des utilisateurs           |
| **POST**   | `/api/users/register`   | Créer un utilisateur             |
| **POST**   | `/api/users/login`      | Se connecter                     |
| **GET**    | `/api/skills/`          | Liste des skills                 |
| **POST**   | `/api/skills//addSkill` | Ajouter un skill à l'utilisateur |
| **PUT**    | `/api/skills/:id`       | Mettre à jour un skill           |
| **DELETE** | `/api/skills/:id`       | Supprimer un skill               |
