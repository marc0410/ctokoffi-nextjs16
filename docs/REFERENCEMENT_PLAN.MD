# 🥇 Plan de référencement : devenir premier sur Google avec mon portfolio

> **Cible** : être en position 1 sur mon nom, puis sur mon métier et ma spécialité, avec un portfolio Next.js 16.
>
> **Comment utiliser ce document** : remplis les champs entre crochets `[ ]`, coche les cases au fur et à mesure et reviens-y chaque mois. Le guide technique (`SEO-PORTFOLIO-NEXTJS-16.md`) contient le code. Ce plan-ci contient la **stratégie, le contenu et le calendrier**.

---

## 1. Un objectif ambitieux, mais mesurable

« Être premier sur Google » ne veut rien dire tant qu'on ne précise pas **sur quelle recherche**. Personne ne peut garantir la place n°1 : Google décide seul, et son classement dépend de la concurrence. En revanche, on peut viser la première place de façon **réaliste et progressive** :

| Niveau | Requête type | Faisabilité | Délai estimé |
|---|---|---|---|
| **1. Marque** | `Prénom Nom`, `Prénom Nom développeur` | Très élevée, tu es presque seul sur ce nom | 2 à 8 semaines |
| **2. Métier + lieu** | `développeur Next.js [Ville]`, `développeur web freelance [Pays]` | Bonne si la concurrence locale est faible | 2 à 6 mois |
| **3. Spécialité** | `développeur Next.js freelance`, `développeur React TypeScript` | Difficile, concurrence nationale et internationale | 6 à 18 mois |
| **4. Longue traîne** | `migrer vers proxy.ts Next.js 16`, `portfolio Next.js SEO` | Accessible avec de bons articles | 1 à 4 mois |

**Stratégie** : gagner d'abord les niveaux 1 et 2 (rapides), publier des articles pour le niveau 4 (qui construit l'autorité), puis attaquer le niveau 3 quand le site a de la crédibilité.

---

## 2. Ma fiche d'identité SEO (à remplir)

Tout bon référencement part d'un positionnement clair. Complète ce tableau, il servira à écrire tous les titres et descriptions du site.

| Élément | Ma réponse |
|---|---|
| Nom complet (orthographe exacte, identique partout) | `[Prénom Nom]` |
| Métier principal | `[développeur full-stack / front-end / ...]` |
| Spécialité technique | `[Next.js 16, React 19, TypeScript, ...]` |
| Ville / pays visés | `[Ville], [Pays]` |
| Cibles | `[recruteurs / startups / PME / agences / clients étrangers]` |
| Objectif principal | `[trouver un CDI / des missions freelance / les deux]` |
| 3 projets phares | `[Projet 1], [Projet 2], [Projet 3]` |
| Résultat chiffré le plus fort | `[ex. site 2x plus rapide, +40 % de conversion]` |
| Langues du site | `[FR / FR + EN]` |
| Nom de domaine | `[prenomnom.com]` |
| Ma phrase d'accroche (1 ligne) | `[Je conçois des applications web rapides avec Next.js...]` |

> **Pourquoi c'est important** : Google comprend un site grâce à la cohérence. Si ton titre dit « développeur Next.js », ton H1 « créatif digital » et ton LinkedIn « ingénieur logiciel », tu brouilles le message. Choisis une identité et répète-la partout.

---

## 3. Stratégie de mots-clés

### 3.1 Les groupes de mots-clés (clusters)

Chaque groupe correspond à **une intention de recherche** et sera traité par **une page précise**.

| Groupe | Mots-clés principaux | Page cible |
|---|---|---|
| Marque | `[Prénom Nom]`, `[Prénom Nom] développeur`, `[Prénom Nom] portfolio` | Accueil + À propos |
| Métier local | `développeur web [Ville]`, `développeur Next.js [Pays]`, `freelance React [Ville]` | Accueil + Services |
| Spécialité | `développeur Next.js freelance`, `développeur React TypeScript`, `création site Next.js` | Services |
| Preuves | `exemple application Next.js`, `projet Next.js e-commerce`, `étude de cas Next.js` | Pages projets |
| Savoir-faire | `optimiser Lighthouse Next.js`, `Next.js 16 nouveautés`, `metadata API Next.js` | Blog |
| Contact | `engager développeur Next.js`, `devis site web Next.js` | Contact + Services |

### 3.2 Comment choisir les bons mots-clés

