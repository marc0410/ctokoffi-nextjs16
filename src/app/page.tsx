import type { Metadata } from 'next';
import Portfolio from '@/components/portfolio/Portfolio';
import { site } from '@/content/site';
export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'CTO · Forward Deployed Engineer · AI/ML Engineer',
    url: site.url,
    sameAs: [site.github, site.linkedin],
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
