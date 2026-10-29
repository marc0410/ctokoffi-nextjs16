import type { MetadataRoute } from 'next';
import { articles } from '@/content/journal';
import { projectPages, researchSlugs } from '@/content/seo';
import { site } from '@/content/site';
import { locales, defaultLocale } from '@/i18n/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const basePaths: { path: string; priority: number }[] = [
    { path: '', priority: 1.0 },
    { path: '/a-propos', priority: 0.9 },
    { path: '/projets', priority: 0.9 },
    ...projectPages.map((project) => ({
      path: `/projets/${project.slug}`,
      priority: 0.8,
    })),
    { path: '/recherche', priority: 0.8 },
    ...Object.values(researchSlugs).map((slug) => ({
      path: `/recherche/${slug}`,
      priority: 0.8,
    })),
    { path: '/journal', priority: 0.8 },
    ...articles.map((a) => ({
      path: `/journal/${a.slug}`,
      priority: 0.7,
    })),
    { path: '/contact', priority: 0.6 },
  ];

  const items: MetadataRoute.Sitemap = [
    // Racine redirigeant vers /fr, avec alternates
    {
      url: `${site.url}/`,
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${site.url}/fr`,
          en: `${site.url}/en`,
          es: `${site.url}/es`,
          'x-default': `${site.url}/fr`,
        },
      },
    },
  ];

  for (const { path, priority } of basePaths) {
    const alternatesLanguages: Record<string, string> = {
      fr: `${site.url}/fr${path}`,
      en: `${site.url}/en${path}`,
      es: `${site.url}/es${path}`,
      'x-default': `${site.url}/fr${path}`,
    };

    for (const locale of locales) {
      items.push({
        url: `${site.url}/${locale}${path}`,
        priority: locale === defaultLocale ? priority : Math.max(0.1, Number((priority * 0.9).toFixed(2))),
        alternates: {
          languages: alternatesLanguages,
        },
      });
    }
  }

  return items;
}
