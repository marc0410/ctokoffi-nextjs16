import type { Metadata } from 'next';
import { ContentShell } from '@/components/seo/ContentShell';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(
  'Contact — échanger avec Koffi Kan Marc-Ephrem',
  'Contacter Koffi Kan Marc-Ephrem à Abidjan pour un projet produit, une collaboration en ingénierie ou une recherche en intelligence artificielle.',
  '/contact',
);

export default function ContactPage() {
  return (
    <ContentShell crumbs={[{ name: 'Contact', path: '/contact' }]}>
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#64784e]">
          Produit · Engineering · Recherche
        </p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
          Parlons de votre projet
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#526047]">
          Vous souhaitez discuter d’un produit numérique, d’une architecture, d’un déploiement
          terrain ou d’une recherche en IA explicable ? Écrivez-moi directement. Je suis basé à{' '}
          {site.location} et ouvert aux collaborations internationales.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-block border-b-2 border-[#466031] pb-2 text-xl font-medium break-all md:text-3xl"
          data-analytics-event="contact_click"
          data-analytics-category="contact_page"
          data-analytics-label="main_email"
        >
          {site.email} ↗
        </a>
        <div className="mt-12 flex flex-wrap gap-6 text-sm text-[#466031]">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            data-analytics-event="social_click"
            data-analytics-category="contact_page"
            data-analytics-label="linkedin"
          >
            LinkedIn ↗
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            data-analytics-event="social_click"
            data-analytics-category="contact_page"
            data-analytics-label="github"
          >
            GitHub ↗
          </a>
          <a
            href={site.cv}
            download
            className="underline underline-offset-4"
            data-analytics-event="cv_download"
            data-analytics-category="contact_page"
            data-analytics-label="cv"
          >
            Télécharger le CV ↗
          </a>
        </div>
      </div>
    </ContentShell>
  );
}