1. **Pense comme ton client** : un recruteur tape « développeur React », pas « artisan du pixel ».
2. **Valide avec Google** : tape ton mot-clé et regarde les suggestions et la rubrique « Autres questions posées ».
3. **Regarde la concurrence** : ouvre les 5 premiers résultats. Si ce sont des géants (Indeed, Malt, Wikipédia), vise une requête plus précise.
4. **Privilégie la précision** : `développeur Next.js freelance [Ville]` est plus facile à gagner que `développeur web`.
5. **Un mot-clé principal par page** : ne mets pas le même sur deux pages, elles se feraient concurrence (cannibalisation).

### 3.3 Où placer le mot-clé principal

- Dans le `title` (idéalement au début)
- Dans le `h1`
- Dans les 100 premiers mots du texte
- Dans l'URL (`/services/developpeur-nextjs`)
- Dans au moins un `h2`
- Dans l'`alt` d'une image pertinente
- Dans la meta description, naturellement

**Règle d'or** : écris pour un humain. Le « bourrage » de mots-clés est détecté et pénalisé.

---

## 4. Architecture du site

```text
/                         → Accueil (marque + métier + preuves)
/a-propos                 → Parcours, valeurs, stack, photo
/services                 → Ce que je propose, process, FAQ
/projets                  → Liste des projets
/projets/[slug]           → Étude de cas détaillée (x 3 minimum)
/blog                     → Liste des articles
/blog/[slug]              → Articles techniques
/contact                  → Formulaire + coordonnées
/mentions-legales         → Obligatoire
```

**Règles d'architecture** :
- Profondeur maximale : 3 clics depuis l'accueil
- Navigation identique sur toutes les pages (liens HTML, pas de boutons JavaScript)
- URLs courtes, en minuscules, sans accents, avec des tirets
- Un vrai fil d'Ariane sur les pages internes

---

## 5. Contenu optimisé page par page

### 5.1 Accueil

- **Title (≤ 60 caractères)** : `[Prénom Nom] | Développeur [spécialité] à [Ville]`
- **Description (120-160 car.)** : `Développeur [spécialité] basé à [Ville]. J'ai réalisé [N] projets avec Next.js, React et TypeScript. Découvrez mon travail et contactez-moi.`
- **H1** : `[Prénom Nom], développeur [spécialité]`
- **Contenu** (300-600 mots) : accroche, 3 projets phares, compétences en texte, chiffres clés, appel à l'action, lien vers contact.

### 5.2 À propos

- **Title** : `À propos de [Prénom Nom] | Parcours et compétences`
- Contenu (500-800 mots) : parcours, formations, expériences, valeurs, stack, photo réelle, liens sociaux (GitHub, LinkedIn).
- Ajoute des preuves de confiance : certifications, années d'expérience, clients, témoignages.

### 5.3 Services

- **Title** : `Développeur Next.js freelance à [Ville] | Services`
- Une section par offre (site vitrine, application web, optimisation SEO et performance, refonte).
- Pour chaque offre : problème résolu, méthode, livrables, délais indicatifs.
- Ajoute une **FAQ** de 5 à 8 questions réelles (délais, tarifs, technologies, process, support).

### 5.4 Pages projets (le cœur du portfolio)

Structure de chaque étude de cas (500-1000 mots) :

1. **Contexte** : client, secteur, objectif
2. **Défi** : le problème à résoudre
3. **Solution** : choix techniques et pourquoi (Next.js 16, rendu serveur, base de données…)
4. **Résultats** : chiffres (vitesse, trafic, conversion, score Lighthouse)
5. **Technologies utilisées** : liste en texte
6. **Captures d'écran** avec `alt` descriptif
7. **Liens** : site en ligne, code source GitHub
8. **Appel à l'action** : « Un projet similaire ? Contactez-moi »

> Une page projet qui contient seulement une image et trois mots ne se classera jamais. C'est le contenu texte qui crée la valeur.

### 5.4 Contact

- Formulaire simple, email visible, liens sociaux, délai de réponse annoncé.
- Données structurées `ContactPoint` si tu veux aller plus loin.

---

## 6. Plan de blog : 12 articles en 3 mois

Un blog régulier est le levier le plus puissant pour une longue traîne qui t'apporte du trafic. Objectif : **1 article par semaine**, 800 à 1500 mots chacun.

