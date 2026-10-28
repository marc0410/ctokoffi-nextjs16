'use client';
import { ShieldCheck, Fingerprint, GitBranch, Plus } from 'lucide-react';
import { Arrow } from '@/components/ui/Arrow';
export function ProjectArt({ id, mini = false }: { id: string; mini?: boolean }) {
  if (id === 'fvundi')
    return (
      <div className={'project-art art-fvundi ' + (mini ? 'mini' : '')}>
        <div className="art-grid" />
        {!mini && <span className="art-label mono">FVUNDI / INTELLIGENCE EXPLICABLE</span>}
        <div className="fvundi-ui">
          <div className="mini-nav">
            <span className="brand-symbol">
              f<span>v</span>
            </span>
            <span className="mono">DECISION INTELLIGENCE</span>
            <span className="tiny-dot" />
          </div>
          <div className="score-content">
            <div>
              <span className="mono muted">DE LA DONNÉE À LA CONFIANCE</span>
              <h4>
                Comprendre.
                <br />
                Puis décider.
              </h4>
              <div className="signal">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <p className="mono">MOBILE MONEY → ML → EXPLANATION</p>
            </div>
            <div className="score-ring">
              <span>
                <ShieldCheck size={25} />
                <b>Explainable</b>
                <small>BY DESIGN</small>
              </span>
            </div>
          </div>
          <div className="ui-bottom mono">
            <span>
              <i /> Prédiction ML
            </span>
            <span>
              <i /> Attribution SHAP
            </span>
            <span>
              <i /> Explication RAG
            </span>
          </div>
        </div>
        <span className="art-foot mono">ILLUSTRATION D’ARCHITECTURE · ML + RAG</span>
      </div>
    );
  if (id === 'kvix')
    return (
      <div className="project-art art-kvix">
        <span className="kvix-brand">
          kvix<span>®</span>
        </span>
        <div className="carbon-orb">
          <i />
          <i />
          <i />
          <span>CO₂</span>
        </div>
        <div className="carbon-scale">
          {['A', 'B', 'C', 'D', 'E'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span className="art-foot mono">CONCEPT VISUEL · CARBON INTELLIGENCE</span>
      </div>
    );
  if (id === 'nalia')
    return (
      <div className="project-art art-nalia">
        <div className="nalia-disc">
          <i />
          <i />
          <i />
        </div>
        <div className="nalia-type">
          <span className="mono">EMPOWERED WOMAN</span>
          <h4>nalia.</h4>
          <p>
            Rise beyond.
            <br />
            Lead within.
          </p>
        </div>
        <span className="art-foot mono">CONCEPT VISUEL · MENTORAT & LEADERSHIP</span>
      </div>
    );
  if (id === 'rix')
    return (
      <div className="project-art art-rix">
        <div className="rx-card">
          <div className="rx-top">
            <span>rix³</span>
            <Plus size={26} />
          </div>
          <span className="mono">CONNECTED CARE</span>
          <h4>
            Un parcours.
            <br />
            Plus de clarté.
          </h4>
          <div className="rx-lines">
            <i />
            <i />
            <i />
          </div>
          <div className="rx-status">
            <ShieldCheck size={18} />
            <span>Ordonnance → Suivi → Pharmacie</span>
          </div>
        </div>
        <span className="art-foot mono">CONCEPT VISUEL · PARCOURS PHARMACEUTIQUE</span>
      </div>
    );
  if (id === 'immo')
    return (
      <div className="project-art art-immo">
        <div className="building">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="phone">
          <span className="phone-notch" />
          <b>
            immo<span>plus.</span>
          </b>
          <small>VOTRE PROCHAIN CHEZ-VOUS</small>
          <div className="property-photo">
            <div />
            <span>Abidjan, Côte d’Ivoire</span>
          </div>
          <h4>
            Un lieu.
            <br />
            Votre histoire.
          </h4>
          <div className="phone-search">
            Décrivez votre bien idéal <Arrow size={15} />
          </div>
        </div>
        <span className="art-foot mono">INTERPRÉTATION VISUELLE · PROPTECH</span>
      </div>
    );
  if (id === 'style')
    return (
      <div className="project-art art-style">
        <div className="passport">
          <span className="mono">STYLE PASS®</span>
          <h4>
            Authenticity
            <br />
            has an identity.
          </h4>
          <Fingerprint size={74} strokeWidth={0.65} />
          <div className="passport-bottom">
            <span className="mono">
              DIGITAL PRODUCT
              <br />
              PASSPORT
            </span>
            <span className="nfc">)))</span>
          </div>
        </div>
        <div className="style-orbit" />
        <span className="art-foot mono">CONCEPT VISUEL · NFC × VECHAIN</span>
      </div>
    );
  if (id === 'naturalink')
    return (
      <div className="project-art art-nature">
        <span className="nature-brand">
          naturalink<span>↗</span>
        </span>
        <div className="nature-rings">
          <i />
          <i />
          <i />
          <span>
            <GitBranch size={58} strokeWidth={1} />
          </span>
        </div>
        <span className="nature-word">Rooted in trust.</span>
        <span className="art-foot mono">CONCEPT VISUEL · TRAÇABILITÉ AGRICOLE</span>
      </div>
    );
  if (id === 'ndaya')
    return (
      <div className="project-art art-ndaya">
        <span className="ndaya-name">ndaya.</span>
        <div className="video-cards">
          <div>
            <span>01</span>
            <b>
              Culture.
              <br />
              People.
              <br />
              Commerce.
            </b>
          </div>
          <div>
            <span>02</span>
            <div className="ndaya-flower">✳</div>
            <b>
              Made for
              <br />
              connection.
            </b>
          </div>
          <div>
            <span>03</span>
            <b>
              Discover
              <br />
              your next.
            </b>
          </div>
        </div>
        <span className="art-foot mono">CONCEPT VISUEL · SOCIAL COMMERCE</span>
      </div>
    );
  return (
    <div className="project-art art-solana">
      <div className="solana-orbit" />
      <div className="wallet">
        <div className="mono">
          SOLANA / USDC <Arrow size={18} />
        </div>
        <div className="solana-logo">
          <i />
          <i />
          <i />
        </div>
        <h4>
          Move value.
          <br />
          Simply.
        </h4>
        <div className="wallet-action">
          <Fingerprint size={20} />
          <span>Authentification biométrique</span>
          <ShieldCheck size={18} />
        </div>
      </div>
      <span className="art-foot mono">CONCEPT VISUEL · PAIEMENT WEB3</span>
    </div>
  );
}
