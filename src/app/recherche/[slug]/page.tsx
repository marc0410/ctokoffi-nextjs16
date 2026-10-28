import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { publications } from '@/content/journal';
import { researchSlugs } from '@/content/seo';
import { site } from '@/content/site';
import { jsonLd, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.values(researchSlugs).map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const publication = publications.find(
    (item) => researchSlugs[item.id as keyof typeof researchSlugs] === slug,
  );
  if (!publication) return { title: 'Publication introuvable' };
  return pageMetadata(
    publication.shortTitle + ' — recherche en IA',
    publication.summary,
    `/recherche/${slug}`,
  );
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  const publication = publications.find(
    (item) => researchSlugs[item.id as keyof typeof researchSlugs] === slug,
  );
  if (!publication) notFound();
  const constitutional = publication.id === 'constitutional-oversight';
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    description: publication.summary,
    author: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name },
    datePublished: constitutional ? '2026-05-01' : '2026-05-17',
    identifier: `https://doi.org/${publication.doi}`,
    url: `${site.url}/recherche/${slug}`,
    isAccessibleForFree: true,
  };
  return (
    <ContentShell
      crumbs={[
        { name: 'Recherche', path: '/recherche' },
        { name: publication.shortTitle, path: `/recherche/${slug}` },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <article className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#64784e]">
          {publication.status} · {publication.date}
        </p>
        <h1 className="mt-5 text-3xl font-medium leading-tight tracking-tight md:text-5xl">
          {publication.title}
        </h1>
        <p className="mt-5 text-sm text-[#64784e]">
          Koffi Kan Marc-Ephrem · DOI :{' '}
          <a href={`https://doi.org/${publication.doi}`} className="underline underline-offset-4">
            {publication.doi}
          </a>
        </p>
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Résumé accessible</h2>
          <p className="mt-4 text-lg leading-8 text-[#526047]">{publication.summary}</p>
        </section>
        {constitutional ? (
          <>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">Hypothèse et méthode</h2>
              <p className="mt-4 leading-8 text-[#526047]">
                Un score produit par un modèle ML peut recevoir une explication générée par RAG qui
                semble convaincante sans refléter exactement les facteurs de décision. La
                prépublication propose une constitution financière lisible par machine, un arbitre
                IA et une supervision humaine pour examiner la fidélité et l’équité des
                explications.
              </p>
            </section>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">Limites et applications</h2>
              <p className="mt-4 leading-8 text-[#526047]">
                Le cadre est une proposition de recherche. Une validation empirique et des audits
                indépendants restent nécessaires avant tout usage dans une décision de crédit
                réelle. Le projet{' '}
                <Link href="/projets/fvundi" className="underline">
                  Fvundi
                </Link>{' '}
                sert de contexte à cette réflexion sur l’IA financière explicable.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">Hypothèse et méthode</h2>
              <p className="mt-4 leading-8 text-[#526047]">
                Le texte explore un scoring inclusif qui combine des signaux financiers, civiques,
                comportementaux et contextuels. Il souligne que la collecte et l’usage de ces
                signaux demandent consentement, audit des biais et supervision humaine.
              </p>
            </section>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">Limites et applications</h2>
              <p className="mt-4 leading-8 text-[#526047]">
                Il s’agit d’une prépublication conceptuelle dont la validation empirique est en
                cours. Aucun résultat de performance ou d’équité n’est revendiqué ici. La recherche
                est liée aux questions posées par{' '}
                <Link href="/projets/fvundi" className="underline">
                  Fvundi
                </Link>{' '}
                sur le scoring de crédit explicable.
              </p>
            </section>
          </>
        )}
        <div className="mt-12 flex flex-wrap gap-5 text-sm font-semibold text-[#466031]">
          <a
            href={publication.url}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Lire la fiche Zenodo ↗
          </a>
          <a
            href={publication.pdf}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Télécharger le PDF ↗
          </a>
          <Link href="/journal/un-score-ne-suffit-pas" className="underline underline-offset-4">
            Lire l’article associé →
          </Link>
        </div>
      </article>
    </ContentShell>
  );
}
