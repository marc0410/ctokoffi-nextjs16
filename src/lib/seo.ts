import type { Metadata } from 'next';
import { site } from '@/content/site';
import { locales, type Locale } from '@/i18n/config';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
  };
}

export function localizedPageMetadata(
  title: string,
  description: string,
  pathWithoutLocale: string,
  locale: Locale = 'fr',
): Metadata {
  const cleanPath = pathWithoutLocale.replace(/^\/(?:fr|en|es)/, '').replace(/\/$/, '') || '';
  const canonical = `/${locale}${cleanPath}`;

  const languagesMap: Record<string, string> = {
    'x-default': `/fr${cleanPath}`,
  };
  for (const loc of locales) {
    languagesMap[loc] = `/${loc}${cleanPath}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languagesMap,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'fr_FR',
      title: `${title} | ${site.name}`,
      description,
      url: canonical,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
