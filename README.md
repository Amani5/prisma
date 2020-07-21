# Prisma technical test

## Build le projet
**Requiert node >= 11**
- Cloner le repo github
- Installer les dépendances en exécutant la commande **`npm i`**
- Build le projet : **`npm run build`**

Un fichier **`prisma.js`** sera alors créé dans le dossier `build`

## Lancer la démo
*Pour lancer la démo, assurez-vous d'avoir bien le fichier `prisma.js`*

Il suffit juste d'ouvrir le fichier **`index.html`** dans un navigateur internet

### Filtrer les résultats sur le tableau

Vous pouvez filtrer les résultats du tableau en utilisant ces paramètres dans l'URL : 
-	`firstName`, `lastName`  => Exemple : 'Toto'
-	`age` => Exemple :  '20-25'
-	`eyeColor` => Exemple : 'blue'
-	`email` => Exemple : email@toto.com

Exemples d'utilisation : 
`index.html?firstName=Guillaume`
`index.html?firstName=Guillaume&age=25-30`

## Tests
Pour lancer les tests unitaires : `npm run test`


outils utilisés : 
- Webpack + Babel
- Bulma (light css framework)
- Jest