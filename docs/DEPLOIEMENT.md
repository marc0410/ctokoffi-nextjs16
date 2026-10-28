# Déployer le portfolio

## Vercel

1. Créez votre propre dépôt Git et poussez ce dossier (sans `node_modules`, `.next`, `.env.local` ou `out`).
2. Importez le dépôt dans Vercel et sélectionnez Next.js.
3. Utilisez `npm ci` pour l’installation et `npm run build` pour la compilation.
4. Configurez `NEXT_PUBLIC_SITE_URL=https://ctokoffi.me` et, si besoin, votre URL Spline.
5. Ajoutez `ctokoffi.me` dans les domaines du projet et appliquez **les enregistrements DNS affichés par Vercel**.

Les liens vers les anciens domaines de démonstration dans les fiches projets sont indépendants du domaine du portfolio.

## Serveur Node.js

```bash
npm ci
npm run check
npm run build
npm start
```

Le serveur écoute par défaut sur le port 3000. Exemple pour un autre port :

```bash
npm start -- -p 4000
```

Utilisez votre gestionnaire de processus et votre reverse proxy habituels pour le HTTPS et le domaine. Gardez les dépendances installées, le dossier `.next`, `public`, les fichiers de configuration et les métadonnées npm. Le dossier source est utile pour les prochaines mises à jour.

## Hébergement statique

```bash
npm ci
npm run build:static
```

Le résultat se trouve dans `out/`. Publiez tout son contenu, y compris `_next/`, les pages À propos, Projets, Recherche, Journal et Contact, les ressources publiques, `robots.txt`, `sitemap.xml` et `404.html`.

Le script active `output: 'export'` et `trailingSlash: true` uniquement pour cette compilation. Il fonctionne sur Windows, macOS et Linux sans syntaxe de variable d’environnement spécifique au shell. Les pages d’articles sont produites à partir de `generateStaticParams()`.

Pour revenir au mode Node : exécutez à nouveau `npm run build`, puis `npm start`. `next start` n’est pas un serveur pour le dossier `out/`.

Un export statique ne peut pas exécuter des API serveur, des Server Actions, une authentification serveur ou une base de données à la volée. Le portfolio actuel n’en dépend pas. Si vous ajoutez ces fonctionnalités, choisissez un hébergement Next.js avec runtime serveur.

## Domaine et SEO

Le domaine par défaut dans le code est `https://ctokoffi.me`. Changez `NEXT_PUBLIC_SITE_URL` si vous utilisez un autre domaine et reconstruisez le site. Le SEO comprend les métadonnées, les URL canoniques, les données structurées WebSite/Person/ProfilePage/CreativeWork/ScholarlyArticle/BlogPosting/BreadcrumbList, un sitemap et un fichier robots. Après le déploiement sur le domaine final, validez la propriété dans Google Search Console et Bing Webmaster Tools puis soumettez `https://ctokoffi.me/sitemap.xml`.

Le fichier `robots.txt` autorise l’indexation : à adapter si vous publiez une version de test que vous souhaitez garder hors des moteurs. Un robots.txt ne remplace pas un contrôle d’accès.
