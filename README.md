# SecureTodo - Application DevSecOps

![CI/CD Pipeline](https://github.com/Emmanuelladegbegnon/securetodo-devsecops/workflows/CI%2FCD%20Pipeline/badge.svg)
[![Security](https://img.shields.io/badge/security-DevSecOps-blue.svg)](https://github.com/Emmanuelladegbegnon/securetodo-devsecops)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)](https://reactjs.org/)

Application de gestion de tâches sécurisée développée avec les principes DevSecOps.

## Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone https://github.com/Emmanuelladegbegnon/securetodo-devsecops.git
cd securetodo-devsecops
```

2. Installer les dépendances
```bash
npm install
```

##  Lancement de l'application

### Mode développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`

### Build de production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

##  Tests

```bash
npm test
```

##  Fonctionnalités de sécurité

-  Sanitization des inputs (protection XSS)
-  Validation des données
-  Content Security Policy (CSP)
-  Limite de caractères (200 max)
-  Stockage local sécurisé

##  Technologies utilisées

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icônes
- **localStorage** - Persistance des données

##  Fonctionnalités

-  Créer, modifier, supprimer des tâches
-  Marquer comme complétée
-  Filtrer (Toutes / En cours / Complétées)
-  Recherche en temps réel
-  Statistiques (Total, En cours, Complétées)
-  Interface responsive
-  Sauvegarde automatique

##  Structure du projet

```
securetodo-devsecops/
├── .github/workflows/        # Pipelines CI/CD
│   ├── ci.yml               # Pipeline principal
│   └── security.yml         # Scans de sécurité
├── src/
│   ├── SecureTodoApp.jsx    # Composant principal
│   ├── SecureTodoApp.test.jsx # Tests
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── public/
│   └── _headers             # Headers de sécurité
├── SECURITY.md              # Rapport de sécurité
├── DEPLOYMENT.md            # Guide de déploiement
├── CHANGELOG.md             # Historique des versions
├── vercel.json              # Configuration Vercel
└── README.md                # Ce fichier
```

##  Déploiement

### Déploiement automatique avec Vercel

1. Connectez votre dépôt GitHub à Vercel
2. Chaque push sur `main` déclenche un déploiement automatique
3. Les Pull Requests génèrent des previews automatiques

**URL de production :** `https://securetodo-devsecops.vercel.app`

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails.

##  Sécurité

Ce projet implémente les meilleures pratiques DevSecOps :

- **Shift Left Security** : Sécurité intégrée dès la conception
- **Tests automatisés** : 13 tests dont 9 tests de sécurité
- **Pipeline CI/CD** : Scans de sécurité automatiques
- **Threat Model STRIDE** : Analyse complète des menaces

Voir [SECURITY.md](./SECURITY.md) pour le rapport complet.

##  Documentation

- [ Démarrage rapide](./DEMARRAGE_RAPIDE.md)
- [ Installation détaillée](./INSTALLATION.md)
- [ Rapport de sécurité](./SECURITY.md)
- [ Bonnes pratiques](./SECURITY_BEST_PRACTICES.md)
- [ Guide de déploiement](./DEPLOYMENT.md)
- [ Diagrammes](./DIAGRAMMES.md)
- [ Changelog](./CHANGELOG.md)

##  Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'feat: Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

##  Licence

Ce projet est sous licence MIT.

##  Made in Bénin

Développé avec  pour démontrer les principes DevSecOps dans un contexte africain.

**Projet réalisé pour :** Startup fictive béninoise
**Objectif :** Livrer vite, éviter les erreurs, réduire les failles de sécurité
**Résultat :** Application sécurisée, testée et prête pour production

