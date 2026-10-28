'use client';
import { ShieldCheck, ArrowUpRight, Download } from 'lucide-react';
import { publications } from '@/content/journal';
import type { CSSVariables } from '@/types/content';
export function PublicationCards() {
  return (
    <div className="publications">
      <div className="publications-heading">
        <span className="mono">PUBLICATIONS OUVERTES</span>
        <span className="mono">02 PREPRINTS / ZENODO</span>
      </div>
      <div className="publication-grid">
        {publications.map((p, i) => (
          <article className="paper-card reveal" key={p.id}>
            <div className="paper-art" aria-hidden="true">
              <span className="mono">RESEARCH PAPER / 0{i + 1}</span>
              {i === 0 ? (
                <div className="paper-rings">
                  <i />
                  <i />
                  <i />
                  <ShieldCheck size={34} />
                </div>
              ) : (
                <div className="hls-orbit">
                  <span>HLS</span>
                  {['FINANCIAL', 'CIVIC', 'BEHAVIORAL', 'CONTEXTUAL'].map((t, j) => (
                    <i key={t} style={{ '--n': j } as CSSVariables}>
                      {t}
                    </i>
                  ))}
                </div>
              )}
              <span className="paper-art-title">{p.shortTitle}</span>
            </div>
            <div className="paper-content">
              <div className="paper-meta mono">
                <span>{p.category}</span>
                <time>{p.date}</time>
              </div>
              <h3>
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.title}
                </a>
              </h3>
              <p>{p.summary}</p>
              <div className="paper-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="paper-links">
                <a href={p.url} target="_blank" rel="noreferrer" className="text-link">
                  Lire sur Zenodo <ArrowUpRight size={16} />
                </a>
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="paper-pdf"
                  aria-label={'Ouvrir le PDF ' + p.shortTitle}
                >
                  <Download size={16} /> PDF
                </a>
              </div>
              <a
                className="paper-doi mono"
                href={'https://doi.org/' + p.doi}
                target="_blank"
                rel="noreferrer"
              >
                DOI / {p.doi}
              </a>
              <small>{p.status}</small>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
