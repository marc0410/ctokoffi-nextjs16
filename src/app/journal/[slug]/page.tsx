import { redirect } from 'next/navigation';
import { articles } from '@/content/journal';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export default async function LegacyJournalSlugPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/fr/journal/${slug}`);
}
