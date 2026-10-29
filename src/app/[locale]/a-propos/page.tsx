import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { site } from '@/content/site';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { localizedPageMetadata, jsonLd } from '@/lib/seo';
import { getDictionary } from '@/i18n/get-dictionary';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return { title: 'Not found' };

  const titles: Record<Locale, string> = {
    fr: 'À propos — CTO et Forward Deployed Engineer à Abidjan',
    en: 'About — CTO & Forward Deployed Engineer in Abidjan',
    es: 'Acerca de — CTO y Forward Deployed Engineer en Abidyán',
  };

  const descriptions: Record<Locale, string> = {
    fr: 'Parcours de Koffi Kan Marc-Ephrem : du terrain à la production, architecture produit, intelligence artificielle explicable et recherche en AI Safety.',
    en: 'Journey of Koffi Kan Marc-Ephrem: from field discovery to production, software architecture, explainable AI, and AI Safety research.',
    es: 'Trayectoria de Koffi Kan Marc-Ephrem: del terreno a la producción, arquitectura de software, IA explicable e investigación en seguridad de IA.',
  };

  return localizedPageMetadata(titles[locale], descriptions[locale], '/a-propos', locale);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      alternateName: site.alternateName,
      url: `${site.url}/${locale}/a-propos`,
      jobTitle: ['Chief Technology Officer', 'Forward Deployed Engineer', 'AI/ML Engineer'],
      homeLocation: { '@type': 'Place', name: site.location },
      sameAs: [site.github, site.linkedin],
      knowsAbout: [
        'Forward Deployed Engineering',
        'Explainable AI',
        'ML-RAG',
        'Software Architecture',
        'Financial Technology',
      ],
    },
  };

  const content = {
    fr: {
      location: 'Abidjan · Côte d’Ivoire',
      h1: 'Koffi Kan Marc-Ephrem, du terrain à la production',
      paragraphs: [
        'Je suis Koffi Kan Marc-Ephrem, CTO, Forward Deployed Engineer et AI/ML Engineer basé à Abidjan. Je relie les besoins des utilisateurs, les objectifs d’une organisation et les décisions techniques nécessaires pour livrer un produit utile. Une solution doit fonctionner dans le contexte réel de ses utilisateurs, résister aux erreurs et pouvoir évoluer en production.',
        'Mon approche commence sur le terrain : observer les usages, parler aux équipes et chercher le problème derrière la première demande. Je transforme cette compréhension en architecture, en expérience produit et en plan de livraison. Le Forward Deployed Engineering implique de rester proche des contraintes opérationnelles et d’assumer le résultat jusqu’à la mise en production.',
        'En tant que CTO, j’interviens aussi sur la vision produit, la priorisation et la qualité de l’exécution. Mes projets couvrent la fintech, l’immobilier, le commerce, la traçabilité et l’intelligence artificielle. J’utilise notamment Next.js, NestJS, Flutter, Python, XGBoost, SHAP, LlamaIndex, PostgreSQL et des infrastructures cloud selon les besoins de chaque système.',
        'Avec Fvundi et mes travaux sur le scoring de crédit, j’étudie la différence entre une prédiction et son explication. Un modèle peut produire un score sans que le texte généré pour le justifier soit fidèle à sa décision. Cette distinction compte particulièrement lorsque la décision touche à l’inclusion financière. Mes deux prépublications ouvertes sur Zenodo présentent des cadres de gouvernance et de scoring inclusif ; elles restent des travaux de recherche en cours.',
        'Je cherche à construire des systèmes modulaires, observables et compréhensibles, dans lesquels l’humain conserve une responsabilité réelle. Mon fil conducteur est simple : partir d’un problème concret, livrer une solution mesurable, puis l’améliorer à partir de ce qui se passe réellement après le déploiement.',
      ],
      links: {
        cases: 'Voir mes études de cas →',
        research: 'Lire mes travaux de recherche →',
        cv: 'Télécharger mon CV →',
      },
    },
    en: {
      location: 'Abidjan · Ivory Coast',
      h1: 'Koffi Kan Marc-Ephrem, from the field to production',
      paragraphs: [
        'I am Koffi Kan Marc-Ephrem, CTO, Forward Deployed Engineer and AI/ML Engineer based in Abidjan. I bridge real user needs, strategic business objectives, and the technical decisions required to deliver purposeful products. A system must function in the chaotic reality of its operators, withstand network errors, and scale gracefully in production.',
        'My methodology begins directly on the ground: shadowing user workflows, interviewing operational teams, and uncovering the root issue behind initial feature requests. I translate that understanding into system architecture, product ergonomics, and delivery roadmaps. Forward Deployed Engineering means staying attached to operational constraints until production impact is realized.',
        'As CTO, I orchestrate product direction, engineering standards, and execution rigor. My portfolio spans fintech, proptech, social commerce, agricultural supply chain traceability, and applied machine learning. I leverage Next.js, NestJS, Flutter, Python, XGBoost, SHAP, LlamaIndex, PostgreSQL, and modern cloud infrastructure tailored to each domain.',
        'Through Fvundi and my research on alternative credit assessment, I investigate the critical divide between algorithmic prediction and natural-language explanation. A predictive model can produce an accurate risk score while the generated justification hallucinated or deviated from true drivers. This distinction is paramount in inclusive finance. My two open-access preprints on Zenodo formulate constitutional governance and holistic life scoring frameworks.',
        'I build modular, observable, and auditable software where human agency remains empowered. My North Star is straightforward: start from a concrete human friction, ship an end-to-end measurable solution, and continuously refine based on real-world telemetry.',
      ],
      links: {
        cases: 'Explore case studies →',
        research: 'Read research preprints →',
        cv: 'Download my resume →',
      },
    },
    es: {
      location: 'Abidyán · Costa de Marfil',
      h1: 'Koffi Kan Marc-Ephrem, del terreno a la producción',
      paragraphs: [
        'Soy Koffi Kan Marc-Ephrem, CTO, Forward Deployed Engineer e ingeniero de IA/ML con base en Abidyán. Conecto las necesidades de los usuarios, los objetivos estratégicos y las decisiones técnicas para crear productos con propósito. Un sistema debe funcionar en el contexto real de sus operadores, resistir fallos de red y escalar en producción.',
        'Mi enfoque comienza en el terreno: observar flujos reales, dialogar con equipos operativos y encontrar el problema de raíz detrás de cada petición. Traduzco esa comprensión en arquitectura, ergonomía de producto y planes de entrega. El Forward Deployed Engineering implica permanecer junto a las restricciones operativas hasta lograr impacto.',
        'Como CTO, dirijo la visión de producto, la priorización y la excelencia técnica. Mis proyectos abarcan fintech, proptech, comercio social, trazabilidad agrícola y aprendizaje automático. Utilizo Next.js, NestJS, Flutter, Python, XGBoost, SHAP, LlamaIndex, PostgreSQL e infraestructuras en la nube adaptadas a cada necesidad.',
        'Con Fvundi y mis investigaciones sobre evaluación crediticia, estudio la diferencia crucial entre predicción algorítmica y su explicación. Un modelo puede calcular una puntuación sin que el texto que la justifica sea fiel a su decisión. Esta distinción es vital para la inclusión financiera. Mis dos prepublicaciones en Zenodo presentan marcos de gobernanza constitucional y scoring inclusivo.',
        'Construyo sistemas modulares, observables y comprensibles donde la agencia humana mantiene el control. Mi principio es simple: partir de un problema concreto, entregar una solución medible y perfeccionarla según la realidad operativa posterior al despliegue.',
      ],
      links: {
        cases: 'Ver casos de estudio →',
        research: 'Leer investigaciones →',
        cv: 'Descargar mi CV →',
      },
    },
  };

  const localizedText = content[locale];

  return (
    <ContentShell
      crumbs={[{ name: dict.nav.about, path: `/${locale}/a-propos` }]}
      locale={locale}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(profile) }} />
      <article className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#64784e]">
          {localizedText.location}
        </p>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
          {localizedText.h1}
        </h1>
        <div className="mt-10 space-y-6 text-base leading-8 text-[#526047] md:text-lg">
          {localizedText.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4 text-sm font-semibold text-[#466031]">
          <Link href={`/${locale}/projets`} className="underline underline-offset-4">
            {localizedText.links.cases}
          </Link>
          <Link href={`/${locale}/recherche`} className="underline underline-offset-4">
            {localizedText.links.research}
          </Link>
          <a href={site.cv} download className="underline underline-offset-4">
            {localizedText.links.cv}
          </a>
        </div>
      </article>
    </ContentShell>
  );
}

