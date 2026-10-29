'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { getLocalizedArticles } from '@/content/i18n-content';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import { KineticText } from './KineticText';
import type { CSSVariables } from '@/types/content';

export function Journal({ quiet, locale = 'fr' }: { quiet: boolean; locale?: Locale }) {
  const articles = getLocalizedArticles(locale);
  const dict = getDictionary(locale);

  const [filter, setFilter] = useState('ALL');

  const categories = [
    { key: 'ALL', label: dict.projects.filterAll },
    { key: 'Engineering', label: 'Engineering' },
    { key: 'Architecture', label: 'Architecture' },
    { key: 'Recherche', label: locale === 'en' ? 'Research' : locale === 'es' ? 'Investigación' : 'Recherche' },
  ];

  const list = articles.filter((a) => {
    if (filter === 'ALL') return true;
    return a.category === filter;
  });

  return (
    <section id="journal" className="journal-section section-pad">
      <div className="section-heading">
        <div>
          <span className="mono section-eyebrow">{dict.journal.eyebrow}</span>
          <KineticText>
            {locale === 'en'
              ? 'Code builds.\nIdeas travel.'
              : locale === 'es'
                ? 'El código construye.\nLas ideas circulan.'
                : 'Le code construit.\nLes idées circulent.'}
          </KineticText>
        </div>
        <div className="section-heading-right">
          <p>
            {locale === 'en'
              ? 'Engineering essays, product philosophies, and research inquiries.'
              : locale === 'es'
                ? 'Notas de ingeniería, convicciones de producto y preguntas de investigación.'
                : 'Notes d’ingénierie, convictions produit et questions de recherche.'}
          </p>
          <div className="filter-bar" aria-label="Filtrer les articles">
            {categories.map((c) => (
              <button
                aria-pressed={c.key === filter}
                key={c.key}
                className={c.key === filter ? 'active' : ''}
                onClick={() => setFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <motion.div layout={!quiet} className="journal-grid">
        <AnimatePresence initial={false}>
          {list.map((a) => {
            const articleHref = `/${locale}/journal/${a.slug}`;

            return (
              <motion.article
                layout={!quiet}
                key={a.slug}
                className="journal-card"
                initial={{ opacity: 0, y: quiet ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: quiet ? 1 : 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  className={'note-art note-' + a.theme}
                  href={articleHref}
                  aria-label={'Lire : ' + a.title}
                >
                  <span className="mono">K / FIELD NOTES</span>
                  <div aria-hidden="true">
                    {a.theme === 'field' ? (
                      <>
                        <i className="field-cross" />
                        <span className="art-keyword">
                          From context
                          <br />
                          to code.
                        </span>
                      </>
                    ) : a.theme === 'scale' ? (
                      <>
                        <div className="scale-blocks">
                          {Array.from({ length: 5 }, (_, i) => (
                            <i key={i} style={{ '--n': i } as CSSVariables} />
                          ))}
                        </div>
                        <span className="art-keyword">
                          Built to
                          <br />
                          evolve.
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="trust-orbits">
                          <i />
                          <i />
                          <i />
                        </div>
                        <span className="art-keyword">
                          Beyond
                          <br />
                          the score.
                        </span>
                      </>
                    )}
                  </div>
                  <span className="note-art-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </Link>
                <div className="note-meta mono">
                  <span>{a.category}</span>
                  <span>{a.readTime.toUpperCase()} {dict.journal.readingTime.toUpperCase()}</span>
                </div>
                <h3>
                  <Link href={articleHref}>{a.title}</Link>
                </h3>
                <p>{a.excerpt}</p>
                <Link className="note-link" href={articleHref}>
                  {dict.journal.readArticle} <ArrowUpRight size={16} />
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
