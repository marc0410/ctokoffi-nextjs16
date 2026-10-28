# Koffi — Portfolio Next.js 16

Projet complet et modifiable du portfolio de **Kan Marc-Ephrem Koffi**, migré vers **Next.js 16.4.3 / App Router**, **React 19**, **TypeScript strict** et **Tailwind CSS 4**. Gestion des dépendances avec **npm** et `package-lock.json` inclus.

Le site conserve les neuf projets, les deux prépublications, le parcours, les compétences, les chiffres d’impact, le CV PDF, les animations GSAP/Motion et les effets 3D. Le journal possède désormais de vraies pages `/journal/[slug]`, avec métadonnées et génération statique.

## Démarrage rapide

Prérequis : **Node.js 20.9 minimum ; Node.js 22 recommandé**, npm 10 ou supérieur. Compatible macOS, Linux et Windows/WSL. Le fichier `.nvmrc` indique Node 22 si vous utilisez nvm.

Après extraction du ZIP :

```bash
cd ctokoffi-nextjs16
npm ci
npm run dev
```

Ouvrez **http://localhost:3000**. Les modifications des fichiers sont rechargées automatiquement.

`node_modules` n’est pas fourni : `npm ci` installe exactement les versions du fichier de verrouillage. Aucun compte ChatGPT, identifiant Sites, clé API ou service externe payant n’est requis pour lancer le projet.

### Variables d’environnement

Le projet fonctionne sans configuration supplémentaire. Vous pouvez copier `.env.example` vers `.env.local` si vous souhaitez personnaliser les valeurs :

```bash
# macOS / Linux / WSL
cp .env.example .env.local
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env.local
```

| Variable                       | Utilité                                              | Valeur par défaut                |
| ------------------------------ | ---------------------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Origine des liens canoniques, sitemap et métadonnées | `https://ctokoffi.me`            |
| `NEXT_PUBLIC_SPLINE_SCENE_URL` | URL facultative d’une scène `.splinecode`            | Vide : sculpture Three.js native |

Les variables `NEXT_PUBLIC_` sont publiques et intégrées lors de la compilation. N’y mettez jamais de secret. Redémarrez le serveur de développement après modification ; reconstruisez le projet pour une publication.

## Modifier le portfolio

| Ce que vous voulez changer                                    | Fichier                                                        |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| Nom, marque, email, réseaux, domaine, CV et chiffres d’impact | `src/content/site.ts`                                          |
| Projets, liens, technologies, descriptions et résultats       | `src/content/projects.ts`                                      |
| Expériences et compétences                                    | `src/content/projects.ts`                                      |
| Articles et prépublications                                   | `src/content/journal.ts`                                       |
| Types des données                                             | `src/types/content.ts`                                         |
| Accueil, biographie, formation, navigation et contact         | `src/components/portfolio/Portfolio.tsx`                       |
| Apparence de chaque illustration projet                       | `src/components/portfolio/ProjectArt.tsx`                      |
| Intro et galerie                                              | `src/components/portfolio/Preloader.tsx`, `ProjectGallery.tsx` |
| Approche Forward Deployed Engineer                            | `src/components/sections/FieldEngineering.tsx`                 |
| Compteurs, publications et cartes du journal                  | `src/components/sections/`                                     |
| Modèle des pages d’articles                                   | `src/app/journal/[slug]/page.tsx`                              |
| Styles et couleurs                                            | `src/app/globals.css`                                          |
| Sculpture, shader, particules et Spline                       | `src/components/visuals/`                                      |
| PDF du CV et image de partage                                 | `public/`                                                      |

Les données sont typées : votre éditeur signale les champs manquants. Le guide `docs/PERSONNALISATION.md` explique comment ajouter des projets et des articles.

### Tailwind et styles sur mesure

Tailwind est installé avec `@tailwindcss/postcss` et utilisé dans les layouts App Router, les pages du journal et les composants de partage. Les couleurs et polices sont définies avec `@theme inline` dans `globals.css`.

Les styles artistiques existants — sculpture de secours, illustrations, galerie, masque et animations — restent dans `@layer components` de `globals.css`. Vous pouvez les modifier directement ou ajouter des classes Tailwind : les utilities ont la priorité sur cette couche. Cette migration préserve le design ; elle ne transforme pas artificiellement chaque effet CSS en une longue suite de classes.

## Commandes

