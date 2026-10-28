'use client';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl tracking-tight">Le chargement a rencontré un problème.</h1>
      <button onClick={reset} className="rounded-full bg-accent px-7 py-4 text-sm text-black">
        Réessayer
      </button>
    </main>
  );
}
