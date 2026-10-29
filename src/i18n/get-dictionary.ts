import type { Locale } from './config';
import { defaultLocale } from './config';
import { fr } from './dictionaries/fr';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';
import type { Dictionary } from './dictionaries/fr';

const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en,
  es,
};

export function getDictionary(locale?: string): Dictionary {
  if (locale && (locale === 'fr' || locale === 'en' || locale === 'es')) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}

export type { Dictionary };

