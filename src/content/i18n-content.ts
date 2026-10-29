import type { Locale } from '@/i18n/config';
import type { Project, Publication, Article, Experience, SkillGroup } from '@/types/content';
import { projects as baseProjects, experience as baseExperience, skillGroups as baseSkillGroups } from './projects';
import { publications as basePublications, articles as baseArticles } from './journal';

// Translations for projects
const projectTranslations: Record<
  string,
  Record<'en' | 'es', { subtitle: string; summary: string; challenge: string; approach: string; outcome: string; role: string }>
> = {
  fvundi: {
    en: {
      subtitle: 'AI for real-world financial inclusion.',
      summary:
        'An explainable credit scoring engine tailored to emerging economies, decoupling predictions from natural-language explanations.',
      challenge:
        'How to assess creditworthiness from Mobile Money telemetry while keeping every financial decision accountable, transparent, and auditable?',
      approach:
        'XGBoost computes the score. TreeSHAP extracts key decision drivers. An ensemble RAG layer — LlamaIndex, Cohere, pgvector, and Claude — synthesizes grounded explanations. The MLOps pipeline features drift monitoring and anomaly tracking.',
      outcome:
        'Uncovered demographic explanation faithfulness disparities despite identical ML predictions, inspiring research on constitutional oversight for hybrid AI.',
      role: 'Founder & CTO',
    },
    es: {
      subtitle: 'IA al servicio de la inclusión financiera real.',
      summary:
        'Un motor de scoring de crédito explicable adaptado a economías emergentes, separando la predicción de la explicación en lenguaje natural.',
      challenge:
        '¿Cómo evaluar la solvencia crediticia a partir de datos de Mobile Money haciendo cada decisión auditable y comprensible?',
      approach:
        'XGBoost genera la puntuación. TreeSHAP extrae los factores clave. Una capa RAG — LlamaIndex, Cohere, pgvector y Claude — formula explicaciones fundamentadas. El flujo MLOps incluye detección de anomalías y deriva.',
      outcome:
        'Evidenció discrepancias de fidelidad en explicaciones entre perfiles demográficos con predicción idéntica, impulsando la investigación en supervisión constitucional de IA.',
      role: 'Founder & CTO',
    },
  },
  immo: {
    en: {
      subtitle: 'Digitalizing real estate in West Africa.',
      summary:
        'A comprehensive platform orchestrating listings, search intelligence, and tenant-landlord communication.',
      challenge:
        'Addressing opacity and informal friction in rental transactions across fast-growing African metropolises.',
      approach:
        'Engineered an Agentic RAG assistant, mobile apps for property managers, and automated verification workflows.',
      outcome:
        'Production deployment with strong adoption by real estate agencies in Abidjan.',
      role: 'Chief Technology Officer',
    },
    es: {
      subtitle: 'Digitalización del sector inmobiliario en África Occidental.',
      summary:
        'Una plataforma integral que orquesta anuncios, búsqueda inteligente y relación entre inquilinos y propietarios.',
      challenge:
        'Resolver la opacidad y las fricciones informales en las transacciones inmobiliarias en metrópolis africanas.',
      approach:
        'Diseño de un asistente RAG agéntico, aplicaciones móviles para gestores y flujos automatizados de verificación.',
      outcome:
        'Despliegue en producción con alta tasa de adopción por agencias inmobiliarias en Abidyán.',
      role: 'Chief Technology Officer',
    },
  },
  kvix: {
    en: {
      subtitle: 'Transforming carbon data into decision assets.',
      summary:
        'Carbon intelligence infrastructure structuring data, auditing emissions, and bridging climate initiatives with investors.',
      challenge:
        'Converting fragmented carbon metrics into actionable insights for enterprises, institutions, and green funds.',
      approach:
        'Introduced a Carbon Score, granular Scope 1-3 analytics, verifiable badges, and decentralized MRV (dMRV).',
      outcome:
        'Web platform presenting the Kvix vision to international climate finance stakeholders.',
      role: 'Co-founder · Product & Engineering',
    },
    es: {
      subtitle: 'Transformar datos de carbono en activos de decisión.',
      summary:
        'Infraestructura de inteligencia de carbono que estructura datos, audita emisiones y conecta proyectos climáticos con inversores.',
      challenge:
        'Convertir métricas de carbono fragmentadas en información procesable para empresas e inversores.',
      approach:
        'Implementación del Carbon Score, análisis de alcances 1, 2 y 3, sellos verificables y dMRV.',
      outcome:
        'Plataforma web que expone la visión de Kvix a actores de financiamiento climático.',
      role: 'Co-founder · Producto e ingeniería',
    },
  },
  nalia: {
    en: {
      subtitle: 'Connecting women to life-changing opportunities.',
      summary:
        'Pan-African platform unifying mentorship, health resources, professional upskilling, and venture incubation for women.',
      challenge:
        'Gathering resources and support pathways into an intuitive experience adapted to diverse professional journeys.',
      approach:
        'Organized journeys around profile matchmaking, goals, and progress tracking, bridging mentorship and leadership.',
      outcome:
        'Modern web experience presenting Nalia community pathways and services across Africa.',
      role: 'Project contribution · Web Product',
    },
    es: {
      subtitle: 'Conectar a las mujeres con oportunidades de impacto.',
      summary:
        'Plataforma panafricana que une mentoría, salud, formación continua e incubación para mujeres.',
      challenge:
        'Reunir recursos y acompañamiento en una experiencia clara adaptada a diversas metas profesionales.',
      approach:
        'Ruta estructurada en torno a emparejamiento, metas y seguimiento de progreso.',
      outcome:
        'Experiencia digital que conecta la comunidad Nalia con oportunidades en toda África.',
      role: 'Contribución al proyecto · Producto web',
    },
  },
  rix: {
    en: {
      subtitle: 'Reimagining pharmaceutical healthcare journeys.',
      summary:
        'A digital ecosystem bridging patients, pharmacies, and prescriptions with verifiable traceability.',
      challenge:
        'Making medication management and prescription validation clear and fraud-resistant.',
      approach:
        'Prescription OCR scanning, real-time dispensing status, digital health record, and blockchain auditability.',
      outcome:
        'Connected experience synchronizing prescription verification, pharmacy dispatch, and patient notifications.',
      role: 'Project contribution · Web Product',
    },
    es: {
      subtitle: 'Reimaginando el recorrido farmacéutico y sanitario.',
      summary:
        'Ecosistema digital que conecta pacientes, farmacias y recetas médicas con trazabilidad verificable.',
      challenge:
        'Hacer que la gestión de medicamentos y la validación de recetas sean claras y resistentes al fraude.',
      approach:
        'Escaneo OCR de recetas, estado de dispensación en tiempo real y registro médico digital.',
      outcome:
        'Experiencia digital coherente entre prescripciones médicas y dispensación farmacéutica.',
      role: 'Contribución al proyecto · Producto web',
    },
  },
  style: {
    en: {
      subtitle: 'Digital passports for African luxury and craft.',
      summary:
        'Product passport and authentication infrastructure for fashion designers, incubated by AfDB Fashionomics Africa.',
      challenge:
        'Protecting African luxury creations against counterfeiting and establishing verifiable provenance.',
      approach:
        'NFC physical tags paired with blockchain digital certificates, creator storytelling, and ownership verification.',
      outcome:
        'Selected and incubated by the African Development Bank (AfDB) Fashionomics Africa accelerator.',
      role: 'Chief Technology Officer',
    },
    es: {
      subtitle: 'Pasaportes digitales para el lujo y diseño africano.',
      summary:
        'Infraestructura de pasaporte de producto y autenticación para diseñadores, incubada por Fashionomics Africa / BAD.',
      challenge:
        'Proteger creaciones de lujo africano contra falsificaciones y certificar procedencia.',
      approach:
        'Tags NFC físicos vinculados a certificados blockchain, historia del artesano y verificación de propiedad.',
      outcome:
        'Seleccionado e incubado por el Banco Africano de Desarrollo (BAD) Fashionomics Africa.',
      role: 'Chief Technology Officer',
    },
  },
  naturalink: {
    en: {
      subtitle: 'Field-level agricultural traceability.',
      summary:
        'Blockchain and IoT platform certifying agricultural supply chains from farm gate to international export.',
      challenge:
        'Ensuring harvest provenance and fair producer compensation amidst offline field connectivity.',
      approach:
        'Offline-first field mobile data collection, batch verification on blockchain, and automated compliance reports.',
      outcome:
        'Winner and incubated in the Orange Digi Green & Agri program for sustainable agriculture in Ivory Coast.',
      role: 'Chief Technology Officer',
    },
    es: {
      subtitle: 'Trazabilidad agrícola directa en el terreno.',
      summary:
        'Plataforma blockchain e IoT que certifica cadenas de suministro agrícola desde el productor hasta la exportación.',
      challenge:
        'Garantizar la procedencia de cosechas y remuneración justa con conectividad rural intermitente.',
      approach:
        'Captura móvil offline-first en campo, verificación de lotes en blockchain y reportes de conformidad.',
      outcome:
        'Premiado e incubado por el programa Orange Digi Green & Agri en Costa de Marfil.',
      role: 'Chief Technology Officer',
    },
  },
  ndaya: {
    en: {
      subtitle: 'Social commerce and community discovery.',
      summary:
        'Scalable social commerce platform with video feeds, microservices architecture, and automated merchant billing.',
      challenge:
        'Orchestrating video recommendations, dynamic orders, and merchant settlements with sub-second latency.',
      approach:
        'Event-driven NestJS microservices, Redis caching, CI/CD automated deployments, and custom media delivery.',
      outcome:
        'Scale architecture supporting thousands of concurrent shoppers and transactions in production.',
      role: 'Chief Technology Officer',
    },
    es: {
      subtitle: 'Comercio social y descubrimiento comunitario.',
      summary:
        'Plataforma de comercio social con feeds de video, arquitectura de microservicios y facturación de comerciantes.',
      challenge:
        'Orquestar recomendaciones de video, pedidos dinámicos y liquidaciones con latencia inferior al segundo.',
      approach:
        'Microservicios NestJS basados en eventos, caché Redis, despliegues CI/CD y streaming de medios optimizado.',
      outcome:
        'Arquitectura escalable en producción con miles de transacciones y compradores concurrentes.',
      role: 'Chief Technology Officer',
    },
  },
  solana: {
    en: {
      subtitle: 'Frictionless digital dollar payments.',
      summary:
        'USDC payment application on Solana, integrating biometric authentication and multi-wallet security.',
      challenge:
        'Merging blockchain speed, biometric authorization, and multi-wallet management into a fluid payment app.',
      approach:
        'Solana USDC payment rail integration, hardware biometric key management, and zero-confusion UX.',
      outcome:
        'Engineered and deployed as graduation project at HEC Abidjan in 2025.',
      role: 'Graduation Project · HEC Abidjan',
    },
    es: {
      subtitle: 'Pagos con dólares digitales sin fricciones.',
      summary:
        'Aplicación de pagos USDC en Solana con autenticación biométrica y gestión segura de billeteras.',
      challenge:
        'Combinar velocidad blockchain, biometría y billeteras múltiples en una experiencia de pago intuitiva.',
      approach:
        'Integración de pagos USDC en Solana, gestión de claves biométricas y UX simplificada.',
      outcome:
        'Desarrollado y defendido como proyecto de graduación en HEC Abidyán en 2025.',
      role: 'Proyecto de fin de carrera · HEC Abidyán',
    },
  },
};

