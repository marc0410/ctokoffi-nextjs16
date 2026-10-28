import type { Project, Experience, SkillGroup } from '@/types/content';
export const projects: Project[] = [
  {
    id: 'fvundi',
    url: 'https://fvundi.vercel.app/',
    name: 'Fvundi',
    subtitle: 'L’IA au service de l’inclusion financière.',
    category: 'IA',
    year: '2026 — en cours',
    role: 'Founder & CTO',
    type: 'FINTECH · ML / RAG',
    color: '#c4b4f4',
    tags: ['XGBoost', 'LlamaIndex', 'SHAP', 'FastAPI'],
    summary:
      'Un scoring de crédit explicable, pensé pour les réalités des économies émergentes. Une architecture qui sépare la prédiction de son explication.',
    challenge:
      'Comment évaluer la solvabilité à partir de données Mobile Money tout en rendant chaque décision compréhensible et contrôlable ?',
    approach:
      'XGBoost produit le score. TreeSHAP identifie les facteurs de décision. Une couche RAG — LlamaIndex, Cohere, pgvector et Claude — construit une explication ancrée dans ces facteurs. Le pipeline MLOps intègre détection d’anomalies et suivi de dérive.',
    outcome:
      'Le travail a mis en évidence des écarts de fidélité des explications entre profils démographiques, à prédiction ML identique. Ce constat nourrit un programme de recherche sur la supervision constitutionnelle des systèmes hybrides.',
    metrics: [
      ['ML + RAG', 'Architecture hybride'],
      ['SHAP', 'Interprétabilité'],
      ['2026', 'Recherche & développement'],
    ],
  },

  {
    id: 'kvix',
    name: 'Kvix',
    url: 'https://kvisx.vercel.app/',
    subtitle: 'Rendre la donnée carbone exploitable.',
    category: 'Produit',
    year: 'Climate intelligence',
    role: 'Co-founder · Produit & engineering',
    type: 'CLIMATE TECH · CARBON INTELLIGENCE',
    color: '#c6d2b1',
    tags: ['Carbon intelligence', 'dMRV', 'NFC', 'Gouvernance'],
    summary:
      'Une infrastructure d’intelligence carbone pour structurer la donnée, rendre les projets lisibles et rapprocher initiatives climatiques et investisseurs.',
    challenge:
      'Transformer des données carbone fragmentées en informations utiles à la décision pour les entreprises, les institutions et les investisseurs.',
    approach:
      'Le projet présente un Carbon Score, une lecture des scopes 1, 2 et 3, un label vérifiable et un espace de projets. La gouvernance carbone et la traçabilité sont au cœur du positionnement.',
    outcome:
      'Une présentation web de la vision Kvix : rendre les données carbone plus structurées et les projets plus compréhensibles pour les acteurs du financement climatique.',
    metrics: [
      ['A–E', 'Échelle Carbon Score'],
      ['3', 'Scopes présentés'],
      ['Afrique', 'Marché ciblé'],
    ],
  },
  {
    id: 'nalia',
    name: 'Nalia',
    url: 'https://nallia.vercel.app/',
    subtitle: 'Connecter les femmes à leurs possibilités.',
    category: 'Produit',
    year: 'Impact & communautés',
    role: 'Contribution au projet · Produit web',
    type: 'IMPACT TECH · MENTORSHIP',
    color: '#e5bac4',
    tags: ['Mentorat', 'Leadership', 'Formation', 'Communauté'],
    summary:
      'Une plateforme panafricaine autour du mentorat, des ressources santé, de la formation et de l’incubation pour les femmes.',
    challenge:
      'Réunir des ressources et des parcours d’accompagnement dans une expérience claire, adaptée à des objectifs professionnels et personnels variés.',
    approach:
      'La plateforme organise le parcours autour du profil, des objectifs, de la mise en relation et de la progression. Elle rapproche mentorat, formation, leadership et ressources de bien-être.',
    outcome:
      'Une expérience web qui présente les services et le parcours de la communauté Nalia, avec un accès aux différentes formes d’accompagnement.',
    metrics: [
      ['4', 'Axes d’accompagnement'],
      ['Mentorat', 'Mise en relation'],
      ['Afrique', 'Communauté ciblée'],
    ],
  },
  {
    id: 'rix',
    name: 'Rix³',
    url: 'https://rix3.vercel.app/',
    subtitle: 'Relier les parcours de santé.',
    category: 'Web3',
    year: 'Healthtech & pharmacie',
    role: 'Contribution au projet · Produit web',
    type: 'HEALTHTECH · PHARMACY',
    color: '#b8d7d5',
    tags: ['Ordonnances', 'OCR', 'Pharmacie', 'Traçabilité'],
    summary:
      'Une expérience numérique autour de la pharmacie, des ordonnances et de la traçabilité, avec des parcours destinés aux patients et aux professionnels.',
    challenge:
      'Rendre les informations et les étapes d’un parcours pharmaceutique plus lisibles, de l’ordonnance à son suivi.',
    approach:
      'L’interface présente un scanner d’ordonnances, des fonctions de suivi et de notification, ainsi qu’un carnet de santé numérique. La traçabilité blockchain fait partie du concept produit.',
    outcome:
      'Un projet web qui met en scène les interactions entre prescriptions, suivi patient et pharmacie dans une expérience cohérente.',
    metrics: [
      ['OCR', 'Parcours de numérisation'],
      ['Suivi', 'Ordonnances'],
      ['Web3', 'Concept de traçabilité'],
    ],
  },
  {
    id: 'immo',
    name: 'Immo Plus',
    subtitle: 'Rapprocher les personnes et les lieux.',
    category: 'Produit',
    year: 'Fév. 2026 — aujourd’hui',
    role: 'Chief Technology Officer',
    type: 'PROPTECH · MOBILE & AI',
    color: '#d9e2b7',
    tags: ['Flutter', 'NestJS', 'Qdrant', 'Claude'],
    summary:
      'Deux applications mobiles, un écosystème professionnel et un moteur de recherche immobilier conversationnel adapté au marché ivoirien.',
    challenge:
      'Créer une expérience immobilière fluide pour les particuliers et les professionnels, dans un contexte de connectivité variable.',
    approach:
      'Architecture Flutter et NestJS tolérante aux connexions instables. Moteur Agentic RAG avec LlamaIndex, Qdrant et Claude. Coffre-fort documentaire chiffré et suivi de portefeuille pour les professionnels.',
    outcome:
      'Plus de 20 000 téléchargements organiques en cinq mois, un outil conçu pour plus de 800 professionnels et une recherche conversationnelle sous 400 ms.',
    metrics: [
      ['20k+', 'Téléchargements'],
      ['800+', 'Professionnels'],
      ['2', 'Applications mobiles'],
    ],
  },
  {
    id: 'style',
    name: 'Style Pass',
    subtitle: 'Une identité pour ce qui a de la valeur.',
    category: 'Web3',
    year: 'Sept. 2025 — janv. 2026',
    role: 'Chief Technology Officer',
    type: 'FASHION TECH · BLOCKCHAIN',
    color: '#e0bbb0',
    tags: ['VeChain', 'NFC', 'Web3', 'Mobile'],
    summary:
      'Une identité numérique vérifiable pour les pièces de luxe, à la croisée des objets physiques et de la blockchain.',
    challenge:
      'Relier un objet physique à une identité numérique résistante à la falsification, avec une expérience mobile simple.',
    approach:
      'Conception du Style Pass Code, associant des puces NFC à la blockchain VeChain. Pilotage de l’interopérabilité NFC, Web3 et mobile.',
    outcome:
      'Projet sélectionné en incubation par la Banque africaine de développement dans le cadre de Fashionomics Africa.',
    metrics: [
      ['NFC', 'Lien physique / digital'],
      ['VeChain', 'Traçabilité'],
      ['BAD', 'Fashionomics Africa'],
    ],
  },
  {
    id: 'naturalink',
    name: 'Naturalink',
    subtitle: 'La confiance, de la terre à la chaîne.',
    category: 'Web3',
    year: 'Juin — sept. 2025',
    role: 'Chief Technology Officer',
    type: 'AGRI TECH · TRACEABILITY',
    color: '#b5c9bb',
    tags: ['Blockchain', 'IoT', 'NFC', 'Cloud'],
    summary:
      'Une chaîne d’approvisionnement agricole certifiée par blockchain, qui connecte traçabilité, données terrain et infrastructure cloud.',
    challenge:
      'Rendre les étapes d’une chaîne agricole traçables et vérifiables au-delà des systèmes fragmentés.',
    approach:
      'Définition de la vision technique et d’une architecture cloud associant IoT, NFC et registres décentralisés.',
    outcome:
      'Incubation par Orange dans le programme Digi Green & Agri. L’architecture a accompagné une levée pre-seed de 32 millions de FCFA.',
    metrics: [
      ['32 M', 'FCFA · pre-seed'],
      ['Orange', 'Incubation'],
      ['IoT', 'Données terrain'],
    ],
  },
  {
    id: 'ndaya',
    name: 'Ndaya',
    subtitle: 'Le commerce à l’échelle des communautés.',
    category: 'Produit',
    year: 'Sept. 2024 — mai 2025',
    role: 'Chief Technology Officer',
    type: 'SOCIAL COMMERCE · PLATFORM',
    color: '#bdc5e8',
    tags: ['Next.js', 'NestJS', 'CI/CD', 'Microservices'],
    summary:
      'Une plateforme de social commerce repensée pour gagner en efficacité, de l’infrastructure à la recommandation vidéo.',
    challenge:
      'Faire évoluer l’architecture, réduire les coûts opérationnels et fiabiliser les livraisons web et iOS.',
    approach:
      'Migration vers des microservices, automatisation CI/CD et développement d’un moteur de recommandation vidéo avec Next.js et NestJS.',
    outcome:
      'Réduction de 65 % des coûts opérationnels et industrialisation des déploiements web et iOS.',
    metrics: [
      ['−65 %', 'Coûts opérationnels'],
      ['CI/CD', 'Livraisons automatisées'],
      ['Web + iOS', 'Multiplateforme'],
    ],
  },
  {
    id: 'solana',
    name: 'Solana Pay',
    subtitle: 'Le paiement, sans friction.',
    category: 'Web3',
    year: '2025',
    role: 'Projet de fin d’études · HEC Abidjan',
    type: 'BLOCKCHAIN · PAYMENTS',
    color: '#b7dbcf',
    tags: ['Solana', 'USDC', 'Biométrie', 'Wallets'],
    summary:
      'Une application de paiement USDC sur Solana, associant authentification biométrique et gestion sécurisée de plusieurs portefeuilles.',
    challenge:
      'Réunir simplicité d’usage, contrôle des accès et gestion multi-wallet dans une application de paiement.',
    approach:
      'Intégration de paiements USDC sur Solana, d’une authentification biométrique et d’une gestion sécurisée des portefeuilles.',
    outcome: 'Application déployée dans le cadre du projet de fin d’études à HEC Abidjan en 2025.',
    metrics: [
      ['USDC', 'Paiement stablecoin'],
      ['Solana', 'Infrastructure'],
      ['2025', 'Projet académique'],
    ],
  },
];
export const experience: Experience[] = [
  [
    '2026 — Présent',
    'Founder & CTO',
    'Fvundi',
    'IA financière, scoring explicable et gouvernance des systèmes ML-RAG.',
  ],
  [
    '2026 — Présent',
    'Chief Technology Officer',
    'Immo Plus',
    'Produits mobiles, Agentic RAG et outils métier pour l’immobilier.',
  ],
  [
    '2025 — 2026',
    'Chief Technology Officer',
    'Style Pass',
    'Identité numérique des actifs de luxe. Incubation Fashionomics Africa / BAD.',
  ],
  [
    '2025',
    'Chief Technology Officer',
    'Naturalink',
    'Traçabilité agricole et blockchain. Incubation Orange Digi Green & Agri.',
  ],
  [
    '2024 — 2025',
    'Chief Technology Officer',
    'Ndaya',
    'Microservices, social commerce, recommandation vidéo et CI/CD.',
  ],
];
export const skillGroups: SkillGroup[] = [
  [
    '01',
    'Intelligence artificielle',
    [
      'Python',
      'XGBoost',
      'PyTorch',
      'LlamaIndex',
      'RAG',
      'Claude / Cohere',
      'SHAP',
      'Qdrant / pgvector',
    ],
  ],
  [
    '02',
    'Produit & engineering',
    [
      'Solutions engineering',
      'Intégration métier',
      'NestJS',
      'Next.js',
      'Flutter',
      'Swift',
      'PostgreSQL',
      'Redis',
      'REST API',
      'Microservices',
    ],
  ],
  [
    '03',
    'Infrastructure & Web3',
    [
      'AWS / GCP',
      'Docker',
      'GitHub Actions',
      'MLflow',
      'Solana',
      'VeChain',
      'NFC / IoT',
      'Drift detection',
    ],
  ],
  [
    '04',
    'AI Safety & recherche',
    [
      'Constitutional AI',
      'Scalable Oversight',
      'Explanation Faithfulness',
      'Fairness Auditing',
      'Human-in-the-Loop',
      'Interprétabilité',
    ],
  ],
];
