'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
export function ShareArticle() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus('copied');
    } catch {
      setStatus('manual');
    }
  }
  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-xs transition-colors hover:bg-black/5"
        aria-label="Copier le lien de cet article"
      >
        {status === 'copied' ? <Check size={14} /> : <Copy size={14} />}
        <span>{status === 'copied' ? 'Lien copié' : 'Partager'}</span>
      </button>
      <span role="status" className="max-w-52 text-right text-xs text-black/60">
        {status === 'manual' ? 'Copiez le lien dans la barre d’adresse.' : ''}
      </span>
    </div>
  );
}
