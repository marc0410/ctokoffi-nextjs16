import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Journal } from '@/components/sections/Journal';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { localizedPageMetadata } from '@/lib/seo';
import { getDictionary } from '@/i18n/get-dictionary';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return { title: 'Not found' };

  const titles: Record<Locale, string> = {
    fr: 'Journal — Engineering, architecture & recherche',
    en: 'Journal — Engineering, Architecture & Research',
    es: 'Diario — Ingeniería, Arquitectura e Investigación',
  };

  const descriptions: Record<Locale, string> = {
    fr: 'Notes de terrain de Koffi Kan Marc-Ephrem : Forward Deployed Engineering, croissance des plateformes et AI Safety.',
    en: 'Field notes by Koffi Kan Marc-Ephrem: Forward Deployed Engineering, scaling platforms, and AI Safety.',
    es: 'Notas de campo de Koffi Kan Marc-Ephrem: Forward Deployed Engineering, escalabilidad de plataformas y seguridad de IA.',
  };

  return localizedPageMetadata(titles[locale], descriptions[locale], '/journal', locale);
}

export default async function JournalPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const texts = {
    fr: {
      h1: 'Journal de Koffi Kan Marc-Ephrem',
      desc: 'Notes de terrain sur le Forward Deployed Engineering, l’architecture des plateformes et la recherche en intelligence artificielle explicable.',
      footer: 'Notes d’ingénierie · Koffi Kan Marc-Ephrem',
    },
    en: {
      h1: 'Journal of Koffi Kan Marc-Ephrem',
      desc: 'Field notes on Forward Deployed Engineering, production platform scalability, and explainable AI research.',
      footer: 'Engineering notes · Koffi Kan Marc-Ephrem',
    },
    es: {
      h1: 'Diario de Koffi Kan Marc-Ephrem',
      desc: 'Notas de campo sobre Forward Deployed Engineering, arquitectura de plataformas escalables e investigación en IA explicable.',
      footer: 'Notas de ingeniería · Koffi Kan Marc-Ephrem',
    },
  };

  const localizedText = texts[locale];

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/15 px-6 py-8 md:px-12">
        <Link href={`/${locale}`} className="wordmark">
          koffi<span>®</span>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={`/${locale}#journal`}
            className="font-mono text-xs text-accent transition-colors hover:text-white"
          >
            {dict.nav.backToPortfolio}
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-12">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          {localizedText.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
          {localizedText.desc}
        </p>
      </div>
      <Journal quiet={false} locale={locale} />
      <footer className="px-6 pb-12 text-center text-xs text-white/50">
        {localizedText.footer}
      </footer>
    </main>
  );
}

