import { redirect } from 'next/navigation';
import { researchSlugs } from '@/content/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.values(researchSlugs).map((slug) => ({ slug }));
}

export default async function LegacyResearchSlugPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/fr/recherche/${slug}`);
}
