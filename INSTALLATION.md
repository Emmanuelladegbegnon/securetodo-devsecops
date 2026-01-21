# 📦 Guide d'installation - SecureTodo

## ⚠️ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

### 1. Node.js et npm

**Vérifier si Node.js est installé :**
```bash
node --version
npm --version
```

**Si non installé, télécharger depuis :**
- Site officiel : https://nodejs.org/
- Version recommandée : LTS (Long Term Support) - v18 ou supérieure

### 2. Git (optionnel mais recommandé)
```bash
git --version
```

## 🚀 Installation étape par étape

### Étape 1 : Ouvrir le terminal dans le dossier du projet

**Windows (PowerShell) :**
1. Ouvrir l'explorateur de fichiers
2. Naviguer vers `C:\Users\Admin\Downloads\Todo App`
3. Cliquer sur la barre d'adresse et taper `powershell`
4. Appuyer sur Entrée

**Alternative :**
```powershell
cd "C:\Users\Admin\Downloads\Todo App"
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

⏱️ Cette commande peut prendre 2-5 minutes selon votre connexion internet.

**Ce qui sera installé :**
- React 18
- Vite (build tool)
- Tailwind CSS
- Lucide React (icônes)
- Vitest (tests)
- ESLint (linting)

### Étape 3 : Lancer l'application en mode développement

```bash
npm run dev
```

✅ L'application devrait s'ouvrir automatiquement dans votre navigateur à l'adresse :
```
http://localhost:3000
```

## 🧪 Lancer les tests

```bash
npm test
```

## 🏗️ Créer un build de production

```bash
npm run build
```

Le build sera créé dans le dossier `dist/`

## 📊 Prévisualiser le build de production

```bash
npm run preview
```

## ❌ Résolution des problèmes courants

### Problème 1 : "npm n'est pas reconnu"

**Solution :** Node.js n'est pas installé ou pas dans le PATH
1. Télécharger et installer Node.js depuis https://nodejs.org/
2. Redémarrer le terminal
3. Vérifier avec `node --version`

### Problème 2 : Erreur "EACCES" ou permissions

**Windows :**
```bash
# Exécuter PowerShell en tant qu'administrateur
```

### Problème 3 : Port 3000 déjà utilisé

**Solution :** Modifier le port dans `vite.config.js`
```javascript
server: {
  port: 3001, // Changer le port
  open: true
}
```

### Problème 4 : Erreurs de dépendances

**Solution :** Nettoyer et réinstaller
```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstaller
npm install
```

## 📝 Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer en mode développement |
| `npm run build` | Créer un build de production |
| `npm run preview` | Prévisualiser le build |
| `npm test` | Lancer les tests |
| `npm run lint` | Vérifier le code avec ESLint |

## 🔍 Vérifier que tout fonctionne

1. ✅ L'application se lance sans erreur
2. ✅ Vous pouvez ajouter une tâche
3. ✅ Vous pouvez marquer une tâche comme complétée
4. ✅ Vous pouvez filtrer les tâches
5. ✅ Vous pouvez rechercher des tâches
6. ✅ Les tâches persistent après rechargement de la page

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifier les logs dans le terminal
2. Vérifier la console du navigateur (F12)
3. Consulter la documentation officielle :
   - React : https://react.dev/
   - Vite : https://vitejs.dev/
   - Tailwind : https://tailwindcss.com/

## 🎉 Prochaines étapes

Une fois l'application installée et fonctionnelle :
1. ✅ Configurer Git et créer un dépôt
2. ✅ Mettre en place le pipeline CI/CD
3. ✅ Intégrer les outils de sécurité (Snyk, SonarQube)
4. ✅ Déployer l'application

