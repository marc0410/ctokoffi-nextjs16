import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/content/journal';
import { site } from '@/content/site';
import { ReadingProgress } from '@/components/journal/ReadingProgress';
import { ShareArticle } from '@/components/journal/ShareArticle';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'Article introuvable' };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/journal/${slug}`,
      authors: [site.name],
      images: ['/og.png'],
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const index = articles.findIndex((a) => a.slug === slug);
  const next = articles[(index + 1) % articles.length];
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: site.name, url: site.url },
    url: `${site.url}/journal/${slug}`,
    inLanguage: 'fr',
    mainEntityOfPage: `${site.url}/journal/${slug}`,
  };
  return (
    <main className="min-h-screen bg-[#eeeee4] text-[#2c3525] selection:bg-accent">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }}
      />
      <header className="mx-auto flex max-w-4xl items-start justify-between gap-5 border-b border-black/15 px-6 py-7 md:px-12">
        <Link
          href="/journal"
          className="pt-2 font-mono text-xs tracking-wide text-[#64784e] transition-colors hover:text-black"
        >
          ← K / FIELD NOTES
        </Link>
        <ShareArticle />
      </header>
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#7c896c]">
          {article.category} / {article.readTime} de lecture
        </div>
        <h1 className="mt-6 text-4xl leading-[1.15] font-medium tracking-tight text-balance md:text-6xl">
          {article.title}
        </h1>
        <div className="mt-8 flex items-center gap-3 border-b border-black/15 pb-8">
          <span className="flex size-10 items-center justify-center rounded-full border border-black/20 text-xl">
            K
          </span>
          <div className="text-sm">
            <span>{site.name}</span>
            <p className="mt-1 text-xs text-[#8a9678]">{article.date} · Note personnelle</p>
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
        {article.sources && (
          <aside className="mb-10 border-t border-black/15 pt-6">
            <h2 className="mb-5 font-mono text-[10px] tracking-widest text-[#869771]">
              POUR ALLER PLUS LOIN
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
          Poursuivons la conversation <ArrowUpRight size={16} />
        </a>
      </article>
      <nav
        aria-label="Article suivant"
        className="mx-auto max-w-3xl border-t border-black/15 px-6 py-10"
      >
        <span className="font-mono text-[10px] tracking-widest text-[#7c896c]">À LIRE ENSUITE</span>
        <Link
          href={`/journal/${next.slug}`}
          className="mt-4 flex items-center justify-between gap-8 text-xl leading-snug tracking-tight hover:text-[#82649b]"
        >
          {next.title}
          <ArrowUpRight size={25} />
        </Link>
        <Link href="/" className="mt-10 inline-block text-xs text-[#7c896c] hover:underline">
          ← Retour au portfolio
        </Link>
      </nav>
    </main>
  );
}
