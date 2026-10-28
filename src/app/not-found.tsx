import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-mono text-xs text-accent">404 / PAGE INTROUVABLE</span>
      <h1 className="text-4xl tracking-tight md:text-6xl">Un autre chemin ?</h1>
      <Link href="/" className="rounded-full bg-accent px-7 py-4 text-sm text-black">
        Retour au portfolio ↗
      </Link>
    </main>
  );
}
