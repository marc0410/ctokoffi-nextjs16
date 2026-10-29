import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { getLocalizedProjects } from '@/content/i18n-content';
import { projectPages } from '@/content/seo';
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
    fr: 'Projets — produits numériques, IA et architecture',
    en: 'Projects — Digital Platforms, AI & Architecture',
    es: 'Proyectos — Plataformas Digitales, IA y Arquitectura',
  };

  const descriptions: Record<Locale, string> = {
    fr: 'Études de cas de Koffi Kan Marc-Ephrem : fintech, PropTech, intelligence artificielle, commerce et traçabilité, du problème métier à la production.',
    en: 'Case studies by Koffi Kan Marc-Ephrem: fintech, proptech, applied AI, social commerce, and supply chain traceability from domain problem to production.',
    es: 'Casos de estudio de Koffi Kan Marc-Ephrem: fintech, proptech, inteligencia artificial, comercio social y trazabilidad, del problema de negocio a producción.',
  };

  return localizedPageMetadata(titles[locale], descriptions[locale], '/projets', locale);
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const projects = getLocalizedProjects(locale);

  const texts = {
    fr: {
      h1: 'Projets et études de cas',
      intro:
        'Chaque projet présente un problème, le rôle exercé, les choix de conception et les résultats connus. Les chiffres concernent le projet indiqué et ne sont pas additionnés à l’échelle d’une seule plateforme.',
    },
    en: {
      h1: 'Projects & Case Studies',
      intro:
        'Each case study outlines the initial friction, my technical and architectural role, key tradeoffs, and production metrics. Impact numbers reflect measured platform outcomes.',
    },
    es: {
      h1: 'Proyectos y Casos de Estudio',
      intro:
        'Cada caso de estudio expone la fricción inicial, mi rol técnico y de arquitectura, las decisiones de diseño y las métricas en producción.',
    },
  };

  const localizedText = texts[locale];

  return (
    <ContentShell
      crumbs={[{ name: dict.nav.projects, path: `/${locale}/projets` }]}
      locale={locale}
    >
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">{localizedText.h1}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526047]">
        {localizedText.intro}
      </p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project) => {
          const slug = projectPages.find((p) => p.id === project.id)?.slug || project.id;
          return (
            <article key={project.id} className="border-t border-black/20 py-7">
              <span className="font-mono text-xs text-[#64784e]">{project.type}</span>
              <h2 className="mt-3 text-2xl font-medium">
                <Link href={`/${locale}/projets/${slug}`} className="hover:underline">
                  {project.name} ↗
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-[#526047]">{project.summary}</p>
              <p className="mt-4 text-sm text-[#64784e]">{project.role}</p>
            </article>
          );
        })}
      </div>
    </ContentShell>
  );
}

