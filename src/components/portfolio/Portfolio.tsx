'use client';
import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowDown,
  Download,
  Plus,
  Minus,
  X,
  Menu,
  Copy,
  Check,
  Pause,
  Play,
  ShieldCheck,
  AudioLines,
  Layers,
  Globe,
} from 'lucide-react';
import { gsap, useGSAP } from '@/lib/animations';
import { experience, skillGroups } from '@/content/projects';
import { articles } from '@/content/journal';
import { site } from '@/content/site';
import type { Project } from '@/types/content';
import { Arrow } from '@/components/ui/Arrow';
import { Preloader } from './Preloader';
import { ProjectDialog } from './ProjectDialog';
import { ProjectGallery } from './ProjectGallery';
import { Research } from './Research';
import { Impact } from '@/components/sections/Impact';
import { FieldEngineering } from '@/components/sections/FieldEngineering';
import { Journal } from '@/components/sections/Journal';
const Scene = dynamic(() => import('@/components/visuals/SplineScene'), {
  ssr: false,
  loading: () => <div className="scene-loading" />,
});
const ParticleField = dynamic(() => import('@/components/visuals/Particles'), { ssr: false });
const email = site.email;
const cv = site.cv;
const links = [
  ['projets', 'Projets'],
  ['approche', 'Approche'],
  ['recherche', 'Recherche'],
  ['journal', 'Journal'],
];
export default function Portfolio() {
  const [quiet, setQuiet] = useState(false);
  const [intro, setIntro] = useState(true);
  const [introKey, setIntroKey] = useState(0);
  const [menu, setMenu] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [modal, setModal] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const router = useRouter();
  const finishIntro = useCallback(() => setIntro(false), []);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setQuiet(media.matches);
    if (media.matches) setIntro(false);
    const update = () => setQuiet(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const slug = window.location.hash.startsWith('#journal/') ? window.location.hash.slice(9) : '';
    if (articles.some((a) => a.slug === slug)) router.replace('/journal/' + slug);
  }, [router]);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting));
    if (hero.current) observer.observe(hero.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('quiet', quiet);
    return () => document.documentElement.classList.remove('quiet');
  }, [quiet]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        });
      },
      { rootMargin: '-15% 0px -55% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [menu]);
  useGSAP(
    () => {
      if (intro) return;
      if (quiet) {
        gsap.set('.hero-reveal,.reveal', { clearProps: 'all' });
        return;
      }
      gsap.from('.hero-reveal', {
        y: 45,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.utils
        .toArray<HTMLElement>('.reveal')
        .forEach((el) =>
          gsap.from(el, {
            y: 34,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 91%', once: true },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>('.kinetic-title')
        .forEach((el) =>
          gsap.from(el.querySelectorAll('.kinetic-word'), {
            yPercent: 110,
            rotate: 2,
            opacity: 0,
            duration: 0.85,
            stagger: 0.065,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>('.paper-art,.note-art')
        .forEach((el) =>
          gsap.fromTo(
            el,
            { backgroundPosition: '50% 0%' },
            {
              backgroundPosition: '50% 100%',
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
            },
          ),
        );
      gsap.to('.hero-word', {
        yPercent: 15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root, dependencies: [intro, quiet], revertOnUpdate: true },
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopyError(true);
    }
  }
  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIntroKey((k) => k + 1);
    setIntro(true);
  };
  return (
    <MotionConfig reducedMotion={quiet ? 'always' : 'user'}>
      <div ref={root} className="site-shell">
        {intro && <Preloader key={introKey} done={finishIntro} />}
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <header className="header">
          <a className="wordmark" href="#accueil" aria-label="Koffi — Accueil">
            {site.brand}
            <span>®</span>
          </a>
          <nav aria-label="Navigation principale" className={menu ? 'main-nav open' : 'main-nav'}>
            {links.map(([id, label]) => (
              <a
                href={'#' + id}
                className={activeNav === id ? 'active' : ''}
                onClick={() => setMenu(false)}
                key={id}
              >
                {label}
                <span>↗</span>
              </a>
            ))}
            <a href="#contact" className="mobile-contact" onClick={() => setMenu(false)}>
              Contact ↗
            </a>
          </nav>
          <div className="header-actions">
            <span className="location mono">
              <i /> ABIDJAN, CI
            </span>
            <a className="contact-btn" href="#contact">
              Parlons ensemble <Arrow size={16} />
            </a>
            <button
              className="menu-btn"
              aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        <main id="main">
          <section className="hero" id="accueil" ref={hero}>
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-meta hero-reveal mono">
              <span>PORTFOLIO — 2026</span>
              <span>TECHNOLOGY WITH INTENTION.</span>
            </div>
            <div className="hero-main">
              <div className="hero-text">
                <div className="hero-byline hero-reveal">
                  <span className="tiny-plus">✳</span>
                  <span>{site.name.toUpperCase()}</span>
                </div>
                <h1 className="hero-word">
                  <span className="hero-reveal">Engineering</span>
                  <span className="hero-reveal accent">tomorrow.</span>
                </h1>
                <div className="hero-description hero-reveal">
                  <span className="mono hero-number">[01—∞]</span>
                  <div>
                    <p>
                      Du terrain à la production.
                      <br />
                      Des produits utiles. Une IA digne de confiance.
                    </p>
                    <span className="mono role-label">CTO · FORWARD DEPLOYED ENGINEER · AI/ML</span>
                  </div>
                </div>
                <div className="hero-cta hero-reveal">
                  <a href="#projets" className="pill-btn primary">
                    Explorer mes projets <ArrowDown size={17} />
                  </a>
                  <a href={cv} download className="cv-link">
                    Mon CV <Download size={15} />
                  </a>
                </div>
              </div>
              <div className="scene-wrap hero-reveal">
                <div className="scene-aura" />
                <Suspense fallback={<div className="scene-loading" />}>
                  {heroVisible && <Scene quiet={quiet || intro} />}
                </Suspense>
                <div className="scene-caption mono">
                  <span className="crosshair">+</span>
                  <span>
                    HUMAN INTENT
                    <br />× MACHINE INTELLIGENCE
                  </span>
                  <span className="scene-coord">
                    05° N<br />
                    04° W
                  </span>
                </div>
                <span className="scene-drag mono">INTERACTIVE OBJECT / DRAG TO ROTATE</span>
              </div>
            </div>
            <div className="hero-bottom hero-reveal">
              <a href="#projets" className="scroll-link mono">
                <span className="scroll-dot" /> SCROLL TO EXPLORE <ArrowDown size={13} />
              </a>
              <span className="hero-location mono">
                BASÉ À ABIDJAN.
                <br />
                CONNECTÉ AU MONDE.
              </span>
              <button
                className="motion-toggle mono"
                onClick={() => setQuiet(!quiet)}
                aria-pressed={quiet}
                aria-label={quiet ? 'Activer les animations' : 'Réduire les animations'}
              >
                {quiet ? <Play size={13} /> : <Pause size={13} />}
                <span>MOTION {quiet ? 'OFF' : 'ON'}</span>
              </button>
            </div>
          </section>
          <div className="brands-strip">
            <span className="mono">
              DE L’IDÉE
              <br />À L’IMPACT
            </span>
            <div className="brands">
              <span className="brand-fvundi">
                fvundi<span>↗</span>
              </span>
              <span className="brand-immo">
                immo<span>plus.</span>
              </span>
              <span className="brand-style">STYLE PASS</span>
              <span className="brand-nature">naturalink</span>
              <span className="brand-ndaya">ndaya.</span>
            </div>
            <span className="mono strip-year">2024 — 2026</span>
          </div>
          <Impact quiet={quiet} />
          <FieldEngineering quiet={quiet} />
          <ProjectGallery onOpen={setModal} quiet={quiet} />
          <Research quiet={quiet} />
          <section className="about-section section-pad" id="parcours">
            <div className="about-top reveal">
              <span className="mono section-eyebrow">04 / THE PERSON BEHIND THE CODE</span>
              <span className="mono">ABIDJAN → EVERYWHERE</span>
            </div>
            <div className="about-intro reveal">
              <h2>
                Une vision produit.
                <br />
                Un esprit d’ingénieur.
                <br />
                <span>Une curiosité sans fin.</span>
              </h2>
              <div className="about-intro-copy">
                <div className="personal-monogram">
                  K<span>ME.</span>
                  <i>↗</i>
                </div>
                <p>
                  Je suis <strong>{site.name}</strong>, CTO, Forward Deployed Engineer et
                  entrepreneur basé à Abidjan. Je relie les besoins métier à la conception de
                  produits, aux systèmes distribués et à l’intelligence artificielle.
                </p>
                <p>
                  Mon fil conducteur : partir d’un problème concret, construire avec rigueur, et
                  garder l’humain au cœur des décisions.
                </p>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-link">
                  Faisons connaissance <Arrow />
                </a>
              </div>
            </div>
            <div className="career-heading">
              <span className="mono">PARCOURS PROFESSIONNEL</span>
              <span className="mono">RÔLE / ORGANISATION / PÉRIODE</span>
            </div>
            <div className="career-list">
              {experience.map(([date, role, company, desc], i) => (
                <div className={'career-row ' + (expanded === i ? 'expanded' : '')} key={company}>
                  <button
                    aria-expanded={expanded === i}
                    aria-controls={'career-' + i}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <span className="career-date mono">{date}</span>
                    <span className="career-company">{company}</span>
                    <span className="career-role">{role}</span>
                    <span className="career-icon">
                      {expanded === i ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded === i && (
                      <motion.div
                        id={'career-' + i}
                        className="career-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>{desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="education reveal">
              <span className="mono">FORMATION & LEADERSHIP</span>
              <div>
                <span className="mono education-date">2021 — 2026</span>
                <h3>HEC Abidjan</h3>
                <p>
                  M2 Informatique de Gestion
                  <br />
                  Intelligence artificielle & Deep Learning
                </p>
                <small>
                  Licence : mention très bien · 17/20
                  <br />
                  Mémoire de M2 en cours
                </small>
              </div>
              <div>
                <span className="mono education-date">2025 — 2026</span>
                <h3>Aspire Leaders Program</h3>
                <p>
                  Aspire Institute
                  <br />
                  Engineering Lead
                </p>
                <small>
                  Direction d’une équipe internationale
                  <br />
                  de 5 ingénieurs
                </small>
              </div>
            </div>
          </section>
          <section className="expertise-section section-pad" id="expertise">
            <div className="section-heading reveal">
              <div>
                <span className="mono section-eyebrow">TOOLBOX & MINDSET</span>
                <h2>
                  De la profondeur.
                  <br />
                  <span className="muted">À chaque couche.</span>
                </h2>
              </div>
              <p className="expertise-note">
                Comprendre le système dans son ensemble.
                <br />
                Maîtriser les détails qui font la différence.
              </p>
            </div>
            <div className="skills-grid">
              {skillGroups.map(([n, title, items]) => (
                <div className="skill-group reveal" key={n}>
                  <div className="skill-header">
                    <span className="mono">/{n}</span>
                    {n === '01' ? (
                      <AudioLines size={24} />
                    ) : n === '02' ? (
                      <Layers size={24} />
                    ) : n === '03' ? (
                      <Globe size={24} />
                    ) : (
                      <ShieldCheck size={24} />
                    )}
                  </div>
                  <h3>{title}</h3>
                  <div className="skill-tags">
                    {items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Journal quiet={quiet} />
          <section id="contact" className="contact-section section-pad">
            <Suspense fallback={null}>{!quiet && <ParticleField />}</Suspense>
            <div className="contact-top reveal">
              <span className="mono section-eyebrow">06 / NEXT CHAPTER</span>
              <span className="mono">
                <i className="availability-dot" /> PRODUIT · RECHERCHE · COLLABORATION
              </span>
            </div>
            <div className="contact-main reveal">
              <h2>
                Le prochain projet
                <br />
                commence par
                <br />
                <a href={`mailto:${email}`}>
                  une conversation.
                  <Arrow size={92} />
                </a>
              </h2>
              <div className="contact-bottom">
                <div>
                  <a href={`mailto:${email}`} className="contact-email">
                    {email}
                  </a>
                  <button
                    className="copy-btn"
                    onClick={copyEmail}
                    aria-label="Copier l’adresse e-mail"
                  >
                    {copied ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                  <span className="copy-feedback" role="status">
                    {copied
                      ? 'Adresse copiée'
                      : copyError
                        ? 'Sélectionnez l’adresse pour la copier.'
                        : ''}
                  </span>
                </div>
                <a href={cv} download className="pill-btn outline">
                  Télécharger mon CV <Download size={16} />
                </a>
              </div>
            </div>
            <footer className="footer">
              <a href="#accueil" className="wordmark">
                {site.brand}
                <span>®</span>
              </a>
              <span className="mono copyright">© 2026 {site.name.toUpperCase()}</span>
              <div className="footer-socials">
                <a href={site.github} target="_blank" rel="noreferrer">
                  GitHub <Arrow size={14} />
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <Arrow size={14} />
                </a>
                <a href="#accueil">Retour en haut ↑</a>
              </div>
              <button className="restart-btn" onClick={replay} aria-label="Rejouer l’introduction">
                <span />
                <span />
                <span />
                <span />
              </button>
            </footer>
          </section>
        </main>
        {modal && <ProjectDialog project={modal} onClose={() => setModal(null)} />}
      </div>
    </MotionConfig>
  );
}
