import type { Metadata } from 'next';
import Link from 'next/link';
import { Journal } from '@/components/sections/Journal';
import { pageMetadata } from '@/lib/seo';
export const metadata: Metadata = pageMetadata(
  'Journal — Engineering, architecture & recherche',

  'Notes personnelles de Koffi Kan Marc-Ephrem : Forward Deployed Engineering, croissance des plateformes et AI Safety.',
  '/journal',
);
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
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-12">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Journal de Koffi Kan Marc-Ephrem
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
          Notes de terrain sur le Forward Deployed Engineering, l’architecture des plateformes et la
          recherche en intelligence artificielle explicable.
        </p>
      </div>
      <Journal quiet={false} />
      <footer className="px-6 pb-12 text-center text-xs text-white/50">
        Notes personnelles · Kan Marc-Ephrem Koffi
      </footer>
    </main>
  );
}
