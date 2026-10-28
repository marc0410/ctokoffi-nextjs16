import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Portfolio`,
    short_name: site.brand,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#101110',
    theme_color: '#101110',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