| # | Titre proposé | Intention |
|---|---|---|
| 1 | Comment j'ai construit mon portfolio avec Next.js 16 | Retour d'expérience, preuve d'expertise |
| 2 | Next.js 16 : ce qui change (proxy.ts, Turbopack, params async) | Actualité technique |
| 3 | Metadata API de Next.js : guide complet pour le SEO | Tutoriel |
| 4 | Obtenir 100/100 sur Lighthouse avec Next.js | Performance |
| 5 | Générer des images Open Graph dynamiques avec Next.js | Tutoriel |
| 6 | Données structurées JSON-LD dans Next.js : exemples concrets | Tutoriel |
| 7 | Next.js vs Remix vs Astro pour un portfolio | Comparatif |
| 8 | Erreurs SEO fréquentes sur un site Next.js | Liste pratique |
| 9 | Comment bien présenter ses projets dans un portfolio de développeur | Conseil carrière |
| 10 | Étude de cas : [ton meilleur projet], de l'idée à la mise en ligne | Preuve |
| 11 | Les outils que j'utilise au quotidien en tant que développeur Next.js | Expertise |
| 12 | Combien coûte un site Next.js ? Les facteurs qui font varier le prix | Intention commerciale |

**Pour chaque article** :
- 1 mot-clé principal, repris dans le title, le H1 et l'URL
- Une introduction qui répond vite à la question
- Des titres `h2` / `h3` clairs
- Des exemples de code ou des captures
- Des liens internes vers tes projets et ta page Services
- Une conclusion avec appel à l'action
- Schéma `BlogPosting` (auteur, dates, image)

---

## 7. Les bases techniques (résumé)

Le détail et le code sont dans `SEO-PORTFOLIO-NEXTJS-16.md`. Voici l'essentiel à vérifier :

- [ ] `metadataBase`, `title.template`, `description` unique sur chaque page
- [ ] `generateMetadata` avec `params` en **Promise** (Next.js 16)
- [ ] `sitemap.ts`, `robots.ts`, `manifest.ts` en place
- [ ] Image Open Graph dynamique pour l'accueil et chaque projet
- [ ] JSON-LD : `Person`, `WebSite`, `BreadcrumbList`, `CreativeWork`, `BlogPosting`
- [ ] `proxy.ts` qui n'intercepte pas `sitemap.xml`, `robots.txt` ni les images OG
- [ ] Image principale en `preload` / prioritaire, autres en lazy-load
- [ ] Core Web Vitals : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1
- [ ] HTTPS, un seul domaine canonique (www ou non), 404 personnalisée
- [ ] Lighthouse ≥ 90 partout, testé en production (`build` + `start`)

---

## 8. Autorité : être cité ailleurs

Google classe mieux un site que **d'autres sites et profils mentionnent**. Pour un portfolio, la voie la plus efficace n'est pas l'achat de liens (risqué), mais la présence active :

### Profils à créer avec lien vers ton site

| Plateforme | Action |
|---|---|
| **GitHub** | README de profil soigné, champ « Website » rempli, repos épinglés avec liens vers les études de cas |
| **LinkedIn** | Titre aligné avec ton positionnement, lien dans les coordonnées, projets en vedette |
| **X / Bluesky / Mastodon** | Bio avec lien, partage de chaque nouvel article |
| **Dev.to / Hashnode** | Republie tes articles avec lien canonique vers ton blog |
| **Malt / Upwork / Contra** | Profil complet, lien vers le portfolio |
| **npm / open source** | `homepage` dans `package.json`, contributions avec ton profil |

### Actions de netlinking naturel

