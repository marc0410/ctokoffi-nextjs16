'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grip, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Arrow } from '@/components/ui/Arrow';
import { ProjectArt } from './ProjectArt';
import { getLocalizedProjects } from '@/content/i18n-content';
import { projectPages } from '@/content/seo';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { Project, CSSVariables } from '@/types/content';

export function ProjectGallery({
  onOpen,
  quiet,
  locale = 'fr',
}: {
  onOpen: (project: Project) => void;
  quiet: boolean;
  locale?: Locale;
}) {
  const projects = getLocalizedProjects(locale);
  const dict = getDictionary(locale);

  const [filter, setFilter] = useState('ALL');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const filtered = projects.filter((p) => {
    if (filter === 'ALL') return true;
    if (filter === 'AI' || filter === 'IA') return p.category === 'IA';
    if (filter === 'PRODUCT' || filter === 'PRODUIT') return p.category === 'Produit';
    if (filter === 'WEB3') return p.category === 'Web3';
    return true;
  });

  const active = filtered[index] || filtered[0];

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + filtered.length) % filtered.length);
  };

  const setCategory = (v: string) => {
    setFilter(v);
    setIndex(0);
    setDirection(1);
  };

  const categories = [
    { key: 'ALL', label: dict.projects.filterAll },
    { key: 'AI', label: locale === 'en' ? 'AI' : 'IA' },
    { key: 'PRODUCT', label: locale === 'en' ? 'Product' : locale === 'es' ? 'Producto' : 'Produit' },
    { key: 'WEB3', label: 'Web3' },
  ];

  return (
    <section className="projects-section section-pad" id="projets">
      <div className="section-heading reveal">
        <div>
          <span className="mono section-eyebrow">{dict.projects.eyebrow}</span>
          <h2>
            {dict.projects.titleLine1}
            <br />
            <span className="muted">{dict.projects.titleLine2}</span>
          </h2>
        </div>
        <div className="section-heading-right">
          <p>{dict.projects.subtitle}</p>
          <div className="filter-bar" aria-label="Filtrer les projets">
            {categories.map((c) => (
              <button
                key={c.key}
                className={filter === c.key ? 'active' : ''}
                aria-pressed={filter === c.key}
                onClick={() => setCategory(c.key)}
                data-analytics-event="filter_projects"
                data-analytics-category="project_filter"
                data-analytics-label={c.label}
              >
                {c.label}
                {c.key === 'ALL' && <sup>{String(projects.length).padStart(2, '0')}</sup>}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="project-stage"
        tabIndex={0}
        aria-label="Galerie de projets. Utilisez les flèches gauche et droite."
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(1);
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(-1);
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            className="project-slide"
            initial={{ opacity: 0, x: quiet ? 0 : direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: quiet ? 0 : -direction * 24 }}
            transition={{ duration: quiet ? 0 : 0.28 }}
            drag={quiet ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1);
            }}
          >
            <div
              className="project-visual"
              style={{ '--project-color': active.color } as CSSVariables}
            >
              <ProjectArt id={active.id} />
              <button
                className="project-open"
                onClick={() => onOpen(active)}
                aria-label={`Découvrir le projet ${active.name}`}
                data-analytics-event="project_modal_open"
                data-analytics-category="portfolio"
                data-analytics-label={active.name}
                data-analytics-project={active.id}
              >
                <Arrow size={24} />
              </button>
            </div>
            <div className="project-copy">
              <div className="project-top mono">
                <span>{active.type}</span>
                <span>
                  {String(projects.indexOf(active) + 1).padStart(2, '0')} /{' '}
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3>
                  {active.name}
                  <span>®</span>
                </h3>
                <p className="project-subtitle">{active.subtitle}</p>
                <p className="project-description">{active.summary}</p>
                <div className="tags">
                  {active.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-copy-bottom">
                {active.url ? (
                  <a
                    className="project-site-link mono"
                    href={active.url}
                    target="_blank"
                    rel="noreferrer"
                    data-analytics-event="project_external_visit"
                    data-analytics-category="portfolio"
                    data-analytics-label={active.name}
                    data-analytics-project={active.id}
                  >
                    {dict.projects.visitSite} <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="mono">{active.year}</span>
                )}
                <a
                  className="text-link"
                  href={`/${locale}/projets/${projectPages.find((p) => p.id === active.id)?.slug}`}
                  data-analytics-event="case_study_click"
                  data-analytics-category="portfolio"
                  data-analytics-label={active.name}
                  data-analytics-project={active.id}
                >
                  {dict.projects.readCase} <Arrow />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="gallery-bottom">
        <span className="mono gallery-hint">
          <Grip size={14} /> {dict.projects.dragHint}
        </span>
        <div className="project-thumbs" aria-label="Choisir un projet">
          {filtered.map((p, i) => (
            <button
              key={p.id}
              className={index === i ? 'active' : ''}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Afficher ${p.name}`}
              aria-pressed={index === i}
            >
              <span className="thumb-line" />
              <span className="mono">{p.name}</span>
            </button>
          ))}
        </div>
        <div className="gallery-controls">
          <button className="circle-btn" onClick={() => go(-1)} aria-label={dict.projects.prevProject}>
            <ArrowLeft size={19} />
          </button>
          <button className="circle-btn" onClick={() => go(1)} aria-label={dict.projects.nextProject}>
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
