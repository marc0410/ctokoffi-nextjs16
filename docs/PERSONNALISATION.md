# Personnaliser le projet

## 1. Identité, liens et chiffres

Modifiez `src/content/site.ts`. La variable `site.url` sert au SEO. Les chiffres d’impact sont `site.impact.users` et `site.impact.volumeMillionsFCFA` : la deuxième valeur est exprimée en **millions de FCFA**. Les compteurs et leurs libellés accessibles suivent ces valeurs.

Le texte éditorial de l’accueil, de la biographie et de la formation est dans `src/components/portfolio/Portfolio.tsx`. Les liens et textes propres aux projets sont dans `src/content/projects.ts`.

## 2. Ajouter un projet

Ajoutez un objet à `projects` dans `src/content/projects.ts`, en respectant l’interface `Project` de `src/types/content.ts` :

```ts
{
  id: 'mon-projet',
  name: 'Mon projet',
  url: 'https://exemple.com',
  subtitle: 'Le problème que ce produit résout.',
  category: 'Produit', // 'IA', 'Produit' ou 'Web3'
  year: '2026',
  role: 'Mon rôle réel',
  type: 'SECTEUR · EXPERTISE',
  color: '#c4b4f4',
  tags: ['Next.js', 'TypeScript'],
  summary: 'Résumé du projet.',
  challenge: 'Le défi rencontré.',
  approach: 'L’approche suivie.',
  outcome: 'Le résultat documenté.',
  metrics: [['2026', 'Année du projet']],
}
```

Le filtre, le compteur et la fiche sont alimentés automatiquement. Pour une illustration personnalisée, ajoutez un cas correspondant à `id` dans `ProjectArt.tsx`. Sans illustration dédiée, le composant utilise son illustration de secours ; remplacez-la pour éviter un visuel inadapté.

Le test de contenu vérifie actuellement la présence des neuf projets exportés : adaptez le nombre attendu dans `tests/content.test.ts` lorsque vous en ajoutez ou retirez.

## 3. Ajouter un article

Ajoutez un objet à `articles` dans `src/content/journal.ts`. Le slug doit être unique, en minuscules avec des tirets.

```ts
{
  slug: 'mon-nouvel-article',
  category: 'Engineering', // ou 'Architecture', 'Recherche'
  date: '28 octobre 2026',
  title: 'Le titre de ma note',
  excerpt: 'Une introduction courte pour la carte et les métadonnées.',
  readTime: '3 min',
  theme: 'field', // 'field', 'scale', 'trust'
  intro: 'Le paragraphe d’introduction.',
  sections: [
    ['Premier point', 'Le développement du premier point.'],
    ['Second point', 'Le développement du second point.'],
  ],
  takeaway: 'L’idée à retenir.',
  sources: [{title:'Une source',url:'https://exemple.com'}], // facultatif
}
```

La page `/journal/mon-nouvel-article`, la carte et le sitemap seront générés au prochain build. La page d’article reçoit un `params` asynchrone, conformément à l’App Router de Next.js 16. Aucun CMS n’est requis.

Pour ajouter une nouvelle catégorie ou un thème, mettez à jour le type `Article`, la barre de filtres dans `Journal.tsx` et, si nécessaire, les styles correspondants.

## 4. Couleurs et typographie

`src/app/globals.css` contient deux niveaux :

1. `@theme inline` : tokens Tailwind (`bg-background`, `text-accent`, `font-mono`…).
2. `@layer components` : styles du portfolio et des effets sur mesure.

Les polices locales sont importées dans `src/app/layout.tsx`. Vous pouvez changer de famille via Fontsource, puis modifier les variables et les déclarations typographiques du CSS. Ne supprimez pas les règles responsive ni celles de mouvement réduit sans les remplacer.

## 5. Animations et 3D

- `src/lib/animations.ts` enregistre les plugins GSAP.
- `Portfolio.tsx` définit la chronologie de l’accueil et les effets au défilement.
- `Preloader.tsx` définit l’introduction et son délai de sortie de secours.
- `Impact.tsx` anime les chiffres.
- `FieldEngineering.tsx` anime les étapes interactives.
- `Scene.tsx` définit la géométrie, la caméra, les lumières et le bloom.
- `Shader.tsx` contient les programmes GLSL OGL.
- `Particles.tsx` contient les options tsParticles.

Les scènes sont chargées exclusivement côté navigateur. N’accédez pas à `window`, `document` ou WebGL au niveau supérieur d’un module partagé avec le serveur. Préférez un effet ou une importation dynamique client.

Pour Spline : ajoutez une URL `.splinecode` à `NEXT_PUBLIC_SPLINE_SCENE_URL` dans `.env.local`, puis redémarrez. La scène native reste le choix par défaut.

## 6. CV et image de partage

Remplacez `public/Koffi-Marc-Ephrem-CV.pdf`, ou modifiez `site.cv` pour utiliser un autre nom. L’image Open Graph est `public/og.png` (1200 × 630). Le favicon est `public/favicon.svg`.

## 7. Vérifier avant publication

```bash
npm run format
npm run check
npm run build
```

Contrôlez ensuite sur ordinateur et mobile : le texte, les filtres, les neuf fiches, les liens externes, le menu, les articles, le bouton retour, le CV et les préférences de mouvement réduit. Vérifiez aussi la 3D avec et sans WebGL.
