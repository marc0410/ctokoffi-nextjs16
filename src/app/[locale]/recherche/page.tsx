import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { getLocalizedPublications } from '@/content/i18n-content';
import { researchSlugs } from '@/content/seo';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { localizedPageMetadata } from '@/lib/seo';
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
    fr: 'Recherche — IA explicable et gouvernance ML-RAG',
    en: 'Research — Explainable AI & ML-RAG Governance',
    es: 'Investigación — IA Explicable y Gobernanza ML-RAG',
  };

  const descriptions: Record<Locale, string> = {
    fr: 'Prépublications de Koffi Kan Marc-Ephrem sur la fidélité des explications, la gouvernance ML-RAG et le scoring financier inclusif.',
    en: 'Open access preprints by Koffi Kan Marc-Ephrem on explanation faithfulness, ML-RAG constitutional governance, and inclusive credit scoring.',
    es: 'Prepublicaciones abiertas de Koffi Kan Marc-Ephrem sobre fidelidad explicativa, gobernanza ML-RAG y scoring inclusivo.',
  };

  return localizedPageMetadata(titles[locale], descriptions[locale], '/recherche', locale);
}

export default async function ResearchPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const publications = getLocalizedPublications(locale);

  const texts = {
    fr: {
      h1: 'Recherche en IA explicable',
      intro:
        'Mes travaux examinent la fidélité des explications d’un score de crédit, l’équité entre profils et la place de la supervision humaine. Les deux textes ci-dessous sont des prépublications ouvertes, pas des articles évalués par les pairs.',
    },
    en: {
      h1: 'Research in Explainable AI',
      intro:
        'My research investigates explanation faithfulness in credit scoring, demographic fairness, and scalable human-in-the-loop oversight. The manuscripts below are open-access preprints.',
    },
    es: {
      h1: 'Investigación en IA Explicable',
      intro:
        'Mis investigaciones exploran la fidelidad explicativa en evaluación crediticia, la equidad demográfica y la supervisión humana escalable. Los textos siguientes son prepublicaciones abiertas.',
    },
  };

  const localizedText = texts[locale];

  return (
    <ContentShell
      crumbs={[{ name: dict.nav.research, path: `/${locale}/recherche` }]}
      locale={locale}
    >
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">{localizedText.h1}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#526047]">
        {localizedText.intro}
      </p>
      <div className="mt-12 space-y-8">
        {publications.map((publication) => (
          <article key={publication.id} className="max-w-3xl border-t border-black/20 py-7">
            <p className="font-mono text-xs text-[#64784e]">
              {publication.status} · {publication.date}
            </p>
            <h2 className="mt-3 text-2xl font-medium leading-snug">
              <Link
                href={`/${locale}/recherche/${researchSlugs[publication.id as keyof typeof researchSlugs]}`}
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

