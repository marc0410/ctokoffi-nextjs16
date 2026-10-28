import type { Metadata } from 'next';
import Portfolio from '@/components/portfolio/Portfolio';
import { site } from '@/content/site';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  const person = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: 'fr',
      },
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        alternateName: site.alternateName,
        jobTitle: ['Chief Technology Officer', 'Forward Deployed Engineer', 'AI/ML Engineer'],
        url: `${site.url}/a-propos`,
        homeLocation: { '@type': 'Place', name: site.location },
        sameAs: [site.github, site.linkedin],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
      />
      <Portfolio />
    </>
  );
}
