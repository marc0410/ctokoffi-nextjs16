import { redirect } from 'next/navigation';
import { projectPages } from '@/content/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectPages.map(({ slug }) => ({ slug }));
}

export default async function LegacyProjectSlugPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/fr/projets/${slug}`);
}
