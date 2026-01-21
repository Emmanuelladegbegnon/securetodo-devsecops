# 🔹 ÉTAPE 5 – Mise en place du pipeline CI/CD

## 🎯 Objectif
Automatiser le build, les tests et le déploiement avec GitHub Actions.

## ⏱️ Durée estimée : 45 minutes

---

## 📋 Qu'est-ce qu'un pipeline CI/CD ?

**CI (Continuous Integration)** : Intégration continue
- Build automatique du code
- Tests automatiques
- Vérification de la qualité du code

**CD (Continuous Deployment)** : Déploiement continu
- Déploiement automatique en production
- Livraison rapide des nouvelles fonctionnalités

---

## 🚀 Création du pipeline GitHub Actions

### Étape 1 : Créer la structure des workflows

```bash
# Créer le dossier .github/workflows
mkdir -p .github/workflows
```

### Étape 2 : Créer le fichier de workflow CI

Créer le fichier `.github/workflows/ci.yml` :

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - name: 📥 Checkout code
      uses: actions/checkout@v4
    
    - name: 🟢 Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: 📦 Install dependencies
      run: npm ci
    
    - name: 🔍 Run ESLint
      run: npm run lint
    
    - name: 🧪 Run tests
      run: npm test
    
    - name: 🏗️ Build application
      run: npm run build
    
    - name: 📊 Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-${{ matrix.node-version }}
        path: dist/
        retention-days: 7

  security-scan:
    runs-on: ubuntu-latest
    needs: build-and-test
    
    steps:
    - name: 📥 Checkout code
      uses: actions/checkout@v4
    
    - name: 🔒 Run Snyk security scan
      uses: snyk/actions/node@master
      continue-on-error: true
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
    
    - name: 🛡️ Run npm audit
      run: npm audit --audit-level=moderate
      continue-on-error: true

  deploy:
    runs-on: ubuntu-latest
    needs: [build-and-test, security-scan]
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: 📥 Checkout code
      uses: actions/checkout@v4
    
    - name: 🟢 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
    
    - name: 📦 Install dependencies
      run: npm ci
    
    - name: 🏗️ Build
      run: npm run build
    
    - name: 🚀 Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./
```

---

## 📝 Explication du pipeline

### Job 1 : build-and-test
1. **Checkout** : Récupère le code
2. **Setup Node.js** : Installe Node.js (versions 18 et 20)
3. **Install** : Installe les dépendances
4. **Lint** : Vérifie la qualité du code
5. **Test** : Lance les tests
6. **Build** : Compile l'application
7. **Upload** : Sauvegarde les artifacts

### Job 2 : security-scan
1. **Snyk** : Scan des vulnérabilités
2. **npm audit** : Audit des dépendances

### Job 3 : deploy
1. **Build** : Recompile pour production
2. **Deploy** : Déploie sur Vercel (seulement sur main)

---

## 🔐 Configuration des secrets

### Secrets nécessaires

1. **SNYK_TOKEN** (optionnel)
   - Créer un compte sur https://snyk.io
   - Aller dans Account Settings → API Token
   - Copier le token

2. **VERCEL_TOKEN** (pour déploiement)
   - Créer un compte sur https://vercel.com
   - Aller dans Settings → Tokens
   - Créer un nouveau token

3. **VERCEL_ORG_ID** et **VERCEL_PROJECT_ID**
   - Installer Vercel CLI : `npm i -g vercel`
   - Lancer : `vercel link`
   - Les IDs seront dans `.vercel/project.json`

### Ajouter les secrets sur GitHub

1. Aller sur votre dépôt GitHub
2. Settings → Secrets and variables → Actions
3. Cliquer sur "New repository secret"
4. Ajouter chaque secret :
   - Name : `SNYK_TOKEN`
   - Value : `votre-token`
5. Répéter pour tous les secrets

---

## 🧪 Tester le pipeline

### Test 1 : Push sur dev
```bash
git checkout dev
git add .
git commit -m "ci: Add GitHub Actions workflow"
git push origin dev
```

### Test 2 : Créer une Pull Request
```bash
git checkout -b feature/test-ci
echo "# Test CI" >> test.md
git add test.md
git commit -m "test: Verify CI pipeline"
git push origin feature/test-ci
```

Créer une PR sur GitHub et observer le pipeline s'exécuter.

### Test 3 : Merge sur main
Merger la PR et observer le déploiement automatique.

---

## 📊 Visualiser les résultats

1. Aller sur GitHub → Actions
2. Voir les workflows en cours
3. Cliquer sur un workflow pour voir les détails
4. Vérifier que tous les jobs sont ✅

---

## ✅ Checklist de vérification

- [ ] Fichier `.github/workflows/ci.yml` créé
- [ ] Pipeline s'exécute sur push
- [ ] Pipeline s'exécute sur PR
- [ ] Tests passent ✅
- [ ] Build réussit ✅
- [ ] Lint passe ✅
- [ ] Security scan configuré
- [ ] Déploiement automatique (optionnel)

---

## 📈 Améliorations possibles

### Badge de statut
Ajouter dans `README.md` :
```markdown
![CI/CD](https://github.com/USERNAME/securetodo-devsecops/workflows/CI%2FCD%20Pipeline/badge.svg)
```

### Notifications
Ajouter des notifications Slack/Discord en cas d'échec.

### Cache
Optimiser avec cache des dépendances.

### Matrix testing
Tester sur plusieurs OS (Ubuntu, Windows, macOS).

---

## 🎉 Prochaine étape

Une fois le pipeline configuré :
👉 **ÉTAPE 6 : Intégration de la sécurité** (voir `ETAPE_6_SECURITE.md`)

