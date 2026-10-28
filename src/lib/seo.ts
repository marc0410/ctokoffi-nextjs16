import type { Metadata } from 'next';
import { site } from '@/content/site';

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
