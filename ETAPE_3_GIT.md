# 🔹 ÉTAPE 3 – Mise en place du dépôt Git

## 🎯 Objectif
Travailler comme une vraie équipe technique avec Git et GitHub/GitLab.

## ⏱️ Durée estimée : 20 minutes

---

## 📋 Prérequis

### 1. Installer Git
```bash
# Vérifier si Git est installé
git --version
```

Si non installé : https://git-scm.com/downloads

### 2. Configurer Git (première fois)
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### 3. Créer un compte GitHub ou GitLab
- **GitHub** : https://github.com/signup
- **GitLab** : https://gitlab.com/users/sign_up

---

## 🚀 Étapes d'implémentation

### Étape 1 : Initialiser le dépôt local

```bash
# Se placer dans le dossier du projet
cd "C:\Users\Admin\Downloads\Todo App"

# Initialiser Git
git init

# Vérifier le statut
git status
```

### Étape 2 : Premier commit

```bash
# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "feat: Initial commit - SecureTodo App with React + Vite

- Application TODO complète avec React 18
- Sécurité : Sanitization XSS, validation inputs
- Tests : 13 tests de sécurité et fonctionnels
- UI : Tailwind CSS responsive
- Fonctionnalités : CRUD, filtres, recherche, statistiques
- Documentation : README, INSTALLATION, CONCEPTION"
```

### Étape 3 : Créer la branche dev

```bash
# Créer et basculer sur la branche dev
git checkout -b dev

# Vérifier les branches
git branch
```

Vous devriez voir :
```
* dev
  main
```

### Étape 4 : Créer le dépôt distant (GitHub)

#### Option A : Via l'interface GitHub
1. Aller sur https://github.com/new
2. Nom du dépôt : `securetodo-devsecops`
3. Description : `Application TODO sécurisée - Projet DevSecOps`
4. Visibilité : Public ou Private
5. **NE PAS** initialiser avec README (on a déjà les fichiers)
6. Cliquer sur "Create repository"

#### Option B : Via GitHub CLI (si installé)
```bash
gh repo create securetodo-devsecops --public --source=. --remote=origin
```

### Étape 5 : Lier le dépôt local au distant

```bash
# Ajouter le remote (remplacer USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/securetodo-devsecops.git

# Vérifier
git remote -v
```

### Étape 6 : Pousser le code

```bash
# Renommer la branche principale en main (si nécessaire)
git branch -M main

# Pousser la branche main
git push -u origin main

# Pousser la branche dev
git push -u origin dev
```

---

## 📝 Règles de travail Git

### Convention de messages de commit

Format : `<type>: <description>`

**Types :**
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactoring
- `test:` Ajout/modification de tests
- `chore:` Tâches de maintenance
- `security:` Correctif de sécurité

**Exemples :**
```bash
git commit -m "feat: Add search functionality"
git commit -m "fix: Correct XSS vulnerability in input"
git commit -m "docs: Update README with installation steps"
git commit -m "security: Add CSP headers"
git commit -m "test: Add unit tests for sanitization"
```

### Workflow Git Flow simplifié

```
main (production)
  ↑
  └── dev (développement)
       ↑
       └── feature/nom-feature (fonctionnalités)
```

**Règles :**
1. ✅ **main** : Code stable, prêt pour production
2. ✅ **dev** : Code en développement, testé
3. ✅ **feature/*** : Nouvelles fonctionnalités
4. ✅ Toujours créer une Pull Request pour merger
5. ✅ Tester avant de merger

### Créer une feature branch

```bash
# Depuis dev
git checkout dev

# Créer une nouvelle feature
git checkout -b feature/add-categories

# Travailler sur la feature...
git add .
git commit -m "feat: Add category support for todos"

# Pousser la feature
git push -u origin feature/add-categories
```

### Créer une Pull Request

1. Aller sur GitHub : `https://github.com/USERNAME/securetodo-devsecops`
2. Cliquer sur "Pull requests" → "New pull request"
3. Base : `dev` ← Compare : `feature/add-categories`
4. Titre : "feat: Add category support"
5. Description : Expliquer les changements
6. Créer la PR
7. Reviewer et merger

---

## 📦 Fichiers à ignorer (.gitignore)

Le fichier `.gitignore` est déjà créé avec :
```
node_modules/
dist/
*.local
.env
coverage/
```

---

## ✅ Vérification

### Checklist
- [ ] Git initialisé (`git status` fonctionne)
- [ ] Premier commit créé
- [ ] Branche `main` créée
- [ ] Branche `dev` créée
- [ ] Dépôt distant créé sur GitHub/GitLab
- [ ] Remote `origin` configuré
- [ ] Code poussé sur `main` et `dev`
- [ ] Historique de commits propre

### Commandes de vérification
```bash
# Vérifier les branches
git branch -a

# Vérifier les remotes
git remote -v

# Voir l'historique
git log --oneline

# Voir le statut
git status
```

---

## 📊 Résultat attendu

Vous devriez avoir :
1. ✅ Un dépôt Git local initialisé
2. ✅ Un dépôt distant sur GitHub/GitLab
3. ✅ Deux branches : `main` et `dev`
4. ✅ Code poussé et visible en ligne
5. ✅ Historique de commits propre

---

## 🆘 Problèmes courants

### Erreur : "remote origin already exists"
```bash
git remote remove origin
git remote add origin <URL>
```

### Erreur : "failed to push"
```bash
git pull origin main --rebase
git push -u origin main
```

### Oublié de créer la branche dev
```bash
git checkout -b dev
git push -u origin dev
```

---

## 🎉 Prochaine étape

Une fois cette étape terminée, vous êtes prêt pour :
👉 **ÉTAPE 5 : Pipeline CI/CD** (voir `ETAPE_5_CICD.md`)

