'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Layers,
  GitBranch,
  Activity,
  Workflow,
  Radio,
} from 'lucide-react';
import { KineticText } from './KineticText';
import type { Locale } from '@/i18n/config';

export function FieldEngineering({ quiet, locale = 'fr' }: { quiet: boolean; locale?: Locale }) {
  const [step, setStep] = useState(0);

  const stepsData = {
    fr: [
      {
        title: 'Comprendre',
        label: '01 / TERRAIN',
        icon: MapPin,
        text: 'Observer les usages, parler aux équipes et identifier le problème derrière la demande.',
        output: 'Un problème clairement formulé.',
        nodes: ['Utilisateurs', 'Processus métier', 'Contraintes terrain'],
        focus: 'Cadrage & usages',
      },
      {
        title: 'Construire',
        label: '02 / BUILD',
        icon: Layers,
        text: 'Traduire le besoin en un parcours utile. Prototyper, intégrer les données et relier les systèmes existants.',
        output: 'Une solution intégrée de bout en bout.',
        nodes: ['Interfaces', 'APIs métier', 'Données & IA'],
        focus: 'Produit & intégration',
      },
      {
        title: 'Déployer',
        label: '03 / SHIP',
        icon: GitBranch,
        text: 'Préparer la livraison, les scénarios d’erreur et la reprise. Mettre la solution entre les mains de ses utilisateurs.',
        output: 'Une mise en production maîtrisée.',
        nodes: ['Validation', 'CI/CD', 'Production'],
        focus: 'Livraison & fiabilité',
      },
      {
        title: 'Faire évoluer',
        label: '04 / SCALE',
        icon: Activity,
        text: 'Observer les usages, suivre les performances et ajuster l’architecture au rythme de la croissance.',
        output: 'Un système qui évolue avec le produit.',
        nodes: ['Observabilité', 'Retours terrain', 'Itérations'],
        focus: 'Mesure & croissance',
      },
    ],
    en: [
      {
        title: 'Understand',
        label: '01 / FIELD',
        icon: MapPin,
        text: 'Observe real user workflows, interview operational teams, and isolate the root business problem.',
        output: 'A decisively framed problem.',
        nodes: ['End-users', 'Business workflows', 'Field constraints'],
        focus: 'Scoping & ergonomics',
      },
      {
        title: 'Build',
        label: '02 / BUILD',
        icon: Layers,
        text: 'Transform requirements into intuitive workflows. Prototype rapidly, ingest data, and bridge existing legacy systems.',
        output: 'An end-to-end integrated solution.',
        nodes: ['Interfaces', 'Domain APIs', 'Data & AI'],
        focus: 'Product & integration',
      },
      {
        title: 'Ship',
        label: '03 / SHIP',
        icon: GitBranch,
        text: 'Engineer delivery pipelines, failover scenarios, and telemetry. Place software directly in the hands of real users.',
        output: 'A resilient production rollout.',
        nodes: ['Validation', 'CI/CD', 'Production'],
        focus: 'Delivery & reliability',
      },
      {
        title: 'Scale',
        label: '04 / SCALE',
        icon: Activity,
        text: 'Track telemetry, monitor latency and failure modes, and adapt system architecture alongside business growth.',
        output: 'An architecture evolving with demand.',
        nodes: ['Observability', 'Field feedback', 'Iterative sprints'],
        focus: 'Telemetry & scaling',
      },
    ],
    es: [
      {
        title: 'Comprender',
        label: '01 / TERRENO',
        icon: MapPin,
        text: 'Observar flujos reales de usuarios, entrevistar equipos operativos e identificar el problema raíz.',
        output: 'Un problema claramente formulado.',
        nodes: ['Usuarios finales', 'Procesos de negocio', 'Limitaciones de campo'],
        focus: 'Encuadre y ergonomía',
      },
      {
        title: 'Construir',
        label: '02 / CONSTRUIR',
        icon: Layers,
        text: 'Transformar requisitos en flujos intuitivos. Prototipar rápidamente, integrar datos y conectar sistemas heredados.',
        output: 'Una solución integrada de extremo a extremo.',
        nodes: ['Interfaces', 'APIs de negocio', 'Datos e IA'],
        focus: 'Producto e integración',
      },
      {
        title: 'Desplegar',
        label: '03 / DESPLEGAR',
        icon: GitBranch,
        text: 'Preparar pipelines de entrega, escenarios de contingencia y telemetría. Poner el software en manos de usuarios reales.',
        output: 'Un despliegue en producción controlado.',
        nodes: ['Validación', 'CI/CD', 'Producción'],
        focus: 'Entrega y fiabilidad',
      },
      {
        title: 'Escalar',
        label: '04 / ESCALAR',
        icon: Activity,
        text: 'Monitorear métricas, supervisar latencia y ajustar la arquitectura al ritmo del crecimiento del producto.',
        output: 'Un sistema que evoluciona con la demanda.',
        nodes: ['Observabilidad', 'Comentarios de campo', 'Iteraciones'],
        focus: 'Medición y crecimiento',
      },
    ],
  };

  const fieldSteps = stepsData[locale] || stepsData.fr;
  const current = fieldSteps[step];

  return (
    <section className="field-section section-pad" id="approche">
      <div className="field-intro">
        <div>
          <span className="mono section-eyebrow">01 / FORWARD DEPLOYED ENGINEERING</span>
          <KineticText>
            {locale === 'en'
              ? 'Deep in the field.\nAll the way to production.'
              : locale === 'es'
                ? 'Directo en el terreno.\nHasta la producción.'
                : 'Au plus près du terrain.\nJusqu’à la production.'}
          </KineticText>
        </div>
        <p>
          {locale === 'en'
            ? 'Bridging business operations with robust software engineering. From the initial discovery call to production resilience, I take full ownership of measurable outcomes.'
            : locale === 'es'
              ? 'Conectando operaciones de negocio con ingeniería de software robusta. Desde la primera conversación hasta la resiliencia en producción, asumo la responsabilidad del resultado.'
              : 'Je relie les réalités métier à l’ingénierie. De la première conversation à l’évolution du système, je garde la responsabilité du résultat.'}
        </p>
      </div>
      <div className="field-layout">
        <div className="field-tabs" role="tablist" aria-label="Les étapes de mon approche">
          {fieldSteps.map((s, i) => (
            <button
              key={s.title}
              id={'step-tab-' + i}
              role="tab"
              aria-selected={step === i}
              aria-controls="field-panel"
              tabIndex={step === i ? 0 : -1}
              onKeyDown={(e) => {
                if (
                  ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(e.key)
                ) {
                  e.preventDefault();
                  const n =
                    e.key === 'Home'
                      ? 0
                      : e.key === 'End'
                        ? 3
                        : (step + (['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : 3)) % 4;
                  setStep(n);
                  document.getElementById('step-tab-' + n)?.focus();
                }
              }}
              onClick={() => setStep(i)}
              className={step === i ? 'active' : ''}
            >
              <span className="mono">0{i + 1}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
        <div className="field-panel-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              id="field-panel"
              role="tabpanel"
              aria-labelledby={'step-tab-' + step}
              className="field-panel"
              initial={{ opacity: 0, y: quiet ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: quiet ? 0 : -12 }}
              transition={{ duration: quiet ? 0 : 0.25 }}
            >
              <div className="panel-header">
                <span className="mono">{current.label}</span>
                <span className="mono panel-focus">FOCUS / {current.focus.toUpperCase()}</span>
              </div>
              <div className="panel-body">
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <div className="panel-output">
                  <span className="mono">
                    {locale === 'en' ? 'LIVRABLE ATTENDU' : locale === 'es' ? 'ENTREGABLE' : 'LIVRABLE'}
                  </span>
                  <strong>{current.output}</strong>
                </div>
              </div>
              <div className="panel-canvas" aria-hidden="true">
                <div className="node-grid">
                  {current.nodes.map((node, i) => (
                    <div key={node} className={'node node-' + i}>
                      <span className="node-dot" />
                      <span className="mono">{node}</span>
                    </div>
                  ))}
                  <div className="node-center">
                    <Workflow size={28} />
                    <span className="mono">FDE LOOP</span>
                  </div>
                </div>
                <div className="panel-pulse">
                  <Radio size={14} />
                  <span className="mono">
                    {locale === 'en'
                      ? 'DIRECT FIELD TELEMETRY'
                      : locale === 'es'
                        ? 'TELEMETRÍA EN VIVO'
                        : 'BOUCLE TERRAIN ACTIVE'}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
