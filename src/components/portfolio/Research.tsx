'use client';
import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Plus, ShieldCheck } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/animations';
import { PublicationCards } from '@/components/sections/PublicationCards';
import { Arrow } from '@/components/ui/Arrow';
const Shader = dynamic(() => import('@/components/visuals/Shader'), { ssr: false });
export function Research({ quiet }: { quiet: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  useGSAP(
    () => {
      move.current = {
        x: gsap.quickTo(ref.current, '--x', { duration: 0.35, ease: 'power3.out' }),
        y: gsap.quickTo(ref.current, '--y', { duration: 0.35, ease: 'power3.out' }),
      };
    },
    { scope: ref },
  );
  return (
    <section id="recherche" className="research-section section-pad">
      <div className="research-heading reveal">
        <span className="mono section-eyebrow">03 / RESEARCH & AI SAFETY</span>
        <span className="research-status mono">
          <i /> RECHERCHE EN COURS
        </span>
      </div>
      <div className="research-intro reveal">
        <h2>
          Une IA performante.
          <br />
          <span>Et digne de confiance.</span>
        </h2>
        <p>
          Un bon score ne garantit pas une bonne explication. Mes travaux explorent la fidélité des
          explications et la supervision des systèmes hybrides ML-RAG dans la finance.
        </p>
      </div>
      <div className="research-main">
        <div className="research-diagram">
          <Suspense fallback={null}>{!quiet && <Shader quiet={quiet} />}</Suspense>
          <span className="mono diagram-label">CONSTITUTIONAL OVERSIGHT</span>
          <div className="architecture">
            <div className="architecture-input">
              <span>DONNÉES MOBILE MONEY</span>
              <span className="flow-line" />
            </div>
            <div className="architecture-models">
              <div>
                <span className="mono">01 / PREDICT</span>
                <b>Machine Learning</b>
                <small>XGBoost + SHAP</small>
              </div>
              <span>→</span>
              <div>
                <span className="mono">02 / EXPLAIN</span>
                <b>Grounded RAG</b>
                <small>LlamaIndex + LLM</small>
              </div>
            </div>
            <span className="flow-line" />
            <div className="constitution">
              <ShieldCheck size={21} />
              <div>
                <b>Financial Constitution</b>
                <small>Règles explicites · Fidélité · Équité</small>
              </div>
            </div>
            <div className="architecture-bottom">
              <span>AI ARBITER</span>
              <span>↔</span>
              <span>HUMAN OVERSIGHT</span>
            </div>
          </div>
          <span className="mono diagram-foot">CADRE DE RECHERCHE PROPOSÉ / 2026</span>
        </div>
        <div className="research-copy">
          <span className="mono tiny-label">DU MÉMOIRE AU PROJET DOCTORAL</span>
          <h3>
            Qui supervise
            <br />
            l’intelligence artificielle ?
          </h3>
          <p>
            Mon mémoire de M2 porte sur un pipeline MLOps de scoring de crédit contextuel. Il a fait
            émerger une question centrale : les explications restent-elles fidèles lorsque les
            profils démographiques changent ?
          </p>
          <p>
            Je propose un cadre à trois niveaux : une constitution financière lisible par machine,
            un arbitre IA et une supervision humaine déclenchée en cas de violation.
          </p>
          <div className="research-pills">
            <span>Explanation Faithfulness</span>
            <span>Constitutional AI</span>
            <span>Scalable Oversight</span>
          </div>
          <a
            className="text-link"
            href="https://zenodo.org/records/19955522"
            target="_blank"
            rel="noreferrer"
          >
            Lire la publication <Arrow />
          </a>
          <small className="publication-note">
            Prépublication · Zenodo · 1 mai 2026
            <br />
            DOI : 10.5281/zenodo.19955522
          </small>
        </div>
      </div>
      <PublicationCards />
      <div
        className="manifesto"
        ref={ref}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          move.current?.x(e.clientX - r.left);
          move.current?.y(e.clientY - r.top);
        }}
      >
        <div className="manifesto-base">
          <span className="mono">THE HUMAN IN THE LOOP</span>
          <p>
            La technologie avance.
            <br />
            La confiance se <em>construit.</em>
          </p>
        </div>
        <div className="manifesto-hidden" aria-hidden="true">
          <span className="mono">THE HUMAN IN THE LOOP</span>
          <p>
            La technologie avance.
            <br />
            L’humain reste <em>au centre.</em>
          </p>
        </div>
        <span className="mono manifesto-hint">
          SURVOLEZ POUR VOIR AU-DELÀ <Plus size={14} />
        </span>
      </div>
    </section>
  );
}
