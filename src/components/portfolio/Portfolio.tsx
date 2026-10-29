'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import { site } from '@/content/site';
import { getDictionary } from '@/i18n/get-dictionary';
import { getLocalizedExperiences, getLocalizedSkillGroups } from '@/content/i18n-content';
import { articles } from '@/content/journal';
import type { Project } from '@/types/content';
import type { Locale } from '@/i18n/config';
import { Arrow } from '@/components/ui/Arrow';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
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

export default function Portfolio({ locale = 'fr' }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const experience = getLocalizedExperiences(locale);
  const skillGroups = getLocalizedSkillGroups(locale);

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

  const links = [
    ['projets', dict.nav.projects],
    ['approche', dict.nav.approach],
    ['recherche', dict.nav.research],
    ['journal', dict.nav.journal],
  ];

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
    if (articles.some((a) => a.slug === slug)) router.replace(`/${locale}/journal/${slug}`);
  }, [router, locale]);

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopyError(true);
    }
  };

  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIntro(true);
    setIntroKey((k) => k + 1);
  };

  return (
    <MotionConfig reducedMotion={quiet ? 'always' : 'user'}>
      <div className="portfolio-root" ref={root}>
        {intro && !quiet && <Preloader done={finishIntro} key={introKey} />}
        <a className="skip-link" href="#main">
          {locale === 'en'
            ? 'Skip to main content'
            : locale === 'es'
              ? 'Saltar al contenido principal'
              : 'Passer au contenu principal'}
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
              {dict.nav.contact} ↗
            </a>
            <div className="pt-4 md:hidden">
              <LanguageSwitcher />
            </div>
          </nav>
          <div className="header-actions">
            <LanguageSwitcher className="hidden md:inline-flex" />
            <span className="location mono">
              <i /> {dict.header.location}
            </span>
            <a
              className="contact-btn"
              href="#contact"
              data-analytics-event="cta_click"
              data-analytics-category="header"
              data-analytics-label="parlons_ensemble"
            >
              {dict.header.talkBtn} <Arrow size={16} />
            </a>
            <button
              className="menu-btn"
              aria-label={menu ? dict.header.closeMenu : dict.header.openMenu}
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
              <span>{dict.hero.metaYear}</span>
              <span>{dict.hero.metaTag}</span>
            </div>
            <div className="hero-main">
              <div className="hero-text">
                <h1 className="hero-byline hero-reveal">
                  <span className="tiny-plus">✳</span>
                  <span>{dict.hero.byline}</span>
                </h1>
                <div className="hero-word" aria-label="Engineering tomorrow">
                  <span className="hero-reveal">{dict.hero.wordFirst}</span>
                  <span className="hero-reveal accent">{dict.hero.wordSecond}</span>
                </div>
                <div className="hero-description hero-reveal">
                  <span className="mono hero-number">[01—∞]</span>
                  <div>
                    <p>
                      {dict.hero.taglineLine1}
                      <br />
                      {dict.hero.taglineLine2}
                    </p>
                    <p className="hero-seo-intro">{dict.hero.description}</p>
                    <span className="mono role-label">{dict.hero.role}</span>
                  </div>
                </div>
                <div className="hero-cta hero-reveal">
                  <a
                    href="#projets"
                    className="pill-btn primary"
                    data-analytics-event="cta_click"
                    data-analytics-category="hero"
                    data-analytics-label="explorer_mes_projets"
                  >
                    {dict.hero.exploreBtn} <ArrowDown size={17} />
                  </a>
                  <a
                    href={cv}
                    download
                    className="cv-link"
                    data-analytics-event="cv_download"
                    data-analytics-category="hero"
                    data-analytics-label="cv_hero"
                  >
                    {dict.hero.cvBtn} <Download size={15} />
                  </a>
                </div>
              </div>
              <div className="scene-wrap hero-reveal">
                <Suspense fallback={<div className="scene-loading" />}>
                  {heroVisible && <Scene quiet={quiet || intro} />}
                </Suspense>
                <div className="scene-caption mono">
                  <span className="crosshair">+</span>
                  <span>
                    {dict.hero.sceneCaptionTop}
                    <br />
                    {dict.hero.sceneCaptionBottom}
                  </span>
                  <span className="scene-coord">
                    05° N<br />
                    04° W
                  </span>
                </div>
                <span className="scene-drag mono">{dict.hero.sceneDrag}</span>
              </div>
            </div>
            <div className="hero-bottom hero-reveal">
              <a
                href="#projets"
                className="scroll-link mono"
                data-analytics-event="cta_click"
                data-analytics-category="hero"
                data-analytics-label="scroll_to_explore"
              >
                <span className="scroll-dot" /> {dict.hero.scrollExplore} <ArrowDown size={13} />
              </a>
              <span className="hero-location mono">
                {dict.hero.basedIn}
                <br />
                {dict.hero.connectedWorld}
              </span>
              <button
                className="motion-toggle mono"
                onClick={() => setQuiet(!quiet)}
                aria-pressed={quiet}
                aria-label={quiet ? 'Activer les animations' : 'Réduire les animations'}
                data-analytics-event="motion_toggle"
                data-analytics-category="accessibility"
                data-analytics-label={quiet ? 'motion_off' : 'motion_on'}
              >
                {quiet ? <Play size={13} /> : <Pause size={13} />}
                <span>
                  {dict.hero.motionToggle} {quiet ? dict.hero.motionOff : dict.hero.motionOn}
                </span>
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
          <nav aria-label="Explorer le portfolio" className="seo-route-nav">
            <Link href={`/${locale}/a-propos`}>{dict.nav.about}</Link>
            <Link href={`/${locale}/projets`}>{dict.nav.projects}</Link>
            <Link href={`/${locale}/recherche`}>{dict.nav.research}</Link>
            <Link href={`/${locale}/journal`}>{dict.nav.journal}</Link>
            <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
          </nav>
          <Impact quiet={quiet} locale={locale} />
          <FieldEngineering quiet={quiet} locale={locale} />
          <ProjectGallery onOpen={setModal} quiet={quiet} locale={locale} />
          <Research quiet={quiet} locale={locale} />
          <section className="about-section section-pad" id="parcours">
            <div className="about-top reveal">
              <span className="mono section-eyebrow">04 / THE PERSON BEHIND THE CODE</span>
              <span className="mono">ABIDJAN → EVERYWHERE</span>
            </div>
            <div className="about-intro reveal">
              <h2>
                {locale === 'en' ? (
                  <>
                    A product vision.
                    <br />
                    An engineering mindset.
                    <br />
                    <span>Unbounded curiosity.</span>
                  </>
                ) : locale === 'es' ? (
                  <>
                    Una visión de producto.
                    <br />
                    Mente de ingeniero.
                    <br />
                    <span>Curiosidad infinita.</span>
                  </>
                ) : (
                  <>
                    Une vision produit.
                    <br />
                    Un esprit d’ingénieur.
                    <br />
                    <span>Une curiosité sans fin.</span>
                  </>
                )}
              </h2>
              <div className="about-intro-copy">
                <div className="personal-monogram">
                  K<span>ME.</span>
                  <i>↗</i>
                </div>
                <p>
                  {locale === 'en' ? (
                    <>
                      I am <strong>{site.name}</strong>, CTO, Forward Deployed Engineer and technology leader based in Abidjan. I bridge business imperatives with software craftsmanship, distributed systems, and applied AI.
                    </>
                  ) : locale === 'es' ? (
                    <>
                      Soy <strong>{site.name}</strong>, CTO, Forward Deployed Engineer y líder tecnológico en Abidyán. Conecto imperativos de negocio con ingeniería de software, sistemas distribuidos e IA aplicada.
                    </>
                  ) : (
                    <>
                      Je suis <strong>{site.name}</strong>, CTO, Forward Deployed Engineer et entrepreneur basé à Abidjan. Je relie les besoins métier à la conception de produits, aux systèmes distribués et à l’intelligence artificielle.
                    </>
                  )}
                </p>
                <p>
                  {locale === 'en'
                    ? 'My North Star: start from human friction, engineer with uncompromising rigor, and keep human agency at the center of every decision.'
                    : locale === 'es'
                      ? 'Mi principio rector: partir de la fricción humana, construir con rigor y mantener la agencia humana en el centro.'
                      : 'Mon fil conducteur : partir d’un problème concret, construire avec rigueur, et garder l’humain au cœur des décisions.'}
                </p>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-link">
                  {locale === 'en' ? "Let's connect" : locale === 'es' ? 'Conectemos' : 'Faisons connaissance'} <Arrow />
                </a>
              </div>
            </div>
            <div className="career-heading">
              <span className="mono">
                {locale === 'en' ? 'CAREER PATH' : locale === 'es' ? 'TRAYECTORIA PROFESIONAL' : 'PARCOURS PROFESSIONNEL'}
              </span>
              <span className="mono">
                {locale === 'en' ? 'ROLE / ORGANIZATION / PERIOD' : locale === 'es' ? 'ROL / ORGANIZACIÓN / PERÍODO' : 'RÔLE / ORGANISATION / PÉRIODE'}
              </span>
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
              <span className="mono">
                {locale === 'en' ? 'EDUCATION & LEADERSHIP' : locale === 'es' ? 'FORMACIÓN Y LIDERAZGO' : 'FORMATION & LEADERSHIP'}
              </span>
              <div>
                <span className="mono education-date">2021 — 2026</span>
                <h3>HEC Abidjan</h3>
                <p>
                  {locale === 'en' ? 'MSc in Information Systems & AI' : locale === 'es' ? 'Máster en Sistemas de Información e IA' : 'M2 Informatique de Gestion'}
                  <br />
                  Artificial Intelligence & Deep Learning
                </p>
                <small>
                  {locale === 'en' ? 'Bachelor: Highest Honors · 17/20' : locale === 'es' ? 'Grado: Matrícula de Honor · 17/20' : 'Licence : mention très bien · 17/20'}
                  <br />
                  {locale === 'en' ? 'MSc Thesis in progress' : locale === 'es' ? 'Tesis de Máster en curso' : 'Mémoire de M2 en cours'}
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
                  {locale === 'en'
                    ? 'Leading an international cohort of 5 engineers'
                    : locale === 'es'
                      ? 'Liderazgo de un equipo internacional de 5 ingenieros'
                      : 'Direction d’une équipe internationale de 5 ingénieurs'}
                </small>
              </div>
            </div>
          </section>
          <section className="expertise-section section-pad" id="expertise">
            <div className="section-heading reveal">
              <div>
                <span className="mono section-eyebrow">TOOLBOX & MINDSET</span>
                <h2>
                  {locale === 'en' ? (
                    <>
                      Depth.
                      <br />
                      <span className="muted">Across every layer.</span>
                    </>
                  ) : locale === 'es' ? (
                    <>
                      Profundidad.
                      <br />
                      <span className="muted">En cada capa.</span>
                    </>
                  ) : (
                    <>
                      De la profondeur.
                      <br />
                      <span className="muted">À chaque couche.</span>
                    </>
                  )}
                </h2>
              </div>
              <p className="expertise-note">
                {locale === 'en'
                  ? 'Master the macro architecture. Perfect the micro details that make systems resilient.'
                  : locale === 'es'
                    ? 'Dominar la arquitectura global. Perfeccionar los detalles que garantizan resiliencia.'
                    : 'Comprendre le système dans son ensemble. Maîtriser les détails qui font la différence.'}
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
          <Journal quiet={quiet} locale={locale} />
          <section id="contact" className="contact-section section-pad">
            <Suspense fallback={null}>{!quiet && <ParticleField />}</Suspense>
            <div className="contact-top reveal">
              <span className="mono section-eyebrow">{dict.contact.eyebrow}</span>
              <span className="mono">
                <i className="availability-dot" /> {dict.contact.status}
              </span>
            </div>
            <div className="contact-main reveal">
              <h2>
                {dict.contact.heading1}
                <br />
                {dict.contact.heading2}
                <br />
                <a href={`mailto:${email}`}>
                  {dict.contact.headingLink}
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
                    aria-label={dict.contact.copyEmail}
                    data-analytics-event="copy_email"
                    data-analytics-category="contact"
                    data-analytics-label="footer_email_copy"
                  >
                    {copied ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                  <span className="copy-feedback" role="status">
                    {copied
                      ? dict.contact.copied
                      : copyError
                        ? dict.contact.copyError
                        : ''}
                  </span>
                </div>
                <a
                  href={cv}
                  download
                  className="pill-btn outline"
                  data-analytics-event="cv_download"
                  data-analytics-category="contact"
                  data-analytics-label="footer_cv_download"
                >
                  {dict.contact.downloadCV} <Download size={16} />
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
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="social_click"
                  data-analytics-category="footer"
                  data-analytics-label="github"
                >
                  GitHub <Arrow size={14} />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="social_click"
                  data-analytics-category="footer"
                  data-analytics-label="linkedin"
                >
                  LinkedIn <Arrow size={14} />
                </a>
                <a href="#accueil">{dict.nav.backToTop}</a>
              </div>
              <button
                className="restart-btn"
                onClick={replay}
                aria-label={dict.contact.restartIntro}
              >
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
