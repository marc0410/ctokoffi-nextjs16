import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/content/journal';
import { getLocalizedArticles } from '@/content/i18n-content';
import { site } from '@/content/site';
import { ReadingProgress } from '@/components/journal/ReadingProgress';
import { ShareArticle } from '@/components/journal/ShareArticle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { breadcrumbs, jsonLd, localizedPageMetadata } from '@/lib/seo';
import { locales, isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articles.map(({ slug }) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return { title: 'Not found' };

  const localizedList = getLocalizedArticles(locale);
  const article = localizedList.find((a) => a.slug === slug);
  if (!article) return { title: 'Article not found' };

  return localizedPageMetadata(
    article.title,
    article.excerpt,
    `/journal/${slug}`,
    locale,
  );
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const localizedArticles = getLocalizedArticles(locale);
  const article = localizedArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const index = localizedArticles.findIndex((a) => a.slug === slug);
  const next = localizedArticles[(index + 1) % localizedArticles.length];

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: '2026-10-28',
    dateModified: '2026-10-28',
    image: `${site.url}/og.png`,
    author: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      url: `${site.url}/${locale}/a-propos`,
    },
    url: `${site.url}/${locale}/journal/${slug}`,
    inLanguage: locale,
    mainEntityOfPage: `${site.url}/${locale}/journal/${slug}`,
  };

  const labels = {
    fr: {
      fieldNotes: '← K / FIELD NOTES',
      readTimeSuffix: 'de lecture',
      publishedOn: 'Publié le',
      updatedOn: 'Mis à jour le',
      relatedTitle: 'PROJETS ET RECHERCHE ASSOCIÉS',
      fvundiLink: 'Étude de cas Fvundi : scoring de crédit explicable →',
      researchLink: 'Recherche sur la gouvernance ML-RAG →',
      authorLink: 'À propos de l’auteur →',
      sourcesTitle: 'POUR ALLER PLUS LOIN',
      continueConvo: 'Poursuivons la conversation',
      upNext: 'À LIRE ENSUITE',
      backToPortfolio: '← Retour au portfolio',
    },
    en: {
      fieldNotes: '← K / FIELD NOTES',
      readTimeSuffix: 'read',
      publishedOn: 'Published on',
      updatedOn: 'Updated on',
      relatedTitle: 'RELATED RESEARCH & CASE STUDIES',
      fvundiLink: 'Fvundi Case Study: Explainable Credit Scoring →',
      researchLink: 'Research: Constitutional ML-RAG Governance →',
      authorLink: 'About the author →',
      sourcesTitle: 'FURTHER READING',
      continueConvo: 'Let’s continue the conversation',
      upNext: 'UP NEXT',
      backToPortfolio: '← Back to portfolio',
    },
    es: {
      fieldNotes: '← K / FIELD NOTES',
      readTimeSuffix: 'de lectura',
      publishedOn: 'Publicado el',
      updatedOn: 'Actualizado el',
      relatedTitle: 'PROYECTOS E INVESTIGACIÓN ASOCIADOS',
      fvundiLink: 'Caso de estudio Fvundi: scoring explicable →',
      researchLink: 'Investigación sobre gobernanza ML-RAG →',
      authorLink: 'Acerca del autor →',
      sourcesTitle: 'LECTURAS RECOMENDADAS',
      continueConvo: 'Continuemos la conversación',
      upNext: 'SIGUIENTE ARTÍCULO',
      backToPortfolio: '← Volver al portafolio',
    },
  };

  const localizedLabels = labels[locale];
  const homeLabel = locale === 'en' ? 'Home' : locale === 'es' ? 'Inicio' : 'Accueil';

  return (
    <main className="min-h-screen bg-[#eeeee4] text-[#2c3525] selection:bg-accent">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbs([
              { name: homeLabel, path: `/${locale}` },
              { name: dict.nav.journal, path: `/${locale}/journal` },
              { name: article.title, path: `/${locale}/journal/${slug}` },
            ]),
          ),
        }}
      />
      <header className="mx-auto flex max-w-4xl items-center justify-between gap-5 border-b border-black/15 px-6 py-7 md:px-12">
        <Link
          href={`/${locale}/journal`}
          className="font-mono text-xs tracking-wide text-[#64784e] transition-colors hover:text-black"
        >
          {localizedLabels.fieldNotes}
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher variant="light" />
          <ShareArticle />
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#7c896c]">
          {article.category} / {article.readTime} {localizedLabels.readTimeSuffix}
        </div>
        <h1 className="mt-6 text-4xl leading-[1.15] font-medium tracking-tight text-balance md:text-6xl">
          {article.title}
        </h1>
        <div className="mt-8 flex items-center gap-3 border-b border-black/15 pb-8">
          <span className="flex size-10 items-center justify-center rounded-full border border-black/20 text-xl">
            K
          </span>
          <div className="text-sm">
            <Link href={`/${locale}/a-propos`} className="hover:underline">
              {site.name}
            </Link>
            <p className="mt-1 text-xs text-[#8a9678]">
              {localizedLabels.publishedOn} {article.date} · {localizedLabels.updatedOn} {article.date}
            </p>
          </div>
        </div>
        <p className="mt-9 text-xl leading-relaxed tracking-tight text-[#5a694a]">
          {article.intro}
        </p>
        {article.sections.map(([title, text], i) => (
          <section key={title} className="mt-12">
            <span className="font-mono text-[10px] text-[#889974]">0{i + 1}</span>
            <h2 className="mt-2 text-2xl leading-snug font-medium tracking-tight">{title}</h2>
            <p className="mt-4 text-base leading-8 text-[#5c6c4a]">{text}</p>
          </section>
        ))}
        <blockquote className="my-12 border-l-2 border-[#8b72a8] pl-6 font-serif text-2xl leading-relaxed text-[#6d547d] italic">
          {article.takeaway}
        </blockquote>
        <aside className="mb-10 border-t border-black/15 pt-6">
          <h2 className="font-mono text-[10px] tracking-widest text-[#869771]">
            {localizedLabels.relatedTitle}
          </h2>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#5e704b]">
            <Link href={`/${locale}/projets/fvundi`} className="hover:underline">
              {localizedLabels.fvundiLink}
            </Link>
            <Link href={`/${locale}/recherche/constitutional-oversight-ml-rag`} className="hover:underline">
              {localizedLabels.researchLink}
            </Link>
            <Link href={`/${locale}/a-propos`} className="hover:underline">
              {localizedLabels.authorLink}
            </Link>
          </div>
        </aside>
        {article.sources && (
          <aside className="mb-10 border-t border-black/15 pt-6">
            <h2 className="mb-5 font-mono text-[10px] tracking-widest text-[#869771]">
              {localizedLabels.sourcesTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {article.sources.map((s) => (
                <a
                  href={s.url}
                  key={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-5 text-sm text-[#5e704b] hover:underline"
                >
                  {s.title}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </aside>
        )}
        <a
          className="inline-flex items-center gap-6 border-b border-black/30 pb-2 text-sm"
          href={`mailto:${site.email}?subject=${encodeURIComponent(article.title)}`}
        >
          {localizedLabels.continueConvo} <ArrowUpRight size={16} />
        </a>
      </article>
      <nav
        aria-label="Article suivant"
        className="mx-auto max-w-3xl border-t border-black/15 px-6 py-10"
      >
        <span className="font-mono text-[10px] tracking-widest text-[#7c896c]">{localizedLabels.upNext}</span>
        <Link
          href={`/${locale}/journal/${next.slug}`}
          className="mt-4 flex items-center justify-between gap-8 text-xl leading-snug tracking-tight hover:text-[#82649b]"
        >
          {next.title}
          <ArrowUpRight size={25} />
        </Link>
        <Link href={`/${locale}`} className="mt-10 inline-block text-xs text-[#7c896c] hover:underline">
          {localizedLabels.backToPortfolio}
        </Link>
      </nav>
    </main>
  );
}

