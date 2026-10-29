'use client';

import { ShieldCheck, ArrowUpRight, Download } from 'lucide-react';
import { getLocalizedPublications } from '@/content/i18n-content';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { CSSVariables } from '@/types/content';

export function PublicationCards({ locale = 'fr' }: { locale?: Locale }) {
  const publications = getLocalizedPublications(locale);
  const dict = getDictionary(locale);

  return (
    <div className="publications">
      <div className="publications-heading">
        <span className="mono">{dict.research.openPubs}</span>
        <span className="mono">{dict.research.preprintsZenodo}</span>
      </div>
      <div className="publication-grid">
        {publications.map((p, i) => {
          const researchSlug =
            p.id === 'constitutional-oversight'
              ? 'constitutional-oversight-ml-rag'
              : 'holistic-life-scoring';
          const researchHref = `/${locale}/recherche/${researchSlug}`;

          return (
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
                  <a href={researchHref}>{p.title}</a>
                </h3>
                <p>{p.summary}</p>
                <div className="paper-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="paper-links">
                  <a
                    href={researchHref}
                    className="text-link"
                    data-analytics-event="research_view"
                    data-analytics-category="research"
                    data-analytics-label={p.shortTitle}
                  >
                    {dict.research.readSummary} <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                    data-analytics-event="zenodo_click"
                    data-analytics-category="research"
                    data-analytics-label={p.shortTitle}
                  >
                    {dict.research.readZenodo} <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={p.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="paper-pdf"
                    aria-label={`${dict.research.openPdf} ${p.shortTitle}`}
                    data-analytics-event="pdf_download"
                    data-analytics-category="research"
                    data-analytics-label={p.shortTitle}
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
                  {dict.research.doiLabel} / {p.doi}
                </a>
                <small>{p.status}</small>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