export function getLocalizedProjects(locale: Locale = 'fr'): Project[] {
  if (locale === 'fr') return baseProjects;
  return baseProjects.map((p) => {
    const tr = projectTranslations[p.id]?.[locale];
    if (!tr) return p;
    return {
      ...p,
      subtitle: tr.subtitle,
      summary: tr.summary,
      challenge: tr.challenge,
      approach: tr.approach,
      outcome: tr.outcome,
      role: tr.role,
    };
  });
}

// Translations for publications
const publicationTranslations: Record<
  string,
  Record<'en' | 'es', { summary: string; status: string }>
> = {
  'constitutional-oversight': {
    en: {
      summary:
        'A three-tier oversight framework to enforce faithfulness and fairness in hybrid ML-RAG credit scoring systems: financial constitution, AI referee, and human-in-the-loop audit.',
      status: 'Open Access Preprint · v1.0.0',
    },
    es: {
      summary:
        'Un marco de supervisión en tres niveles para garantizar fidelidad y equidad en scoring híbrido ML-RAG: constitución financiera, árbitro IA y auditoría humana.',
      status: 'Prepublicación abierta · v1.0.0',
    },
  },
  'holistic-life-scoring': {
    en: {
      summary:
        'A credit scoring paradigm expanding evaluation beyond traditional banking to financial, civic, behavioral, and contextual signals, coupled with explicit consent and bias auditing.',
      status: 'Conceptual Preprint · Empirical validation in progress',
    },
    es: {
      summary:
        'Un paradigma de evaluación crediticia que amplía la observación a señales financieras, cívicas, conductuales y contextuales, con consentimiento explícito y auditoría de sesgos.',
      status: 'Prepublicación conceptual · Validación empírica en curso',
    },
  },
};

