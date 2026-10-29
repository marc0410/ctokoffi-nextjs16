import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { getLocalizedProjects } from '@/content/i18n-content';
import { projectPages } from '@/content/seo';
import { site } from '@/content/site';
import { locales, isValidLocale } from '@/i18n/config';
import { jsonLd, localizedPageMetadata } from '@/lib/seo';
import { getDictionary } from '@/i18n/get-dictionary';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectPages.map(({ slug }) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return { title: 'Not found' };

  const projectEntry = projectPages.find((item) => item.slug === slug);
  if (!projectEntry) return { title: 'Project not found' };

  const localizedProjects = getLocalizedProjects(locale);
  const project = localizedProjects.find((item) => item.id === projectEntry.id) || projectEntry;

  const categoryLabel =
    locale === 'en'
      ? `${project.category} case study`
      : locale === 'es'
        ? `caso de estudio ${project.category}`
        : `étude de cas ${project.category}`;

  return localizedPageMetadata(
    `${project.name} — ${categoryLabel}`,
    project.summary,
    `/projets/${slug}`,
    locale,
  );
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const projectEntry = projectPages.find((item) => item.slug === slug);
  if (!projectEntry) notFound();

  const dict = getDictionary(locale);
  const localizedProjects = getLocalizedProjects(locale);
  const project = localizedProjects.find((item) => item.id === projectEntry.id) || projectEntry;

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary,
    url: `${site.url}/${locale}/projets/${slug}`,
    creator: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name },
    inLanguage: locale,
  };

  return (
    <ContentShell
      crumbs={[
        { name: dict.nav.projects, path: `/${locale}/projets` },
        { name: project.name, path: `/${locale}/projets/${slug}` },
      ]}
      locale={locale}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <article className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#64784e]">
          {project.type} · {project.year}
        </p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{project.name}</h1>
        <p className="mt-6 text-xl leading-8 text-[#526047]">{project.summary}</p>
        <dl className="mt-10 grid gap-4 border-y border-black/15 py-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs text-[#64784e]">{dict.projects.roleLabel}</dt>
            <dd className="mt-2">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-[#64784e]">{dict.projects.domainLabel}</dt>
            <dd className="mt-2">{project.type}</dd>
          </div>
        </dl>
        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-medium">{dict.projects.problemTitle}</h2>
            <p className="mt-4 leading-8 text-[#526047]">{project.challenge}</p>
          </section>
          <section>
            <h2 className="text-2xl font-medium">{dict.projects.solutionTitle}</h2>
            <p className="mt-4 leading-8 text-[#526047]">{project.approach}</p>
          </section>
          <section>
            <h2 className="text-2xl font-medium">{dict.projects.outcomeTitle}</h2>
            <p className="mt-4 leading-8 text-[#526047]">{project.outcome}</p>
          </section>
          <section>
            <h2 className="text-2xl font-medium">{dict.projects.techTitle}</h2>
            <p className="mt-4 leading-8 text-[#526047]">{project.tags.join(' · ')}</p>
          </section>
        </div>
        <div className="mt-12 flex flex-wrap gap-5 text-sm font-semibold text-[#466031]">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
              data-analytics-event="project_external_visit"
              data-analytics-category="portfolio"
              data-analytics-label={project.name}
              data-analytics-project={project.id}
            >
              {dict.projects.visitSite} ↗
            </a>
          )}
          {project.id === 'fvundi' && (
            <Link
              href={`/${locale}/recherche/constitutional-oversight-ml-rag`}
              className="underline underline-offset-4"
            >
              {dict.projects.associatedResearch}
            </Link>
          )}
          <Link href={`/${locale}/contact`} className="underline underline-offset-4">
            {dict.projects.discussSimilar}
          </Link>
        </div>
      </article>
    </ContentShell>
  );
}

