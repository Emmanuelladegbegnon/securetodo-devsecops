# 📋 Document de Conception - TODO App

## 🎯 Description de l'Application

**TODO App** est une application web moderne de gestion de tâches destinée aux professionnels et étudiants africains/béninois qui souhaitent organiser efficacement leur travail quotidien.

### Fonctionnalités Principales

1. **Gestion des tâches**
   - Créer une nouvelle tâche
   - Modifier une tâche existante
   - Supprimer une tâche
   - Marquer une tâche comme complétée/non complétée

2. **Organisation**
   - Filtrer les tâches (toutes, actives, complétées)
   - Compteur de tâches actives
   - Interface responsive (mobile-first)

3. **Persistance**
   - Sauvegarde locale (LocalStorage)
   - Données persistantes entre sessions

### 👥 Utilisateurs Cibles

- **Étudiants** : gestion des devoirs et projets académiques
- **Professionnels** : organisation des tâches quotidiennes
- **Entrepreneurs** : suivi des activités business
- **Tout utilisateur** souhaitant une solution simple et efficace

## 🛠️ Stack Technique

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Styling moderne et responsive
- **JavaScript (Vanilla)** : Logique métier sans framework lourd
- **LocalStorage API** : Persistance des données

### DevOps & Sécurité
- **Git/GitHub** : Contrôle de version
- **GitHub Actions** : CI/CD
- **Snyk** : Scan des dépendances
- **SonarCloud** : Analyse statique du code
- **ESLint** : Linting JavaScript
- **GitHub Pages** : Hébergement

### Tests
- **Jest** : Tests unitaires
- **Lighthouse CI** : Tests de performance et accessibilité

## 🔒 Threat Modeling (STRIDE)

### Spoofing (Usurpation d'identité)
- **Menace** : Pas d'authentification dans v1
- **Mitigation** : Données stockées localement uniquement
- **Futur** : Ajouter authentification OAuth

### Tampering (Altération)
- **Menace** : Manipulation du LocalStorage via DevTools
- **Mitigation** : Validation des données à la lecture
- **Futur** : Chiffrement des données sensibles

### Repudiation (Répudiation)
- **Menace** : Pas de logs d'actions
- **Mitigation** : Non critique pour v1 (usage local)
- **Futur** : Logs côté serveur

### Information Disclosure (Divulgation d'information)
- **Menace** : Données visibles dans LocalStorage
- **Mitigation** : Pas de données sensibles stockées
- **Futur** : Chiffrement AES-256

### Denial of Service (Déni de service)
- **Menace** : Saturation du LocalStorage
- **Mitigation** : Limite de 1000 tâches max
- **Futur** : Pagination et nettoyage automatique

### Elevation of Privilege (Élévation de privilèges)
- **Menace** : Injection XSS via contenu des tâches
- **Mitigation** : Sanitization de toutes les entrées utilisateur
- **Contrôle** : Content Security Policy (CSP)

## 📊 Diagramme de Flux de Données (DFD Niveau 1)

```
┌─────────────┐
│ Utilisateur │
└──────┬──────┘
       │
       │ Interactions (HTTPS)
       ▼
┌─────────────────────────────────┐
│   Application Web (Frontend)    │
│  ┌───────────────────────────┐  │
│  │  Interface Utilisateur    │  │
│  └───────────┬───────────────┘  │
│              │                   │
│  ┌───────────▼───────────────┐  │
│  │  Contrôleur de Tâches     │  │
│  │  (Validation + Logique)   │  │
│  └───────────┬───────────────┘  │
│              │                   │
│  ┌───────────▼───────────────┐  │
│  │  LocalStorage Manager     │  │
│  └───────────────────────────┘  │
└──────────────┬──────────────────┘
               │
               │ Stockage
               ▼
        ┌──────────────┐
        │ LocalStorage │
        │  (Navigateur)│
        └──────────────┘
```

## 🔐 Mesures de Sécurité Implémentées

1. **Input Validation** : Sanitization de toutes les entrées
2. **CSP Headers** : Protection contre XSS
3. **HTTPS Only** : Déploiement sécurisé
4. **Dependency Scanning** : Snyk automatique
5. **Code Quality** : SonarCloud avec seuils de qualité
6. **Automated Testing** : Tests avant chaque déploiement

## 📈 Architecture de Sécurité

- **Shift Left** : Sécurité intégrée dès le développement
- **CI/CD Pipeline** : Scans automatiques à chaque commit
- **Monitoring** : Alertes sur vulnérabilités critiques
- **Updates** : Dependabot pour mises à jour automatiques

---

**Version** : 1.0  
**Date** : Janvier 2026  
**Équipe** : DevSecOps Team

