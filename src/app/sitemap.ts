import type { MetadataRoute } from 'next';
import { articles } from '@/content/journal';
import { projectPages, researchSlugs } from '@/content/seo';
import { site } from '@/content/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path = '') =>
    `${site.url}${path}${process.env.STATIC_EXPORT === 'true' && path ? '/' : ''}`;
  return [
    { url: `${site.url}/`, priority: 1 },
    { url: url('/a-propos'), priority: 0.9 },
    { url: url('/projets'), priority: 0.9 },
    ...projectPages.map((project) => ({
      url: url(`/projets/${project.slug}`),
      priority: 0.8,
    })),
    { url: url('/recherche'), priority: 0.8 },
    ...Object.values(researchSlugs).map((slug) => ({
      url: url(`/recherche/${slug}`),
      priority: 0.8,
    })),
    { url: url('/journal'), priority: 0.8 },
    ...articles.map((a) => ({ url: url(`/journal/${a.slug}`), priority: 0.7 })),
    { url: url('/contact'), priority: 0.6 },
  ];
}