| Commande               | Action                                          |
| ---------------------- | ----------------------------------------------- |
| `npm ci`               | Installation reproductible à partir du lockfile |
| `npm run dev`          | Développement Next.js avec Turbopack            |
| `npm run build`        | Compilation de production Next.js               |
| `npm start`            | Serveur de production, après le build           |
| `npm run check`        | TypeScript, ESLint et tests                     |
| `npm run typecheck`    | Vérification TypeScript stricte                 |
| `npm run lint`         | Analyse ESLint                                  |
| `npm test`             | Tests de contenu, routes et ressources          |
| `npm run format`       | Formatage du code avec Prettier                 |
| `npm run format:check` | Contrôle du formatage                           |
| `npm run build:static` | Site statique complet dans `out/`               |

Pour ajouter un package : `npm install nom-du-package`. Pour une dépendance de développement : `npm install -D nom-du-package`. Conservez et versionnez les modifications de `package.json` **et** `package-lock.json`.

## Stack incluse

- **Next.js 16.4.3**, App Router, React 19.3.1.
- **TypeScript**, `strict: true`, aucun `@ts-nocheck` ni `any` ajouté pour contourner le typage.
- **Tailwind CSS 4**, PostCSS et styles de composants personnalisés.
- **GSAP / ScrollTrigger / @gsap/react** : apparitions, parallaxe, compteurs, masques et textes.
- **Motion** : transitions React, galerie, accordéons et progression de lecture.
- **Three.js / React Three Fiber / Drei / Postprocessing** : scène 3D, environnement et bloom.
- **OGL** : shader de recherche.
- **tsParticles** : particules de contact, chargées avec le bundle slim.
- **Spline** : adaptateur facultatif, sans scène externe imposée.
- **Lucide** : icônes ; **Fontsource** : polices servies localement.
- **ESLint / Prettier / node:test / tsx** : qualité et vérifications.

Les versions exactes installées sont enregistrées dans `package-lock.json`. Les modules visuels lourds sont chargés à la demande côté client avec `next/dynamic` et `ssr: false`, sans bloquer le rendu serveur du contenu.

## Déploiement

Consultez `docs/DEPLOIEMENT.md` pour Vercel, un serveur Node et un hébergement statique.

```bash
# Vérifier et compiler
npm run check
npm run build
npm start
```

Ou, pour un hébergement statique :

```bash
npm run build:static
```

Publiez alors le contenu de `out/`. Le journal est entièrement généré à la compilation. La configuration DNS de `ctokoffi.me` doit être adaptée à **votre nouvel hébergeur** ; les anciens enregistrements d’un autre hébergement ne sont pas à recopier automatiquement.

## Ce qui fonctionne sans backend

Navigation, animations, galerie filtrable, fiches projet, accordéons, pages du journal, copie d’adresse/lien, CV téléchargeable et liens de publications. Les contacts ouvrent le logiciel de messagerie du visiteur avec `mailto:`.

Il n’y a pas de CMS, d’administration, d’authentification, de base de données ni d’envoi d’email serveur dans ce projet. Le blog est édité dans les fichiers TypeScript. Cela correspond au portfolio livré ; vous pouvez ajouter ensuite un backend, un CMS ou un service d’email.

## Accessibilité et vérifications

Préférence de mouvement réduit, réglage Motion on/off, boutons nommés, onglets accessibles, dialogue natif et gestion du focus, lien d’évitement, repli sans WebGL et chargement client des scènes.

Les contrôles effectués et leurs limites sont consignés dans `docs/VALIDATION.md`. La revue visuelle de cette migration et le rendu GPU sur un appareil compatible restent à effectuer : aucun contrôle navigateur n’est revendiqué pour cet export.

## Contenu et droits

Le contenu provient du CV, des informations et des liens fournis. Les chiffres `100 000+` et `200 M+ FCFA` sont cumulés sur l’ensemble des plateformes ; ils ne représentent ni un débit par seconde, ni du revenu, ni une charge simultanée. Les illustrations des projets sont des interprétations visuelles et sont légendées comme telles.

Le CV est conservé tel que fourni. Les deux travaux Zenodo sont présentés comme des prépublications. Le statut conceptuel du HLS et sa validation empirique en cours sont conservés.

Ce ZIP ne contient ni les accès d’hébergement, ni l’historique Git privé, ni des identifiants de publication. Les bibliothèques tierces conservent leurs propres licences. L’export est indépendant du site précédemment hébergé ; les changements effectués dans cette copie ne le modifient pas automatiquement.
