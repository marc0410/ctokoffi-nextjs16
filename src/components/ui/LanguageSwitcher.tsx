'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, getLocalizedPath, type Locale } from '@/i18n/config';

export function LanguageSwitcher({
  className = '',
  variant = 'dark',
}: {
  className?: string;
  variant?: 'dark' | 'light';
}) {
  const pathname = usePathname() || '/';

  // Détection de la locale actuelle depuis l'URL
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale: Locale =
    segments.length > 0 && (locales as readonly string[]).includes(segments[0])
      ? (segments[0] as Locale)
      : 'fr';

  const isLight = variant === 'light';

  return (
    <div
      role="group"
      aria-label="Sélection de langue / Language selector"
      className={`inline-flex items-center rounded-full p-0.5 backdrop-blur-md transition-colors ${
        isLight
          ? 'border border-black/15 bg-black/5'
          : 'border border-white/15 bg-white/5'
      } ${className}`}
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        const targetPath = getLocalizedPath(pathname, locale);

        const activeClasses = isLight
          ? 'bg-black/15 text-[#2c3525] shadow-sm font-semibold border border-black/15'
          : 'bg-white/20 text-white shadow-sm font-semibold border border-white/20';

        const inactiveClasses = isLight
          ? 'text-[#526047] hover:text-[#2c3525] hover:bg-black/5'
          : 'text-white/60 hover:text-white hover:bg-white/10';

        return (
          <Link
            key={locale}
            href={targetPath}
            data-analytics-event="language_switch"
            data-analytics-category="i18n"
            data-analytics-label={locale}
            aria-current={isActive ? 'true' : undefined}
            className={`rounded-full px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase transition-all ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
