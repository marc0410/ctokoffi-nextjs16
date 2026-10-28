import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/seo/ContentShell';
import { site } from '@/content/site';
import { pageMetadata, jsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'À propos — CTO et Forward Deployed Engineer à Abidjan',
  'Parcours de Koffi Kan Marc-Ephrem : du terrain à la production, architecture produit, intelligence artificielle explicable et recherche en AI Safety.',
  '/a-propos',
);

export default function AboutPage() {
  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      alternateName: site.alternateName,
      url: `${site.url}/a-propos`,
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
  return (
    <ContentShell crumbs={[{ name: 'À propos', path: '/a-propos' }]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(profile) }} />
      <article className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#64784e]">
          Abidjan · Côte d’Ivoire
        </p>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
          Koffi Kan Marc-Ephrem, du terrain à la production
        </h1>
        <div className="mt-10 space-y-6 text-base leading-8 text-[#526047] md:text-lg">
          <p>
            Je suis Koffi Kan Marc-Ephrem, CTO, Forward Deployed Engineer et AI/ML Engineer basé à
            Abidjan. Je relie les besoins des utilisateurs, les objectifs d’une organisation et les
            décisions techniques nécessaires pour livrer un produit utile. Une solution doit
            fonctionner dans le contexte réel de ses utilisateurs, résister aux erreurs et pouvoir
            évoluer en production.
          </p>
          <p>
            Mon approche commence sur le terrain : observer les usages, parler aux équipes et
            chercher le problème derrière la première demande. Je transforme cette compréhension en
            architecture, en expérience produit et en plan de livraison. Le Forward Deployed
            Engineering implique de rester proche des contraintes opérationnelles et d’assumer le
            résultat jusqu’à la mise en production.
          </p>
          <p>
            En tant que CTO, j’interviens aussi sur la vision produit, la priorisation et la qualité
            de l’exécution. Mes projets couvrent la fintech, l’immobilier, le commerce, la
            traçabilité et l’intelligence artificielle. J’utilise notamment Next.js, NestJS,
            Flutter, Python, XGBoost, SHAP, LlamaIndex, PostgreSQL et des infrastructures cloud
            selon les besoins de chaque système.
          </p>
          <p>
            Avec Fvundi et mes travaux sur le scoring de crédit, j’étudie la différence entre une
            prédiction et son explication. Un modèle peut produire un score sans que le texte généré
            pour le justifier soit fidèle à sa décision. Cette distinction compte particulièrement
            lorsque la décision touche à l’inclusion financière. Mes deux prépublications ouvertes
            sur Zenodo présentent des cadres de gouvernance et de scoring inclusif ; elles restent
            des travaux de recherche en cours.
          </p>
          <p>
            Je cherche à construire des systèmes modulaires, observables et compréhensibles, dans
            lesquels l’humain conserve une responsabilité réelle. Mon fil conducteur est simple :
            partir d’un problème concret, livrer une solution mesurable, puis l’améliorer à partir
            de ce qui se passe réellement après le déploiement.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4 text-sm font-semibold text-[#466031]">
          <Link href="/projets" className="underline underline-offset-4">
            Voir mes études de cas →
          </Link>
          <Link href="/recherche" className="underline underline-offset-4">
            Lire mes travaux de recherche →
          </Link>
          <a href={site.cv} className="underline underline-offset-4">
            Télécharger mon CV →
          </a>
        </div>
      </article>
    </ContentShell>
  );
}
