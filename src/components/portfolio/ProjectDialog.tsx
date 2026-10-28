'use client';
import { useRef, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Arrow } from '@/components/ui/Arrow';
import { site } from '@/content/site';
import type { Project } from '@/types/content';
const email = site.email;
export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const previous = document.activeElement as HTMLElement | null;
    d.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      className="project-dialog"
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-inner">
        <button className="circle-btn dialog-close" onClick={onClose} aria-label="Fermer le projet">
          <X />
        </button>
        <div className="mono section-eyebrow">
          {project.type} / {project.year}
        </div>
        <h2 id="dialog-title">
          {project.name}
          <span>↗</span>
        </h2>
        <p className="dialog-subtitle">{project.subtitle}</p>
        <div className="dialog-meta">
          <span>{project.role}</span>
          <span>{project.tags.join(' · ')}</span>
        </div>
        <div className="dialog-metrics">
          {project.metrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="case-body">
          {[
            ['Le défi', project.challenge],
            ['L’approche', project.approach],
            ['Le résultat', project.outcome],
          ].map(([title, desc], i) => (
            <section key={title}>
              <span className="mono">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </section>
          ))}
        </div>
        <div className="dialog-bottom">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer" className="text-link">
              Visiter la présentation <ExternalLink size={15} />
            </a>
          ) : (
            <span className="mono">CONCEPTION · ARCHITECTURE · IMPACT</span>
          )}
          <a
            href={`mailto:${email}?subject=${encodeURIComponent('Échange à propos de ' + project.name)}`}
            className="text-link"
          >
            Parlons de ce projet <Arrow />
          </a>
        </div>
      </div>
    </dialog>
  );
}
