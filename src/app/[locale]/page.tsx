import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Portfolio from '@/components/portfolio/Portfolio';
import { site } from '@/content/site';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { localizedPageMetadata, jsonLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return { title: 'Not found' };

  const metaDescriptions: Record<Locale, string> = {
    fr: 'Portfolio de Koffi Kan Marc-Ephrem, CTO et Forward Deployed Engineer à Abidjan : produits numériques, IA explicable, systèmes ML-RAG et architectures scalables.',
    en: 'Portfolio of Koffi Kan Marc-Ephrem, CTO & Forward Deployed Engineer in Abidjan: resilient digital platforms, explainable AI, ML-RAG systems, and scalable architectures.',
    es: 'Portafolio de Koffi Kan Marc-Ephrem, CTO y Forward Deployed Engineer en Abidyán: productos digitales resilientes, IA explicable, sistemas ML-RAG y arquitecturas escalables.',
  };

  return localizedPageMetadata(
    site.title,
    metaDescriptions[locale],
    '',
    locale,
  );
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const person = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/${locale}`,
        inLanguage: locale,
      },
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        alternateName: site.alternateName,
        jobTitle: ['Chief Technology Officer', 'Forward Deployed Engineer', 'AI/ML Engineer'],
        url: `${site.url}/${locale}/a-propos`,
        homeLocation: { '@type': 'Place', name: site.location },
        sameAs: [site.github, site.linkedin],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(person) }}
      />
      <Portfolio locale={locale} />
    </>
  );
}

