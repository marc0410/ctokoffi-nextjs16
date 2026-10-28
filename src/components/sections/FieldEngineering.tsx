'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Layers,
  GitBranch,
  Activity,
  ShieldCheck,
  Workflow,
  Radio,
} from 'lucide-react';
import { KineticText } from './KineticText';
const fieldSteps = [
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
];
export function FieldEngineering({ quiet }: { quiet: boolean }) {
  const [step, setStep] = useState(0);
  const current = fieldSteps[step];
  return (
    <section className="field-section section-pad" id="approche">
      <div className="field-intro">
        <div>
          <span className="mono section-eyebrow">01 / FORWARD DEPLOYED ENGINEERING</span>
          <KineticText>{'Au plus près du terrain.\nJusqu’à la production.'}</KineticText>
        </div>
        <p>
          Je relie les réalités métier à l’ingénierie.
          <br />
          De la première conversation à l’évolution du système, je garde la responsabilité du
          résultat.
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
              <ArrowUpRight size={19} />
            </button>
          ))}
        </div>
        <div
          className="field-panel"
          id="field-panel"
          role="tabpanel"
          aria-labelledby={'step-tab-' + step}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: quiet ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: quiet ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="field-panel-top">
                <span className="mono">{current.label}</span>
                <current.icon size={24} strokeWidth={1} />
              </div>
              <h3>{current.focus}</h3>
              <p>{current.text}</p>
              <div className="field-flow" aria-label="Enchaînement de l’étape">
                {current.nodes.map((node, i) => (
                  <React.Fragment key={node}>
                    <div>
                      <span className="flow-led" />
                      <span>{node}</span>
                    </div>
                    {i < 2 && <ArrowRight size={16} />}
                  </React.Fragment>
                ))}
              </div>
              <div className="field-output">
                <span className="mono">RÉSULTAT ATTENDU</span>
                <span>{current.output}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="architecture-principles">
        <div>
          <ShieldCheck size={20} />
          <h3>Robustesse</h3>
          <p>Anticiper les échecs et rendre les flux traçables.</p>
        </div>
        <div>
          <Workflow size={20} />
          <h3>Évolutivité</h3>
          <p>Des responsabilités claires pour faire évoluer chaque couche.</p>
        </div>
        <div>
          <Radio size={20} />
          <h3>Observabilité</h3>
          <p>Voir les erreurs, la latence et les coûts pour décider.</p>
        </div>
        <div>
          <GitBranch size={20} />
          <h3>Vitesse de livraison</h3>
          <p>Des changements fréquents, maîtrisés et réversibles.</p>
        </div>
      </div>
    </section>
  );
}
