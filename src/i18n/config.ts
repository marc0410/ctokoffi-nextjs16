export const locales = ['fr', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, { name: string; nativeName: string; flag: string }> = {
  fr: { name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
};

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

/**
 * Construit un chemin préfixé par la langue demandée
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  // Retire tout préfixe de langue existant
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments.shift();
  }
  const cleanPath = segments.join('/');
  return cleanPath ? `/${targetLocale}/${cleanPath}` : `/${targetLocale}`;
}

