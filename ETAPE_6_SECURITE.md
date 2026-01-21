# 🔹 ÉTAPE 6 – Intégration de la sécurité

## 🎯 Objectif
Appliquer le principe **Shift Left Security** en intégrant des outils de sécurité dans le pipeline CI/CD.

## ⏱️ Durée estimée : 45 minutes

---

## 📋 Outils de sécurité à intégrer

### 1. **Snyk** - Scan des dépendances
- Détecte les vulnérabilités dans les packages npm
- Propose des correctifs automatiques
- Gratuit pour projets open source

### 2. **npm audit** - Audit natif
- Intégré à npm
- Analyse les dépendances
- Génère des rapports de vulnérabilités

### 3. **SonarQube/SonarCloud** - Analyse statique
- Détecte les bugs et code smells
- Analyse la qualité du code
- Mesure la couverture de tests

### 4. **OWASP Dependency-Check** - Vérification CVE
- Identifie les vulnérabilités connues
- Base de données CVE/NVD
- Rapports détaillés

---

## 🚀 Intégration Snyk

### Étape 1 : Créer un compte Snyk

1. Aller sur https://snyk.io/signup
2. S'inscrire avec GitHub
3. Autoriser l'accès au dépôt

### Étape 2 : Obtenir le token API

1. Aller dans Account Settings
2. Cliquer sur "API Token"
3. Copier le token (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Étape 3 : Ajouter le secret GitHub

1. Aller sur GitHub → Settings → Secrets and variables → Actions
2. Cliquer "New repository secret"
3. Name: `SNYK_TOKEN`
4. Value: Coller le token
5. Cliquer "Add secret"

### Étape 4 : Mettre à jour le workflow CI

Le workflow `.github/workflows/ci.yml` est déjà configuré avec Snyk !

Vérifier la section `security-scan` :
```yaml
security-scan:
  runs-on: ubuntu-latest
  needs: build-and-test
  
  steps:
  - name: 📥 Checkout code
    uses: actions/checkout@v4
  
  - name: 🛡️ Run npm audit
    run: npm audit --audit-level=moderate
    continue-on-error: true
```

### Étape 5 : Ajouter Snyk au workflow

Créer `.github/workflows/security.yml` :

```yaml
name: Security Scan

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]
  schedule:
    - cron: '0 0 * * 0'  # Scan hebdomadaire le dimanche

jobs:
  snyk-scan:
    runs-on: ubuntu-latest
    
    steps:
    - name: 📥 Checkout code
      uses: actions/checkout@v4
    
    - name: 🟢 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
    
    - name: 📦 Install dependencies
      run: npm ci
    
    - name: 🔒 Run Snyk to check for vulnerabilities
      uses: snyk/actions/node@master
      continue-on-error: true
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high --json-file-output=snyk-report.json
    
    - name: 📊 Upload Snyk report
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: snyk-security-report
        path: snyk-report.json
        retention-days: 30
    
    - name: 🛡️ Snyk Monitor
      uses: snyk/actions/node@master
      continue-on-error: true
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        command: monitor

  dependency-review:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    
    steps:
    - name: 📥 Checkout code
      uses: actions/checkout@v4
    
    - name: 🔍 Dependency Review
      uses: actions/dependency-review-action@v3
      with:
        fail-on-severity: moderate
```

---

## 🔍 Intégration SonarCloud

### Étape 1 : Créer un compte SonarCloud

1. Aller sur https://sonarcloud.io
2. S'inscrire avec GitHub
3. Importer le projet `securetodo-devsecops`

### Étape 2 : Obtenir les tokens

1. My Account → Security
2. Generate Token
3. Copier le token

### Étape 3 : Configurer GitHub Secrets

Ajouter ces secrets :
- `SONAR_TOKEN` : Token SonarCloud
- `SONAR_ORGANIZATION` : Nom de votre organisation
- `SONAR_PROJECT_KEY` : Clé du projet

### Étape 4 : Créer sonar-project.properties

```properties
sonar.projectKey=votre-username_securetodo-devsecops
sonar.organization=votre-organization

sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.jsx,**/*.test.js
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.test.jsx,**/*.test.js

sonar.sourceEncoding=UTF-8
```

### Étape 5 : Ajouter au workflow

Créer `.github/workflows/sonarcloud.yml` :

```yaml
name: SonarCloud Analysis

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    
    steps:
    - name: 📥 Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    
    - name: 🟢 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
    
    - name: 📦 Install dependencies
      run: npm ci
    
    - name: 🧪 Run tests with coverage
      run: npm test -- --coverage
    
    - name: 📊 SonarCloud Scan
      uses: SonarSource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

---

## 🛡️ Améliorer la sécurité du code

### 1. Ajouter DOMPurify pour sanitization avancée

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

Mettre à jour `src/SecureTodoApp.jsx` :

```javascript
import DOMPurify from 'dompurify';

const sanitizeInput = (str) => {
  return DOMPurify.sanitize(str, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};
```

### 2. Renforcer le Content Security Policy

Mettre à jour `index.html` :

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self'; 
               connect-src 'self'; 
               frame-ancestors 'none'; 
               base-uri 'self'; 
               form-action 'self';">
```

### 3. Ajouter des headers de sécurité

Créer `public/_headers` (pour Netlify/Vercel) :

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 📊 Analyser les résultats

### npm audit

```bash
npm audit

# Voir les détails
npm audit --json > audit-report.json

# Corriger automatiquement
npm audit fix
```

### Snyk

```bash
# Installer Snyk CLI
npm install -g snyk

# S'authentifier
snyk auth

# Scanner le projet
snyk test

# Voir les détails
snyk test --json > snyk-report.json

# Monitorer le projet
snyk monitor
```

---

## ✅ Checklist de sécurité

### Code
- [x] Sanitization XSS (sanitizeInput)
- [ ] DOMPurify intégré
- [x] Validation des inputs
- [x] Gestion d'erreurs
- [x] Pas de données sensibles en clair

### Headers HTTP
- [x] Content Security Policy
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] X-XSS-Protection

### Dépendances
- [ ] npm audit exécuté
- [ ] Snyk scan configuré
- [ ] Pas de vulnérabilités critiques
- [ ] Dépendances à jour

### Pipeline
- [x] Tests de sécurité automatisés
- [ ] Scan Snyk dans CI/CD
- [ ] SonarCloud configuré
- [ ] Rapports générés

---

## 📝 Rapport de sécurité

Créer `SECURITY_REPORT.md` avec :

1. **Vulnérabilités identifiées**
2. **Niveau de sévérité**
3. **Actions prises**
4. **Faux positifs justifiés**
5. **Recommandations**

---

## 🎉 Résultat attendu

À la fin de cette étape :
- ✅ Snyk configuré et actif
- ✅ npm audit intégré au pipeline
- ✅ SonarCloud analyse le code
- ✅ Rapports de sécurité générés
- ✅ Vulnérabilités identifiées et corrigées
- ✅ Documentation de sécurité complète

