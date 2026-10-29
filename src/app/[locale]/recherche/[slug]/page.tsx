import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { getLocalizedPublications } from '@/content/i18n-content';
import { publications } from '@/content/journal';
import { researchSlugs } from '@/content/seo';
import { site } from '@/content/site';
import { locales, isValidLocale } from '@/i18n/config';
import { jsonLd, localizedPageMetadata } from '@/lib/seo';
import { getDictionary } from '@/i18n/get-dictionary';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.values(researchSlugs).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return { title: 'Not found' };

  const publicationEntry = publications.find(
    (item) => researchSlugs[item.id as keyof typeof researchSlugs] === slug,
  );
  if (!publicationEntry) return { title: 'Publication not found' };

  const localizedList = getLocalizedPublications(locale);
  const publication = localizedList.find((item) => item.id === publicationEntry.id) || publicationEntry;

  const suffix =
    locale === 'en'
      ? 'AI Research Preprint'
      : locale === 'es'
        ? 'Prepublicación de IA'
        : 'recherche en IA';

  return localizedPageMetadata(
    `${publication.shortTitle} — ${suffix}`,
    publication.summary,
    `/recherche/${slug}`,
    locale,
  );
}

export default async function PublicationPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const publicationEntry = publications.find(
    (item) => researchSlugs[item.id as keyof typeof researchSlugs] === slug,
  );
  if (!publicationEntry) notFound();

  const dict = getDictionary(locale);
  const localizedList = getLocalizedPublications(locale);
  const publication = localizedList.find((item) => item.id === publicationEntry.id) || publicationEntry;
  const constitutional = publication.id === 'constitutional-oversight';

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    description: publication.summary,
    author: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name },
    datePublished: constitutional ? '2026-05-01' : '2026-05-17',
    identifier: `https://doi.org/${publication.doi}`,
    url: `${site.url}/${locale}/recherche/${slug}`,
    isAccessibleForFree: true,
  };

  const sections = {
    fr: {
      summaryTitle: 'Résumé accessible',
      methodTitle: 'Hypothèse et méthode',
      limitsTitle: 'Limites et applications',
      zenodoLink: 'Lire la fiche Zenodo ↗',
      pdfLink: 'Télécharger le PDF ↗',
      articleLink: 'Lire l’article associé →',
      constMethod:
        'Un score produit par un modèle ML peut recevoir une explication générée par RAG qui semble convaincante sans refléter exactement les facteurs de décision. La prépublication propose une constitution financière lisible par machine, un arbitre IA et une supervision humaine pour examiner la fidélité et l’équité des explications.',
      constLimits:
        'Le cadre est une proposition de recherche. Une validation empirique et des audits indépendants restent nécessaires avant tout usage dans une décision de crédit réelle. Le projet Fvundi sert de contexte à cette réflexion sur l’IA financière explicable.',
      hlsMethod:
        'Le texte explore un scoring inclusif qui combine des signaux financiers, civiques, comportementaux et contextuels. Il souligne que la collecte et l’usage de ces signaux demandent consentement, audit des biais et supervision humaine.',
      hlsLimits:
        'Il s’agit d’une prépublication conceptuelle dont la validation empirique est en cours. Aucun résultat de performance ou d’équité n’est revendiqué ici. La recherche est liée aux questions posées par Fvundi sur le scoring de crédit explicable.',
    },
    en: {
      summaryTitle: 'Accessible Abstract',
      methodTitle: 'Hypothesis & Methodology',
      limitsTitle: 'Limitations & Real-world Applications',
      zenodoLink: 'View on Zenodo ↗',
      pdfLink: 'Download Manuscript PDF ↗',
      articleLink: 'Read related essay →',
      constMethod:
        'An algorithmic score computed by an ML model may be paired with a RAG-synthesized natural-language explanation that appears fluent yet deviates from true mathematical attributions. This preprint introduces a machine-readable financial constitution, an automated AI referee, and human-in-the-loop oversight to audit explanation faithfulness and demographic fairness.',
      constLimits:
        'This framework is an academic research preprint. Empirical validation and independent third-party audits are essential prior to live lending deployment. The Fvundi project serves as an operational testbed for this research in explainable financial intelligence.',
      hlsMethod:
        'The paper proposes Holistic Life Scoring (HLS), an inclusive scoring paradigm expanding telemetry beyond legacy banking to financial, civic, behavioral, and contextual indicators, paired with strict user consent and algorithmic bias auditing.',
      hlsLimits:
        'This manuscript is a conceptual preprint with empirical validation currently underway. It claims no finalized performance metrics. Research stems directly from Fvundi operational inquiries.',
    },
    es: {
      summaryTitle: 'Resumen Divulgativo',
      methodTitle: 'Hipótesis y Metodología',
      limitsTitle: 'Limitaciones y Aplicaciones Reales',
      zenodoLink: 'Ver ficha en Zenodo ↗',
      pdfLink: 'Descargar Manuscrito en PDF ↗',
      articleLink: 'Leer artículo relacionado →',
      constMethod:
        'Una puntuación generada por un modelo ML puede recibir una explicación RAG fluida que no refleje con exactitud los factores matemáticos de decisión. Esta prepublicación formula una constitución financiera legible por máquinas, un árbitro de IA y supervisión humana para auditar fidelidad y equidad.',
      constLimits:
        'El marco es una propuesta de investigación. Es indispensable una validación empírica y auditorías independientes antes de cualquier uso en préstamos reales. El proyecto Fvundi sirve de entorno de prueba para esta investigación.',
      hlsMethod:
        'El texto analiza el Holistic Life Scoring (HLS), un enfoque inclusivo que une señales financieras, cívicas, conductuales y contextuales con consentimiento explícito y auditoría de sesgos.',
      hlsLimits:
        'Es una prepublicación conceptual con validación empírica en curso. No se reivindican resultados concluyentes de rendimiento. La investigación está ligada al trabajo en Fvundi.',
    },
  };

  const localizedSections = sections[locale];

  return (
    <ContentShell
      crumbs={[
        { name: dict.nav.research, path: `/${locale}/recherche` },
        { name: publication.shortTitle, path: `/${locale}/recherche/${slug}` },
      ]}
      locale={locale}
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
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {publication.doi}
          </a>
        </p>
        <section className="mt-12">
          <h2 className="text-2xl font-medium">{localizedSections.summaryTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-[#526047]">{publication.summary}</p>
        </section>
        {constitutional ? (
          <>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">{localizedSections.methodTitle}</h2>
              <p className="mt-4 leading-8 text-[#526047]">{localizedSections.constMethod}</p>
            </section>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">{localizedSections.limitsTitle}</h2>
              <p className="mt-4 leading-8 text-[#526047]">
                {localizedSections.constLimits}{' '}
                <Link href={`/${locale}/projets/fvundi`} className="underline">
                  Fvundi
                </Link>
                .
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">{localizedSections.methodTitle}</h2>
              <p className="mt-4 leading-8 text-[#526047]">{localizedSections.hlsMethod}</p>
            </section>
            <section className="mt-10">
              <h2 className="text-2xl font-medium">{localizedSections.limitsTitle}</h2>
              <p className="mt-4 leading-8 text-[#526047]">
                {localizedSections.hlsLimits}{' '}
                <Link href={`/${locale}/projets/fvundi`} className="underline">
                  Fvundi
                </Link>
                .
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
            data-analytics-event="zenodo_click"
            data-analytics-category="research"
            data-analytics-label={publication.shortTitle}
          >
            {localizedSections.zenodoLink}
          </a>
          <a
            href={publication.pdf}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            data-analytics-event="pdf_download"
            data-analytics-category="research"
            data-analytics-label={publication.shortTitle}
          >
            {localizedSections.pdfLink}
          </a>
          <Link
            href={`/${locale}/journal/un-score-ne-suffit-pas`}
            className="underline underline-offset-4"
          >
            {localizedSections.articleLink}
          </Link>
        </div>
      </article>
    </ContentShell>
  );
}