export function getLocalizedPublications(locale: Locale = 'fr'): Publication[] {
  if (locale === 'fr') return basePublications;
  return basePublications.map((pub) => {
    const tr = publicationTranslations[pub.id]?.[locale];
    if (!tr) return pub;
    return {
      ...pub,
      summary: tr.summary,
      status: tr.status,
    };
  });
}

// Translations for articles
const articleTranslations: Record<
  string,
  Record<'en' | 'es', { title: string; excerpt: string; intro: string; takeaway: string }>
> = {
  'du-terrain-a-la-production': {
    en: {
      title: 'From field to production: my vision of Forward Deployed Engineering.',
      excerpt:
        'Start with human friction. Navigate real-world constraints. Deliver software that endures daily operations.',
      intro:
        'Engineering begins before the first line of code. It starts when one truly understands what someone is trying to accomplish, where they get stuck, and what they cannot afford to lose.',
      takeaway:
        'The expected outcome is never just shipped software. It is a concrete human problem decisively solved.',
    },
    es: {
      title: 'Del terreno a la producción: mi visión del Forward Deployed Engineering.',
      excerpt:
        'Partir del uso real. Atravesar limitaciones operativas. Entregar soluciones que perduran en el día a día.',
      intro:
        'La ingeniería empieza antes del código. Comienza comprendiendo qué intenta lograr el usuario, qué lo frena y qué no puede permitirse perder.',
      takeaway:
        'El resultado no es simplemente software entregado. Es un problema humano concreto resuelto de verdad.',
    },
  },
  'construire-pour-la-montee-en-charge': {
    en: {
      title: 'Building for scale without freezing product velocity.',
      excerpt:
        'Modularity, observability, and delivery discipline: foundations for platforms that evolve rapidly.',
      intro:
        'A platform must accommodate more users, but also more frequent changes. The ability to evolve the product safely matters as much as handling peak load.',
      takeaway:
        'Resilience is not accidental; it is designed into everyday delivery rituals.',
    },
    es: {
      title: 'Construir para escalar sin frenar la velocidad del producto.',
      excerpt:
        'Modularidad, observabilidad y disciplina de entrega: bases para plataformas que evolucionan rápido.',
      intro:
        'Una plataforma debe admitir más usuarios, pero también cambios más continuos. La capacidad de evolucionar importa tanto como procesar la carga máxima.',
      takeaway:
        'La resiliencia no es casual; se diseña en cada iteración de entrega.',
    },
  },
  'un-score-ne-suffit-pas': {
    en: {
      title: 'A score is not enough: towards explainable and fair financial AI.',
      excerpt:
        'Why predicting default risk is incomplete without faithful explanations and constitutional governance.',
      intro:
        'In emerging economies, traditional credit bureaus exclude the majority. While alternative ML models bridge this gap, predicting a score without explaining it creates new systemic risks.',
      takeaway:
        'Financial inclusion demands AI that people and regulators can transparently interrogate.',
    },
    es: {
      title: 'Una puntuación no basta: hacia una IA financiera explicable y justa.',
      excerpt:
        'Por qué predecir el riesgo de impago es insuficiente sin explicaciones fieles y gobernanza constitucional.',
      intro:
        'En economías emergentes, la banca tradicional excluye a la mayoría. Los modelos alternativos de ML llenan este vacío, pero predecir sin explicar genera nuevos riesgos.',
      takeaway:
        'La inclusión financiera exige una IA que usuarios y reguladores puedan auditar con confianza.',
    },
  },
};

