# Billed Backend

API Express et SQLite du projet OpenClassrooms de gestion des notes de frais. Elle fournit la connexion, les comptes, les notes et leurs justificatifs.

[Frontend Billed sur GitHub](https://github.com/DRGYZ/Billed-app-FR-Front-main)

## Lancer la démo

Dans le dépôt backend, avec Node.js 24 et npm :

```sh
npm ci
npm run run:dev
```

L’API écoute sur `http://localhost:5678`. Lancez ensuite le frontend dans un second terminal selon son README.

| Écran | E-mail | Mot de passe de démo |
| --- | --- | --- |
| Employé | `employee@test.tld` | `employee` |
| Administration | `admin@test.tld` | `admin` |

Le premier lancement applique les migrations et crée les deux comptes et deux notes fictives. Le justificatif de démonstration provient des fixtures de test. `npm run seed:demo` lance la même préparation sans démarrer le serveur. Relancer ces commandes conserve les notes déjà présentes.

La démo écrit dans `database_demo.sqlite` et `public/`. Ces fichiers restent locaux. L’ancienne base `database_dev.sqlite` utilise un nom distinct. Au redémarrage, reconnectez-vous pour obtenir un nouveau jeton. Le service JWT accepte une clé fournie par `BILLED_JWT_SECRET` et l’exige avec `NODE_ENV=production`. Utilisez cette démo locale avec des données fictives.

## Vérification

```sh
npm test
npm run lint
```

Jest et Supertest couvrent la connexion, les utilisateurs, les notes et l’envoi de justificatifs. La suite utilise `database_test.sqlite` et des dossiers temporaires pour les uploads. Le workflow GitHub Actions exécute l’installation, le lint et les tests.

`app.js` configure Express. `routes/` et `controllers/` gèrent les opérations API. `models/` et `migrations/` définissent le schéma SQLite. `scripts/seed-demo.js` prépare les données de démonstration.
