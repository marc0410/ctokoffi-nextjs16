'use client';

import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { gsap, useGSAP } from '@/lib/animations';
import { PublicationCards } from '@/components/sections/PublicationCards';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

const Shader = dynamic(() => import('@/components/visuals/Shader'), { ssr: false });

export function Research({ quiet, locale = 'fr' }: { quiet: boolean; locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const dict = getDictionary(locale);

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
        <span className="mono section-eyebrow">{dict.research.eyebrow}</span>
        <span className="research-status mono">
          <i />{' '}
          {locale === 'en'
            ? 'ONGOING RESEARCH'
            : locale === 'es'
              ? 'INVESTIGACIÓN EN CURSO'
              : 'RECHERCHE EN COURS'}
        </span>
      </div>
      <div className="research-intro reveal">
        <h2>
          {dict.research.titleLine1}
          <br />
          <span>{dict.research.titleLine2}</span>
        </h2>
        <p>
          {locale === 'en'
            ? 'A high predictive score does not guarantee a faithful explanation. My research investigates explanation faithfulness and constitutional oversight in hybrid ML-RAG architectures.'
            : locale === 'es'
              ? 'Una alta predicción no garantiza una explicación fiel. Mis investigaciones exploran la fidelidad explicativa y la supervisión constitucional en arquitecturas híbridas ML-RAG.'
              : 'Un bon score ne garantit pas une bonne explication. Mes travaux explorent la fidélité des explications et la supervision des systèmes hybrides ML-RAG dans la finance.'}
        </p>
      </div>
      <div className="research-main">
        <div className="research-diagram">
          <Suspense fallback={null}>{!quiet && <Shader quiet={quiet} />}</Suspense>
          <span className="mono diagram-label">CONSTITUTIONAL OVERSIGHT</span>
          <div className="architecture">
            <div className="architecture-input">
              <span>
                {locale === 'en'
                  ? 'MOBILE MONEY TELEMETRY'
                  : locale === 'es'
                    ? 'DATOS MOBILE MONEY'
                    : 'DONNÉES MOBILE MONEY'}
              </span>
              <span className="flow-line" />
            </div>
            <div className="architecture-models">
              <div>
                <span className="mono">01 / ML PREDICTION</span>
                <strong>XGBOOST</strong>
                <small>Probability of default</small>
              </div>
              <div>
                <span className="mono">02 / INTERPRETABILITY</span>
                <strong>TREESHAP</strong>
                <small>Local feature attributions</small>
              </div>
              <div>
                <span className="mono">03 / GROUNDED RAG</span>
                <strong>LLAMAINDEX + CLAUDE</strong>
                <small>Attribution-anchored explanation</small>
              </div>
            </div>
            <div className="architecture-referee">
              <span className="mono">04 / CONSTITUTIONAL REFEREE</span>
              <p>
                {locale === 'en'
                  ? 'Audit hallucination, demographic disparity and counterfactual consistency against the financial charter.'
                  : locale === 'es'
                    ? 'Auditoría de alucinaciones, disparidad demográfica y coherencia contrafactual según la constitución financiera.'
                    : 'Audite hallucination, disparité démographique et cohérence contrefactuelle face à la charte financière.'}
              </p>
              <div className="checks mono">
                <span>FAITHFULNESS ✓</span>
                <span>NON-DISCRIMINATION ✓</span>
                <span>RECUBERATION ✓</span>
              </div>
            </div>
            <div className="architecture-human">
              <span className="mono">05 / HUMAN OVERSIGHT</span>
              <p>
                {locale === 'en'
                  ? 'Credit committee with transparent reasoning chain, Shapley attributions, and source telemetry.'
                  : locale === 'es'
                    ? 'Comité de crédito con cadena de razonamiento transparente, atribuciones Shapley y telemetría de origen.'
                    : 'Comité de crédit avec chaîne de raisonnement transparente, attributions Shapley et données sources.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PublicationCards locale={locale} />
    </section>
  );
}
