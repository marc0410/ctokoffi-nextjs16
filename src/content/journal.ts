import type { Publication, Article } from '@/types/content';
export const publications: Publication[] = [
  {
    id: 'constitutional-oversight',
    date: '1 mai 2026',
    category: 'AI SAFETY',
    shortTitle: 'Constitutional Oversight',
    title:
      'Constitutional Oversight of Hybrid ML-RAG Credit Scoring Systems: Scalable Governance for Safe and Fair Financial Inclusion in Emerging Economies',
    summary:
      'Un cadre de supervision à trois niveaux pour contrôler la fidélité et l’équité des explications de systèmes de scoring hybrides ML-RAG : constitution financière, arbitre IA et contrôle humain.',
    status: 'Prépublication · v1.0.0',
    doi: '10.5281/zenodo.19955522',
    url: 'https://zenodo.org/records/19955522',
    pdf: 'https://zenodo.org/records/19955522/files/fvundi_whitepaper_2026.pdf',
    tags: ['ML-RAG', 'Faithfulness', 'Human oversight'],
  },
  {
    id: 'holistic-life-scoring',
    date: '17 mai 2026',
    category: 'FINANCIAL INTELLIGENCE',
    shortTitle: 'Holistic Life Scoring',
    title:
      'Holistic Life Scoring (HLS): A New Paradigm for Inclusive Financial Intelligence in Emerging Economies',
    summary:
      'Un paradigme conceptuel de scoring qui élargit l’observation aux signaux financiers, civiques, comportementaux et contextuels. Il associe cette approche au consentement, à l’audit des biais et à la supervision humaine.',
    status: 'Prépublication conceptuelle · Validation empirique en cours',
    doi: '10.5281/zenodo.20247598',
    url: 'https://zenodo.org/records/20247598',
    pdf: 'https://zenodo.org/records/20247598/files/Holistic_Life_Scoring_Preprint_v1_2026.pdf',
    tags: ['HLS', 'Inclusion financière', 'Gouvernance'],
  },
];
export const articles: Article[] = [
  {
    slug: 'du-terrain-a-la-production',
    category: 'Engineering',
    date: '28 octobre 2026',
    title: 'Du terrain à la production : ma vision du Forward Deployed Engineering.',
    excerpt:
      'Partir des usages. Traverser les contraintes. Livrer une solution qui trouve sa place dans le quotidien.',
    readTime: '3 min',
    theme: 'field',
    intro:
      'Le travail d’ingénierie commence avant le code. Il commence lorsqu’on comprend ce qu’une personne essaie réellement d’accomplir, ce qui la ralentit et ce qu’elle ne peut pas se permettre de perdre.',
    sections: [
      [
        'Observer avant de prescrire',
        'Une demande de fonctionnalité exprime souvent un besoin plus profond. Un tableau de bord peut cacher un problème de circulation de l’information ; un export Excel, l’absence d’une intégration. Ma façon d’aborder un projet est de relier la demande au parcours complet : qui agit, avec quelles données, dans quel contexte et avec quelles conséquences si le système échoue.',
      ],
      [
        'Faire le lien entre métier et système',
        'Le Forward Deployed Engineer travaille à cette frontière. Il traduit un besoin métier en contraintes techniques, puis rend les arbitrages compréhensibles pour les équipes. Un délai de livraison, une connexion instable, un système existant ou une donnée difficile à obtenir font partie du problème à résoudre. L’architecture doit partir de ces conditions réelles.',
      ],
      [
        'Livrer une première boucle complète',
        'Je privilégie un parcours qui fonctionne de bout en bout. Le prototype permet de discuter une idée ; l’intégration permet de savoir si elle tient dans la réalité. Pour chaque parcours, il faut penser l’état normal, mais aussi les erreurs, les reprises et la visibilité offerte à l’utilisateur. Une solution utile doit être compréhensible jusque dans ses limites.',
      ],
      [
        'Rester responsable après la mise en ligne',
        'La livraison ne clôt pas la conversation. Les usages, les erreurs et les retours doivent guider la suite. Instrumenter le parcours aide à distinguer un problème d’interface d’un problème de données ou de performance. Cette continuité entre terrain, produit et exploitation est le cœur de mon positionnement : construire avec les équipes, puis faire évoluer ce qui leur sert réellement.',
      ],
    ],
    takeaway:
      'Le résultat attendu n’est pas seulement un logiciel livré. C’est un problème concret mieux résolu.',
  },
  {
    slug: 'construire-pour-la-montee-en-charge',
    category: 'Architecture',
    date: '28 octobre 2026',
    title: 'Construire pour la croissance, sans figer le produit.',
    excerpt:
      'Modularité, observabilité et qualité des livraisons : les fondations d’une plateforme qui peut évoluer vite.',
    readTime: '3 min',
    theme: 'scale',
    intro:
      'Une plateforme doit pouvoir accueillir davantage d’utilisateurs, mais aussi davantage de changements. La capacité à faire évoluer le produit compte autant que sa capacité à traiter la charge.',
    sections: [
      [
        'Séparer ce qui change à des rythmes différents',
        'L’interface, les règles métier, les intégrations et les traitements de données n’ont pas toujours le même cycle de vie. Des frontières explicites permettent de faire évoluer une partie sans réécrire l’ensemble. Cela ne signifie pas multiplier les services dès le premier jour : la bonne séparation est celle qui clarifie les responsabilités et réduit les dépendances inutiles.',
      ],
      [
        'Traiter les flux comme des parcours complets',
        'Sur une plateforme transactionnelle, il faut suivre plus qu’une réponse HTTP. Les changements d’état, les confirmations, les reprises et la traçabilité composent un même parcours. L’objectif est de savoir ce qui s’est passé, de détecter une incohérence et de pouvoir intervenir sans perdre le contexte. La robustesse se joue souvent dans ces chemins moins visibles.',
      ],
      [
        'Observer avant d’optimiser',
        'Le temps de réponse, les erreurs, la saturation et le coût donnent des indications différentes. Un volume d’utilisateurs ne suffit pas à décrire une charge simultanée ; un volume financier ne dit rien, à lui seul, du nombre d’opérations par seconde. Pour dimensionner correctement, il faut observer les usages et tester les parcours critiques dans des conditions représentatives.',
      ],
      [
        'Rendre le changement réversible',
        'L’automatisation CI/CD, les tests adaptés aux risques et la possibilité de revenir à une version stable facilitent des livraisons fréquentes. Le but est de réduire le coût d’une correction. Une architecture qui grandit bien est aussi une architecture que l’équipe peut comprendre, diagnostiquer et modifier avec confiance.',
      ],
    ],
    takeaway:
      'Concevoir pour le scaling, c’est préparer la croissance du trafic, du produit et de l’équipe — sans promettre une capacité illimitée.',
  },
  {
    slug: 'un-score-ne-suffit-pas',
    category: 'Recherche',
    date: '28 octobre 2026',
    title: 'Un bon score ne suffit pas. Son explication doit rester fidèle.',
    excerpt:
      'Pourquoi je distingue prédiction, explication et gouvernance dans mes travaux sur le scoring financier.',
    readTime: '3 min',
    theme: 'trust',
    intro:
      'Une explication fluide peut donner une impression de confiance sans décrire correctement la décision du modèle. Dans un système hybride ML-RAG, la prédiction et l’explication doivent donc être évaluées séparément.',
    sections: [
      [
        'Deux fonctions, deux responsabilités',
        'Dans l’architecture étudiée avec Fvundi, le modèle de machine learning produit une prédiction. Une couche RAG construit ensuite une explication à partir d’éléments d’attribution SHAP. Cette séparation rend les responsabilités plus lisibles, mais elle crée aussi une nouvelle question : le texte restitue-t-il réellement les facteurs qui ont contribué au score ?',
      ],
      [
        'Mesurer la fidélité, pas seulement la fluidité',
        'La prépublication Constitutional Oversight propose quatre axes de mesure : la couverture des facteurs, la cohérence de leur classement, la constance entre profils démographiques et le taux d’hallucination. Ces critères visent à rendre observables des problèmes que la seule performance prédictive ne permet pas de décrire. Ils constituent un cadre de recherche, pas une garantie automatique d’équité.',
      ],
      [
        'Organiser la supervision',
        'Le cadre proposé combine une constitution financière lisible par machine, un arbitre IA et une intervention humaine ciblée sur les violations. Il ne suffit pas de produire des règles : il faut pouvoir vérifier leur application et conserver une responsabilité humaine sur la gouvernance du système.',
      ],
      [
        'Élargir l’observation avec des limites explicites',
        'Holistic Life Scoring explore un espace de signaux plus large pour l’inclusion financière. Cette extension augmente aussi les exigences de consentement, de protection des données et d’audit des biais. Le travail est conceptuel et architectural, avec une validation empirique en cours. L’ambition est de mieux comprendre des situations financières, en encadrant ce que le système observe et ce qu’il peut en déduire.',
      ],
    ],
    takeaway:
      'La qualité d’une IA se juge aussi à la fidélité de ce qu’elle raconte, à ce qu’elle est autorisée à observer et à la façon dont elle est supervisée.',
    sources: publications.map((p) => ({ title: p.shortTitle, url: p.url })),
  },
];
