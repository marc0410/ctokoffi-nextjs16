# Vérifications de l’export

Validation effectuée le 28 octobre 2026 dans l’environnement de préparation (Node.js 24.22.1, npm 11.9).

| Contrôle                                   | Résultat                                     |
| ------------------------------------------ | -------------------------------------------- |
| Installation npm et génération du lockfile | Réussie                                      |
| TypeScript strict (`npm run typecheck`)    | Réussi                                       |
| ESLint (`npm run lint`)                    | Réussi, sans erreur ni avertissement de code |
| Tests de contenu (`npm test`)              | 4 réussis                                    |
| Compilation de production Next.js 16.4.3   | Réussie                                      |
| Export statique (`npm run build:static`)   | Réussi                                       |

Les tests contrôlent l’unicité des identifiants des neuf projets, les URL externes HTTPS, les slugs des articles, la cohérence des DOI/liens PDF Zenodo et la présence d’un véritable PDF pour le CV. Ils ne mesurent pas la capacité de charge des plateformes présentées.

La compilation génère l’accueil, l’index du journal, trois articles, la page 404, le sitemap et robots.txt. Les fichiers générés et `node_modules` sont volontairement exclus du ZIP : ils sont reproductibles avec npm.

La validation navigateur et GPU de cette migration reste à effectuer. Les commandes ci-dessus ne vérifient pas visuellement les transitions, les interactions au toucher, les scènes WebGL ou une scène Spline externe. Aucun résultat Lighthouse ni test de charge n’est revendiqué.

Après installation sur votre machine, contrôlez l’accueil, le menu mobile, les filtres et fiches projet, les trois articles, les liens de publications, le téléchargement du CV et le contact. Vérifiez aussi le mode de mouvement réduit et les effets 3D avec votre navigateur et votre carte graphique.

Node.js 22 est proposé dans `.nvmrc` et dans la CI. L’exécution locale de cette préparation a utilisé Node.js 24 ; la CI Node.js 22 n’a pas été lancée sur un dépôt distant.
