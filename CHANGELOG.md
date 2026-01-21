# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2026-01-21

### 🎉 Version initiale - Application DevSecOps complète

#### ✨ Ajouté
- Application React 18 avec Vite
- Interface utilisateur moderne avec Tailwind CSS
- Gestion complète des tâches (CRUD)
- Filtres : Toutes / En cours / Complétées
- Recherche en temps réel
- Édition en ligne des tâches
- Persistance avec localStorage
- Statistiques dynamiques
- Interface responsive (mobile + desktop)

#### 🔒 Sécurité
- Protection XSS avec fonction `sanitizeInput()`
- Content Security Policy (CSP)
- Validation des inputs (200 caractères max)
- Gestion sécurisée du localStorage
- Headers de sécurité HTTP
- Tests de sécurité automatisés (13 tests)
- Threat Model STRIDE complet
- Documentation de sécurité complète

#### 🧪 Tests
- 13 tests unitaires avec Vitest
- 9 tests de sécurité
- 4 tests fonctionnels
- Couverture de code
- Tests automatisés dans CI/CD

#### 🚀 CI/CD
- Pipeline GitHub Actions complet
- 5 jobs : build-and-test, security-scan, code-quality, deploy-preview, deploy-production
- Tests sur Node.js 18.x et 20.x
- npm audit automatique
- ESLint intégré
- Rapports de sécurité (conservés 30 jours)
- Déploiement automatique sur main

#### 📚 Documentation
- README.md complet
- DEMARRAGE_RAPIDE.md
- INSTALLATION.md
- DEVELOPPEMENT_COMPLET.md
- CONCEPTION.md
- ETAPE_3_GIT.md
- ETAPE_5_CICD.md
- ETAPE_6_SECURITE.md
- SECURITY.md
- SECURITY_BEST_PRACTICES.md
- DEPLOYMENT.md
- DIAGRAMMES.md
- RESUME_PROJET.md

#### 🛠️ Configuration
- Git avec branches main et dev
- ESLint pour la qualité du code
- Prettier (configuration)
- Tailwind CSS
- PostCSS
- Vite pour le build
- Configuration Vercel pour déploiement

#### 📦 Dépendances principales
- react: ^18.2.0
- react-dom: ^18.2.0
- lucide-react: ^0.294.0
- dompurify: ^3.0.8
- vite: ^5.0.8
- vitest: ^1.0.4
- tailwindcss: ^3.3.6

---

## [0.2.0] - 2026-01-21

### Ajouté
- Pipeline CI/CD GitHub Actions
- Tests de sécurité
- Documentation de sécurité

### Modifié
- Amélioration de la sanitization XSS
- Correction des tests

---

## [0.1.0] - 2026-01-21

### Ajouté
- Version initiale de l'application
- Fonctionnalités CRUD de base
- Interface utilisateur

---

## Types de changements

- `✨ Ajouté` pour les nouvelles fonctionnalités
- `🔧 Modifié` pour les changements aux fonctionnalités existantes
- `🗑️ Déprécié` pour les fonctionnalités bientôt supprimées
- `❌ Supprimé` pour les fonctionnalités supprimées
- `🐛 Corrigé` pour les corrections de bugs
- `🔒 Sécurité` pour les correctifs de sécurité

---

## Liens

- [Repository GitHub](https://github.com/Emmanuelladegbegnon/securetodo-devsecops)
- [Documentation](./README.md)
- [Guide de sécurité](./SECURITY.md)
- [Guide de déploiement](./DEPLOYMENT.md)

