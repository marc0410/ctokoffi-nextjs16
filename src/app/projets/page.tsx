import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/seo/ContentShell';
import { projectPages } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Projets — produits numériques, IA et architecture',
  'Études de cas de Koffi Kan Marc-Ephrem : fintech, PropTech, intelligence artificielle, commerce et traçabilité, du problème métier à la production.',
  '/projets',
);

export default function ProjectsPage() {
  return (
    <ContentShell crumbs={[{ name: 'Projets', path: '/projets' }]}>
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">Projets et études de cas</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526047]">
        Chaque projet présente un problème, le rôle exercé, les choix de conception et les résultats
        connus. Les chiffres concernent le projet indiqué et ne sont pas additionnés à l’échelle
        d’une seule plateforme.
      </p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projectPages.map((project) => (
          <article key={project.id} className="border-t border-black/20 py-7">
            <span className="font-mono text-xs text-[#64784e]">{project.type}</span>
            <h2 className="mt-3 text-2xl font-medium">
              <Link href={`/projets/${project.slug}`} className="hover:underline">
                {project.name} ↗
              </Link>
            </h2>
            <p className="mt-3 leading-7 text-[#526047]">{project.summary}</p>
            <p className="mt-4 text-sm text-[#64784e]">{project.role}</p>
          </article>
        ))}
      </div>
    </ContentShell>
  );
}
