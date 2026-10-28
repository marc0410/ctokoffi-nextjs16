import type { Metadata } from 'next';
import Link from 'next/link';
import { Journal } from '@/components/sections/Journal';
export const metadata: Metadata = {
  title: 'Journal — Engineering, architecture & recherche',
  description:
    'Notes personnelles de Kan Marc-Ephrem Koffi : Forward Deployed Engineering, croissance des plateformes et AI Safety.',
  alternates: { canonical: '/journal' },
};
export default function JournalPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/15 px-6 py-8 md:px-12">
        <Link href="/" className="wordmark">
          koffi<span>®</span>
        </Link>
        <Link
          href="/#journal"
          className="font-mono text-xs text-accent transition-colors hover:text-white"
        >
          ← Retour au portfolio
        </Link>
      </header>
      <Journal quiet={false} />
      <footer className="px-6 pb-12 text-center text-xs text-white/50">
        Notes personnelles · Kan Marc-Ephrem Koffi
      </footer>
    </main>
  );
}
