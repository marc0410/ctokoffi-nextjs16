'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grip, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Arrow } from '@/components/ui/Arrow';
import { ProjectArt } from './ProjectArt';
import { projects } from '@/content/projects';
import { projectPages } from '@/content/seo';
import type { Project, CSSVariables } from '@/types/content';
export function ProjectGallery({
  onOpen,
  quiet,
}: {
  onOpen: (project: Project) => void;
  quiet: boolean;
}) {
  const [filter, setFilter] = useState('Tous');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const filtered = projects.filter((p) => filter === 'Tous' || p.category === filter);
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
  return (
    <section className="projects-section section-pad" id="projets">
      <div className="section-heading reveal">
        <div>
          <span className="mono section-eyebrow">02 / SELECTED WORK</span>
          <h2>
            Des idées.
            <br />
            <span className="muted">Du réel.</span>
          </h2>
        </div>
        <div className="section-heading-right">
          <p>
            De la première ligne de code
            <br />
            au produit entre les mains de milliers de personnes.
          </p>
          <div className="filter-bar" aria-label="Filtrer les projets">
            {['Tous', 'IA', 'Produit', 'Web3'].map((f) => (
              <button
                key={f}
                className={filter === f ? 'active' : ''}
                aria-pressed={filter === f}
                onClick={() => setCategory(f)}
                data-analytics-event="filter_projects"
                data-analytics-category="project_filter"
                data-analytics-label={f}
              >
                {f}
                {f === 'Tous' && <sup>{String(projects.length).padStart(2, '0')}</sup>}
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
                    VISITER LE SITE <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="mono">{active.year}</span>
                )}
                <a
                  className="text-link"
                  href={`/projets/${projectPages.find((p) => p.id === active.id)?.slug}`}
                  data-analytics-event="case_study_click"
                  data-analytics-category="portfolio"
                  data-analytics-label={active.name}
                  data-analytics-project={active.id}
                >
                  Lire l’étude de cas <Arrow />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="gallery-bottom">
        <span className="mono gallery-hint">
          <Grip size={14} /> GLISSER POUR EXPLORER
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
          <button className="circle-btn" onClick={() => go(-1)} aria-label="Projet précédent">
            <ArrowLeft size={19} />
          </button>
          <button className="circle-btn" onClick={() => go(1)} aria-label="Projet suivant">
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
