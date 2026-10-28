'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/content/journal';
import { KineticText } from './KineticText';
import type { CSSVariables } from '@/types/content';
export function Journal({ quiet }: { quiet: boolean }) {
  const [filter, setFilter] = useState('Tous');
  const list = articles.filter((a) => filter === 'Tous' || a.category === filter);
  return (
    <section id="journal" className="journal-section section-pad">
      <div className="section-heading">
        <div>
          <span className="mono section-eyebrow">05 / FIELD NOTES</span>
          <KineticText>{'Le code construit.\nLes idées circulent.'}</KineticText>
        </div>
        <div className="section-heading-right">
          <p>
            Notes d’ingénierie, convictions produit
            <br />
            et questions de recherche.
          </p>
          <div className="filter-bar" aria-label="Filtrer les articles">
            {['Tous', 'Engineering', 'Architecture', 'Recherche'].map((f) => (
              <button
                aria-pressed={f === filter}
                key={f}
                className={f === filter ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      <motion.div layout={!quiet} className="journal-grid">
        <AnimatePresence initial={false}>
          {list.map((a) => (
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
                href={'/journal/' + a.slug}
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
                <span>{a.readTime} DE LECTURE</span>
              </div>
              <h3>
                <Link href={'/journal/' + a.slug}>{a.title}</Link>
              </h3>
              <p>{a.excerpt}</p>
              <Link className="note-link" href={'/journal/' + a.slug}>
                Lire la note <ArrowUpRight size={16} />
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
