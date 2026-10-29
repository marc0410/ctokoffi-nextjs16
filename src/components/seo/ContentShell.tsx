import Link from 'next/link';
import { breadcrumbs, jsonLd } from '@/lib/seo';
import { site } from '@/content/site';
import { getDictionary } from '@/i18n/get-dictionary';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import type { Locale } from '@/i18n/config';

type Crumb = { name: string; path: string };

export function ContentShell({
  children,
  crumbs,
  locale = 'fr',
}: {
  children: React.ReactNode;
  crumbs: Crumb[];
  locale?: Locale;
}) {
  const dict = getDictionary(locale);
  const homeLabel = locale === 'en' ? 'Home' : locale === 'es' ? 'Inicio' : 'Accueil';
  const trail = [{ name: homeLabel, path: `/${locale}` }, ...crumbs];

  return (
    <main className="min-h-screen bg-[#eeeee4] text-[#2c3525]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs(trail)) }}
      />
      <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-5 border-b border-black/15 px-6 py-7">
        <Link href={`/${locale}`} className="text-2xl font-semibold tracking-tight">
          koffi<span className="text-[#82749a]">®</span>
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <nav
            aria-label="Navigation principale"
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-wide"
          >
            <Link
              href={`/${locale}/a-propos`}
              data-analytics-event="nav_click"
              data-analytics-category="content_shell"
              data-analytics-label="a-propos"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${locale}/projets`}
              data-analytics-event="nav_click"
              data-analytics-category="content_shell"
              data-analytics-label="projets"
            >
              {dict.nav.projects}
            </Link>
            <Link
              href={`/${locale}/recherche`}
              data-analytics-event="nav_click"
              data-analytics-category="content_shell"
              data-analytics-label="recherche"
            >
              {dict.nav.research}
            </Link>
            <Link
              href={`/${locale}/journal`}
              data-analytics-event="nav_click"
              data-analytics-category="content_shell"
              data-analytics-label="journal"
            >
              {dict.nav.journal}
            </Link>
            <Link
              href={`/${locale}/contact`}
              data-analytics-event="nav_click"
              data-analytics-category="content_shell"
              data-analytics-label="contact"
            >
              {dict.nav.contact}
            </Link>
          </nav>
          <LanguageSwitcher variant="light" />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        <nav
          aria-label="Fil d’Ariane"
          className="mb-10 flex flex-wrap gap-2 font-mono text-xs text-[#64784e]"
        >
          {trail.map((item, index) => (
            <span key={item.path}>
              {index > 0 && <span className="mr-2">/</span>}
              {index === trail.length - 1 ? item.name : <Link href={item.path}>{item.name}</Link>}
            </span>
          ))}
        </nav>
        {children}
      </div>
      <footer className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4 border-t border-black/15 px-6 py-8 text-sm text-[#64784e]">
        <span>
          © {site.year} {site.name}
        </span>
        <Link
          href={`/${locale}/contact`}
          data-analytics-event="cta_click"
          data-analytics-category="content_shell_footer"
          data-analytics-label="parler_projet"
        >
          {dict.nav.talkWithMe}
        </Link>
      </footer>
    </main>
  );
}
