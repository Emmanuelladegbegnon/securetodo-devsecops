# 🔒 SecureTodo - Application DevSecOps

![CI/CD Pipeline](https://github.com/Emmanuelladegbegnon/securetodo-devsecops/workflows/CI%2FCD%20Pipeline/badge.svg)
[![Security](https://img.shields.io/badge/security-DevSecOps-blue.svg)](https://github.com/Emmanuelladegbegnon/securetodo-devsecops)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)](https://reactjs.org/)

Application de gestion de tâches sécurisée développée avec les principes DevSecOps.

## 🚀 Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone <url-du-depot>
cd "Todo App"
```

2. Installer les dépendances
```bash
npm install
```

## 💻 Lancement de l'application

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

## 🧪 Tests

```bash
npm test
```

## 🔒 Fonctionnalités de sécurité

- ✅ Sanitization des inputs (protection XSS)
- ✅ Validation des données
- ✅ Content Security Policy (CSP)
- ✅ Limite de caractères (200 max)
- ✅ Stockage local sécurisé

## 📦 Technologies utilisées

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icônes
- **localStorage** - Persistance des données

## 🎯 Fonctionnalités

- ✅ Créer, modifier, supprimer des tâches
- ✅ Marquer comme complétée
- ✅ Filtrer (Toutes / En cours / Complétées)
- ✅ Recherche en temps réel
- ✅ Statistiques (Total, En cours, Complétées)
- ✅ Interface responsive
- ✅ Sauvegarde automatique

## 📝 Structure du projet

```
Todo App/
├── src/
│   ├── SecureTodoApp.jsx    # Composant principal
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── index.html                # Template HTML
├── package.json              # Dépendances
├── vite.config.js            # Configuration Vite
├── tailwind.config.js        # Configuration Tailwind
└── README.md                 # Documentation
```

## 🇧🇯 Made in Bénin

Développé avec ❤️ pour démontrer les principes DevSecOps

