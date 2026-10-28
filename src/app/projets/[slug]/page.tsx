import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { projectPages } from '@/content/seo';
import { site } from '@/content/site';
import { jsonLd, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projectPages.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectPages.find((item) => item.slug === slug);
  if (!project) return { title: 'Projet introuvable' };
  return pageMetadata(
    `${project.name} — étude de cas ${project.category}`,
    project.summary,
    `/projets/${slug}`,
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectPages.find((item) => item.slug === slug);
  if (!project) notFound();
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary,
    url: `${site.url}/projets/${slug}`,
    creator: { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name },
    inLanguage: 'fr',
  };
  return (
    <ContentShell
      crumbs={[
        { name: 'Projets', path: '/projets' },
        { name: project.name, path: `/projets/${slug}` },
      ]}
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
            <dt className="font-mono text-xs text-[#64784e]">RÔLE</dt>
            <dd className="mt-2">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-[#64784e]">DOMAINE</dt>
            <dd className="mt-2">{project.type}</dd>
          </div>
        </dl>
        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-medium">Le problème</h2>
            <p className="mt-4 leading-8 text-[#526047]">{project.challenge}</p>
          </section>
          <section>
            <h2 className="text-2xl font-medium">La solution et les choix techniques</h2>
            <p className="mt-4 leading-8 text-[#526047]">{project.approach}</p>
          </section>
          <section>
            <h2 className="text-2xl font-medium">Résultat connu</h2>
            <p className="mt-4 leading-8 text-[#526047]">{project.outcome}</p>
          </section>
          <section>
            <h2 className="text-2xl font-medium">Technologies et concepts</h2>
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
            >
              Voir le site du projet ↗
            </a>
          )}
          {project.id === 'fvundi' && (
            <Link
              href="/recherche/constitutional-oversight-ml-rag"
              className="underline underline-offset-4"
            >
              Recherche associée sur le ML-RAG →
            </Link>
          )}
          <Link href="/contact" className="underline underline-offset-4">
            Discuter d’un projet similaire →
          </Link>
        </div>
      </article>
    </ContentShell>
  );
}
