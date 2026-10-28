import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/seo/ContentShell';
import { publications } from '@/content/journal';
import { researchSlugs } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Recherche — IA explicable et gouvernance ML-RAG',
  'Prépublications de Koffi Kan Marc-Ephrem sur la fidélité des explications, la gouvernance ML-RAG et le scoring financier inclusif.',
  '/recherche',
);

export default function ResearchPage() {
  return (
    <ContentShell crumbs={[{ name: 'Recherche', path: '/recherche' }]}>
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
        Recherche en IA explicable
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#526047]">
        Mes travaux examinent la fidélité des explications d’un score de crédit, l’équité entre
        profils et la place de la supervision humaine. Les deux textes ci-dessous sont des
        prépublications ouvertes, pas des articles évalués par les pairs.
      </p>
      <div className="mt-12 space-y-8">
        {publications.map((publication) => (
          <article key={publication.id} className="max-w-3xl border-t border-black/20 py-7">
            <p className="font-mono text-xs text-[#64784e]">
              {publication.status} · {publication.date}
            </p>
            <h2 className="mt-3 text-2xl font-medium leading-snug">
              <Link
                href={`/recherche/${researchSlugs[publication.id as keyof typeof researchSlugs]}`}
                className="hover:underline"
              >
                {publication.title} ↗
              </Link>
            </h2>
            <p className="mt-4 leading-8 text-[#526047]">{publication.summary}</p>
            <p className="mt-3 font-mono text-xs text-[#64784e]">DOI : {publication.doi}</p>
          </article>
        ))}
      </div>
    </ContentShell>
  );
}