export function getLocalizedArticles(locale: Locale = 'fr'): Article[] {
  if (locale === 'fr') return baseArticles;
  return baseArticles.map((art) => {
    const tr = articleTranslations[art.slug]?.[locale];
    if (!tr) return art;
    return {
      ...art,
      title: tr.title,
      excerpt: tr.excerpt,
      intro: tr.intro,
      takeaway: tr.takeaway,
    };
  });
}

// Translations for experiences
const experienceTranslations: Record<
  string,
  Record<'en' | 'es', { role: string; desc: string }>
> = {
  Fvundi: {
    en: { role: 'Founder & CTO', desc: 'Financial AI, explainable credit scoring, and ML-RAG governance systems.' },
    es: { role: 'Founder & CTO', desc: 'IA financiera, scoring explicable y gobernanza de sistemas ML-RAG.' },
  },
  'Immo Plus': {
    en: { role: 'Chief Technology Officer', desc: 'Mobile products, Agentic RAG, and digital real estate tooling.' },
    es: { role: 'Chief Technology Officer', desc: 'Productos móviles, RAG agéntico y herramientas inmobiliarias.' },
  },
  'Style Pass': {
    en: { role: 'Chief Technology Officer', desc: 'Digital asset identity for luxury craft. AfDB Fashionomics Africa incubator.' },
    es: { role: 'Chief Technology Officer', desc: 'Identidad digital de activos de lujo. Incubación BAD Fashionomics Africa.' },
  },
  Naturalink: {
    en: { role: 'Chief Technology Officer', desc: 'Agricultural supply chain traceability & blockchain. Orange Digi Green & Agri.' },
    es: { role: 'Chief Technology Officer', desc: 'Trazabilidad agrícola y blockchain. Incubación Orange Digi Green & Agri.' },
  },
  Ndaya: {
    en: { role: 'Chief Technology Officer', desc: 'Microservices, social commerce, video feeds, and high-frequency transactions.' },
    es: { role: 'Chief Technology Officer', desc: 'Microservicios, comercio social, video y transacciones de alta concurrencia.' },
  },
};

export function getLocalizedExperiences(locale: Locale = 'fr'): Experience[] {
  if (locale === 'fr') return baseExperience;
  return baseExperience.map(([period, role, company, desc]) => {
    const tr = experienceTranslations[company]?.[locale];
    if (!tr) return [period, role, company, desc];
    return [period, tr.role, company, tr.desc];
  });
}

// Translations for skill group titles
const skillGroupTitles: Record<string, Record<'en' | 'es', string>> = {
  'Intelligence artificielle': { en: 'Artificial Intelligence', es: 'Inteligencia Artificial' },
  'Produit & engineering': { en: 'Product & Engineering', es: 'Producto e Ingeniería' },
  'Infrastructure & Web3': { en: 'Infrastructure & Web3', es: 'Infraestructura y Web3' },
  'AI Safety & recherche': { en: 'AI Safety & Research', es: 'Seguridad de IA e Investigación' },
};

export function getLocalizedSkillGroups(locale: Locale = 'fr'): SkillGroup[] {
  if (locale === 'fr') return baseSkillGroups;
  return baseSkillGroups.map(([num, title, items]) => {
    const tr = skillGroupTitles[title]?.[locale];
    return [num, tr || title, items];
  });
}

