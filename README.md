# Billed Backend

Backend du projet OpenClassrooms P9 Billed.

Cette API gere l'authentification, les utilisateurs et les notes de frais consommees par le frontend. Les donnees sont stockees en SQLite et les migrations sont gerees avec Sequelize.

## Stack

- Node.js
- Express
- Sequelize
- SQLite
- Multer
- JSON Web Token
- Jest
- Supertest

## Prerequis

- Node.js
- npm

Version verifiee dans ce repo : `Node.js 24.0.2` et `npm 11.3.0`.

## Installation

```bash
cd Billed-app-FR-Back-main
npm install
```

## Lancer l'API

```bash
cd Billed-app-FR-Back-main
npm run run:dev
```

L'API est disponible sur :

```text
http://localhost:5678
```

Le script `run:dev` applique automatiquement les migrations sur la base de developpement.

## Base de donnees et migrations

- Base de developpement : `database_dev.sqlite`
- Base de test : `database_test.sqlite`
- Configuration Sequelize : `config/config.json`
- Migrations : dossier `migrations/`

## Comptes de test

Ces comptes sont verifies dans `database_dev.sqlite` :

```text
Administrateur
email : admin@test.tld
mot de passe : admin

Employe
email : employee@test.tld
mot de passe : employee
```

## API disponible

Routes exposees par l'application :

- `/auth`
- `/users`
- `/bills`

Exemple de route verifiee dans les tests :

- `POST /auth/login`

## Tests

Lancer toute la suite :

```bash
npm test
```

Ce script :

- applique les migrations sur l'environnement `test`
- execute toute la suite Jest sans mode watch

Resultat actuel :

```text
6/6 suites
40/40 tests
```

## Commandes utiles

```bash
npm run run:dev
npm test
npm run lint
```

## Structure du projet

```text
app.js           configuration Express
server.js        point d'entree du serveur
config/          configuration Sequelize
controllers/     logique metier
middlewares/     middleware d'authentification
migrations/      schema de base de donnees
models/          modeles Sequelize
public/          fichiers uploades
routes/          routes API
services/        services JWT / password
tests/           tests d'integration API
```

## Notes de setup

- Les uploads sont stockes dans le dossier `public/`.
- Les tests backend s'appuient sur la base SQLite de test et reinitialisent les fixtures automatiquement.
- Le script `npm test` est maintenant portable Windows / macOS / Linux via `cross-env`.
