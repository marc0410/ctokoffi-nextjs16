import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/seo/ContentShell';
import { site } from '@/content/site';
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
    fr: 'Contact — échanger avec Koffi Kan Marc-Ephrem',
    en: 'Contact — Connect with Koffi Kan Marc-Ephrem',
    es: 'Contacto — Conversar con Koffi Kan Marc-Ephrem',
  };

  const descriptions: Record<Locale, string> = {
    fr: 'Contacter Koffi Kan Marc-Ephrem à Abidjan pour un projet produit, une collaboration en ingénierie ou une recherche en intelligence artificielle.',
    en: 'Connect with Koffi Kan Marc-Ephrem in Abidjan regarding product engineering, architecture, or explainable AI research.',
    es: 'Contactar con Koffi Kan Marc-Ephrem en Abidyán para proyectos de producto, arquitectura de software o investigación en IA.',
  };

  return localizedPageMetadata(titles[locale], descriptions[locale], '/contact', locale);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const texts = {
    fr: {
      eyebrow: 'Produit · Engineering · Recherche',
      h1: 'Parlons de votre projet',
      intro: `Vous souhaitez discuter d’un produit numérique, d’une architecture, d’un déploiement terrain ou d’une recherche en IA explicable ? Écrivez-moi directement. Je suis basé à ${site.location} et ouvert aux collaborations internationales.`,
      cv: 'Télécharger le CV ↗',
    },
    en: {
      eyebrow: 'Product · Engineering · Research',
      h1: 'Let’s discuss your project',
      intro: `Looking to architect a new digital platform, scale a production system, or explore explainable AI? Reach out directly. I am based in ${site.location} and open to international advisory and engineering leadership.`,
      cv: 'Download Resume ↗',
    },
    es: {
      eyebrow: 'Producto · Ingeniería · Investigación',
      h1: 'Hablemos de su proyecto',
      intro: `¿Desea estructurar una nueva plataforma digital, desplegar sistemas en producción o explorar IA explicable? Escríbame directamente. Estoy radicado en ${site.location} y abierto a colaboraciones internacionales.`,
      cv: 'Descargar el CV ↗',
    },
  };

  const localizedText = texts[locale];

  return (
    <ContentShell
      crumbs={[{ name: dict.nav.contact, path: `/${locale}/contact` }]}
      locale={locale}
    >
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#64784e]">
          {localizedText.eyebrow}
        </p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
          {localizedText.h1}
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#526047]">
          {localizedText.intro}
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
            {localizedText.cv}
          </a>
        </div>
      </div>
    </ContentShell>
  );
}