1. Contribuer à des projets open source et afficher ton site dans ta bio.
2. Écrire un article invité sur un blog tech.
3. Participer à des meetups, podcasts ou événements (la page de l'événement fait un lien).
4. Demander à tes anciens clients ou employeurs de mentionner ton site.
5. Te faire référencer dans des annuaires de développeurs sérieux.

**Cohérence** : même nom, même photo, même bio courte partout, et `sameAs` dans le JSON-LD pour que Google relie tous tes profils.

---

## 9. Planning sur 90 jours

### Mois 1 : fondations

| Semaine | Actions |
|---|---|
| **S1** | Remplir la fiche d'identité, choisir le domaine, configurer layout, metadata, favicons |
| **S2** | `sitemap.ts`, `robots.ts`, JSON-LD, images OG, pages Accueil / À propos / Contact |
| **S3** | Rédiger Services + 2 premières études de cas |
| **S4** | Audit Lighthouse, corrections, mise en ligne, Search Console + Bing, sitemap soumis |

### Mois 2 : contenu et visibilité

| Semaine | Actions |
|---|---|
| **S5** | 3e étude de cas + articles 1 et 2 |
| **S6** | Articles 3 et 4, optimisation des profils GitHub / LinkedIn |
| **S7** | Articles 5 et 6, partage sur les réseaux, Dev.to |
| **S8** | Premier bilan Search Console, ajustement des titres à faible CTR |

### Mois 3 : accélération

| Semaine | Actions |
|---|---|
| **S9** | Articles 7 et 8, demande de témoignages |
| **S10** | Articles 9 et 10, contribution open source |
| **S11** | Articles 11 et 12, article invité ou podcast |
| **S12** | Bilan complet, amélioration des pages qui progressent, plan du trimestre suivant |

---

## 10. Suivi et indicateurs

### À suivre chaque mois dans Search Console

| Indicateur | Où le trouver | Objectif |
|---|---|---|
| Impressions | Performances | En hausse chaque mois |
| Clics | Performances | En hausse |
| Position moyenne sur ton nom | Performances → requêtes | Position 1 |
| CTR | Performances | ≥ 5 % sur les pages bien classées |
| Pages indexées | Indexation → Pages | Toutes les pages importantes |
| Core Web Vitals | Expérience | Pages « bonnes » |

### Requêtes de contrôle à taper dans Google

- `site:[tondomaine]` : pages indexées
- `"[Prénom Nom]"` : ta position sur ta marque
- `[Prénom Nom] [métier]` : ton positionnement professionnel

### Comment améliorer en continu

1. **Pages à beaucoup d'impressions et peu de clics** : réécris le title et la description.
2. **Pages en positions 8 à 20** : ajoute du contenu, des liens internes, des exemples.
3. **Articles qui montent** : mets-les à jour régulièrement et crée des articles voisins.
4. **Pages qui stagnent** : fusionne-les ou améliore-les, ne publie pas plus pour publier.

---

## 11. Pièges à éviter

- **Promettre ou croire à une place n°1 garantie** : le classement dépend de Google et de la concurrence.
- **Acheter des backlinks ou des « packs SEO »** : risque de pénalité.
- **Contenu copié ou généré sans valeur** : Google le déclasse. Apporte ton expérience réelle.
- **Bourrer de mots-clés** : écris pour les humains.
- **Site en JavaScript seul, sans texte HTML** : garde les Server Components pour le contenu.
- **Changer des URLs sans redirection 301**.
- **Négliger le mobile** : Google indexe d'abord la version mobile.
- **Publier une fois puis abandonner** : la régularité compte plus que le volume.
- **Tester la performance en mode `dev`** : toujours en production.

---

## 12. Ce que je dois savoir pour aller plus loin

Je n'ai pas encore vu ton parcours détaillé, ni le contenu de ton portfolio. Pour transformer ce plan en textes prêts à publier, donne-moi :

1. Ton nom, ton métier et ta spécialité exacts
2. Ta ville et ton pays cibles
3. Ton parcours (formations, expériences, années d'expérience)
4. Tes 3 meilleurs projets avec leurs résultats
5. Tes liens (GitHub, LinkedIn, domaine)
6. Ton objectif : emploi, freelance, ou les deux

Avec ces informations, je peux rédiger :
- les `title`, descriptions et H1 de chaque page
- le texte de l'accueil, de la page À propos et des études de cas
- le JSON-LD personnalisé
- les premiers articles de blog

---

## ✅ Résumé en 10 points

1. Vise d'abord ton **nom**, puis ton **métier + ville**, puis ta **spécialité**.
2. Définis une identité claire et répète-la partout.
3. Une page = un mot-clé principal.
4. Crée de vraies pages : Services, À propos, Projets, Blog, Contact.
5. Écris 3 études de cas détaillées avec des chiffres.
6. Publie 1 article technique par semaine pendant 3 mois.
7. Soigne les bases techniques Next.js 16 (metadata, sitemap, JSON-LD, perf).
8. Soumets le site à Search Console et Bing dès la mise en ligne.
9. Construis ton autorité avec GitHub, LinkedIn, open source, articles invités.
10. Mesure chaque mois, corrige, recommence.

> **Rappel** : le SEO est un travail de fond. Les premiers résultats arrivent en quelques semaines sur ton nom, et les positions les plus convoitées en plusieurs mois de contenu régulier. La place n°1 se mérite, elle ne s'achète pas.


