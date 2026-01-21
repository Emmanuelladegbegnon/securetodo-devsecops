# 🚀 Guide de Déploiement - SecureTodo

## 📋 Options de déploiement

### Option 1 : Vercel (Recommandé) ⭐

#### Avantages
✅ Déploiement automatique depuis GitHub  
✅ HTTPS gratuit  
✅ Headers de sécurité configurés  
✅ Preview pour chaque Pull Request  
✅ CDN global  
✅ Rollback facile  

#### Étapes de déploiement

1. **Créer un compte Vercel**
   - Aller sur https://vercel.com/signup
   - S'inscrire avec GitHub
   - Autoriser l'accès à vos dépôts

2. **Importer le projet**
   - Cliquer sur "New Project"
   - Sélectionner `securetodo-devsecops`
   - Vercel détecte automatiquement Vite

3. **Configuration (automatique)**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre 2-3 minutes
   - ✅ Application déployée !

5. **URL de production**
   ```
   https://securetodo-devsecops.vercel.app
   ```

#### Configuration avancée

Le fichier `vercel.json` est déjà configuré avec :
- ✅ Headers de sécurité HTTP
- ✅ Redirections SPA
- ✅ Content Security Policy

#### Déploiement automatique

Chaque push sur `main` déclenche un déploiement automatique !

```bash
git checkout main
git merge dev
git push origin main
# → Déploiement automatique sur Vercel
```

---

### Option 2 : Netlify

#### Étapes

1. **Créer un compte**
   - https://app.netlify.com/signup
   - S'inscrire avec GitHub

2. **Nouveau site**
   - "New site from Git"
   - Sélectionner le dépôt
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Headers de sécurité**
   - Le fichier `public/_headers` est déjà configuré
   - Netlify l'appliquera automatiquement

4. **Déployer**
   - Cliquer sur "Deploy site"
   - URL : `https://securetodo-devsecops.netlify.app`

---

### Option 3 : GitHub Pages

#### Étapes

1. **Installer gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Ajouter au package.json**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Configurer vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/securetodo-devsecops/',
     // ...
   })
   ```

4. **Déployer**
   ```bash
   npm run deploy
   ```

5. **Activer GitHub Pages**
   - Settings → Pages
   - Source: gh-pages branch
   - URL : `https://emmanuelladegbegnon.github.io/securetodo-devsecops/`

---

## 🔧 Configuration post-déploiement

### 1. Vérifier les headers de sécurité

Utiliser https://securityheaders.com/ :
```
https://securityheaders.com/?q=https://votre-url.vercel.app
```

**Score attendu :** A ou A+

### 2. Tester l'application

✅ Ajouter une tâche  
✅ Marquer comme complétée  
✅ Filtrer les tâches  
✅ Rechercher  
✅ Modifier une tâche  
✅ Supprimer une tâche  
✅ Rafraîchir la page (persistance)  

### 3. Vérifier la sécurité

- ✅ HTTPS activé (cadenas vert)
- ✅ Pas d'erreurs dans la console
- ✅ CSP actif (vérifier dans DevTools)

---

## 📊 Monitoring et Analytics

### Vercel Analytics (optionnel)

1. Activer dans le dashboard Vercel
2. Ajouter `@vercel/analytics` :
   ```bash
   npm install @vercel/analytics
   ```

3. Dans `src/main.jsx` :
   ```javascript
   import { inject } from '@vercel/analytics';
   inject();
   ```

---

## 🔄 Workflow de déploiement

### Développement
```bash
# Travailler sur dev
git checkout dev
# ... faire des modifications ...
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin dev
```

### Staging (Preview)
```bash
# Créer une Pull Request dev → main
# Vercel crée automatiquement un preview
# URL : https://securetodo-devsecops-git-dev-username.vercel.app
```

### Production
```bash
# Merger la PR ou directement :
git checkout main
git merge dev
git push origin main
# → Déploiement automatique en production
```

---

## 🐛 Dépannage

### Erreur : Build failed

**Problème :** Tests échouent pendant le build

**Solution :**
```bash
# Tester localement d'abord
npm run build

# Si ça marche localement, vérifier les variables d'environnement
```

### Erreur : 404 sur les routes

**Problème :** SPA routing ne fonctionne pas

**Solution :** Vérifier `vercel.json` :
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Headers de sécurité non appliqués

**Problème :** Headers manquants

**Solution :**
- Vercel : Vérifier `vercel.json`
- Netlify : Vérifier `public/_headers`
- GitHub Pages : Pas de support natif

---

## ✅ Checklist de déploiement

### Avant le déploiement
- [ ] Tous les tests passent localement
- [ ] Build réussit : `npm run build`
- [ ] Pas de secrets dans le code
- [ ] README à jour
- [ ] CHANGELOG à jour

### Après le déploiement
- [ ] Application accessible
- [ ] HTTPS actif
- [ ] Toutes les fonctionnalités marchent
- [ ] Headers de sécurité présents
- [ ] Pas d'erreurs console
- [ ] Performance acceptable

---

## 🎯 URLs du projet

### Production
```
https://securetodo-devsecops.vercel.app
```

### Staging (dev branch)
```
https://securetodo-devsecops-git-dev.vercel.app
```

### Repository
```
https://github.com/Emmanuelladegbegnon/securetodo-devsecops
```

---

## 📝 Commandes utiles

```bash
# Build local
npm run build

# Preview du build
npm run preview

# Déployer sur Vercel (CLI)
npx vercel

# Déployer en production
npx vercel --prod
```

---

## 🎉 Félicitations !

Votre application SecureTodo est maintenant déployée avec :
✅ HTTPS sécurisé  
✅ Headers de sécurité  
✅ Déploiement automatique  
✅ Preview pour les PR  
✅ CDN global  

**Prochaine étape :** ÉTAPE 8 - Préparation de la restitution

