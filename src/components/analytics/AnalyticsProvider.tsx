'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  analyticsConfigured,
  setAnalyticsConsent,
  trackAnalyticsEvent,
  trackPageView,
  trackScrollDepth,
} from '@/lib/firebase-analytics';

type Choice = 'loading' | 'unset' | 'accepted' | 'rejected';
const STORAGE_KEY = 'ctokoffi.analytics.consent.v1';
const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];

export function AnalyticsProvider() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice>('loading');
  const [showPreferences, setShowPreferences] = useState(false);
  const lastTrackedPath = useRef<string | null>(null);
  const trackedScrollDepths = useRef<Set<number>>(new Set());

  // 1. Initialisation de l'état de consentement au montage
  useEffect(() => {
    if (!analyticsConfigured) {
      setChoice('unset');
      return;
    }
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      setChoice(saved === 'accepted' || saved === 'rejected' ? saved : 'unset');
    } catch {
      setChoice('unset');
    }
  }, []);

  // 2. Application du consentement
  useEffect(() => {
    if (choice === 'accepted') {
      void setAnalyticsConsent(true);
    } else if (choice === 'rejected') {
      lastTrackedPath.current = null;
      trackedScrollDepths.current.clear();
      void setAnalyticsConsent(false);
    }
  }, [choice]);

  // 3. Suivi des vues de page (Page Views)
  useEffect(() => {
    if (choice !== 'accepted' || !pathname || lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    trackedScrollDepths.current.clear();
    void trackPageView(pathname);
  }, [choice, pathname]);

  // 4. Suivi du défilement (Scroll Depth: 25%, 50%, 75%, 90%, 100%)
  const handleScroll = useCallback(() => {
    if (choice !== 'accepted' || !pathname) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    if (documentHeight <= 0) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollPercent = Math.min(100, Math.round((scrollTop / documentHeight) * 100));

    for (const threshold of SCROLL_THRESHOLDS) {
      if (scrollPercent >= threshold && !trackedScrollDepths.current.has(threshold)) {
        trackedScrollDepths.current.add(threshold);
        trackScrollDepth(threshold, pathname);
      }
    }
  }, [choice, pathname]);

  useEffect(() => {
    if (choice !== 'accepted') return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Déclenchement initial au cas où la page est déjà défilée
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [choice, handleScroll]);

  // 5. Suivi des interactions utilisateurs (Clics, Boutons, Liens, Tags)
  useEffect(() => {
    if (choice !== 'accepted') return;

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      // A. Élément tagué avec data-analytics-event
      const marked = event.target.closest<HTMLElement>('[data-analytics-event]');
      if (marked) {
        const eventName = marked.dataset.analyticsEvent;
        if (eventName) {
          const params: Record<string, unknown> = {
            location: pathname,
          };
          if (marked.dataset.analyticsCategory) {
            params.category = marked.dataset.analyticsCategory;
          }
          if (marked.dataset.analyticsLabel) {
            params.label = marked.dataset.analyticsLabel;
          }
          if (marked.dataset.analyticsValue) {
            params.value = Number(marked.dataset.analyticsValue) || marked.dataset.analyticsValue;
          }
          if (marked.dataset.analyticsProject) {
            params.project = marked.dataset.analyticsProject;
          }
          void trackAnalyticsEvent(eventName, params);
        }
        return;
      }

      // B. Liens <a>
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        if (!href) return;

        if (href.startsWith('mailto:')) {
          void trackAnalyticsEvent('contact_click', {
            method: 'email',
            location: pathname,
            href,
          });
        } else if (href.startsWith('tel:')) {
          void trackAnalyticsEvent('contact_click', {
            method: 'phone',
            location: pathname,
            href,
          });
        } else if (
          link.hasAttribute('download') ||
          href.endsWith('.pdf') ||
          new URL(href, window.location.href).pathname.includes('CV')
        ) {
          void trackAnalyticsEvent('cv_download', {
            file_name: href.split('/').pop() || 'cv.pdf',
            location: pathname,
          });
        } else {
          try {
            const destination = new URL(href, window.location.href);
            if (destination.origin !== window.location.origin && /^https?:$/.test(destination.protocol)) {
              void trackAnalyticsEvent('outbound_click', {
                destination_host: destination.hostname,
                destination_url: destination.href,
                location: pathname,
              });
            }
          } catch {
            // URL non valide, pas de tracking sortant
          }
        }
        return;
      }

      // C. Boutons non tagués explicitement (pour les taux d'engagement et tractions)
      const button = event.target.closest<HTMLButtonElement>('button');
      if (button && !button.closest('[role="region"][aria-label*="statistiques" i]')) {
        const buttonText = (button.innerText || button.getAttribute('aria-label') || button.title || 'unnamed_button')
          .trim()
          .slice(0, 50);
        void trackAnalyticsEvent('button_click', {
          button_text: buttonText,
          location: pathname,
        });
      }
    };

    // Suivi des soumissions de formulaire
    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form) {
        const formId = form.id || form.getAttribute('name') || 'contact_form';
        void trackAnalyticsEvent('form_submit', {
          form_id: formId,
          location: pathname,
        });
      }
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleSubmit, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, [choice, pathname]);

  if (!analyticsConfigured || choice === 'loading') return null;

  function choose(value: 'accepted' | 'rejected') {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Le choix s'applique pour la session en cours même si le stockage local est bloqué
    }
    setChoice(value);
    setShowPreferences(false);
  }

  // Bouton flottant discret pour modifier les préférences
  if (choice !== 'unset' && !showPreferences) {
    return (
      <button
        type="button"
        onClick={() => setShowPreferences(true)}
        className="fixed bottom-4 left-4 z-[999] rounded-full border border-white/20 bg-[#161a14]/90 backdrop-blur-md px-3.5 py-1.5 text-xs text-white/80 hover:text-white hover:border-white/40 shadow-lg transition-all"
        title="Gérer le consentement des statistiques"
      >
        Préférences cookies & analytics
      </button>
    );
  }

  // Bandeau de consentement RGPD
  return (
    <section
      role="region"
      aria-label="Choix des statistiques de fréquentation"
      className="fixed inset-x-4 bottom-4 z-[1000] mx-auto max-w-xl rounded-2xl border border-[#c6d0bd]/40 bg-[#1e231b]/95 backdrop-blur-xl p-5 text-white shadow-2xl transition-all"
    >
      <h2 className="text-base font-semibold text-[#f0f4ec]">Statistiques et métriques de fréquentation</h2>
      <p className="mt-2 text-xs leading-relaxed text-[#c6d0bd]">
        Avec votre accord, Firebase Analytics mesure les pages visitées, la profondeur de défilement (scroll),
        les interactions avec les projets et le téléchargement du CV. Aucune donnée personnelle nominative n’est collectée.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="rounded-full bg-[#527d42] hover:bg-[#639951] px-5 py-2 text-xs font-semibold text-white transition-colors"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={() => choose('rejected')}
          className="rounded-full border border-white/30 hover:border-white/60 px-5 py-2 text-xs font-medium text-white/90 transition-colors"
        >
          Refuser
        </button>
        <span className="text-[11px] text-[#97a58e] ml-auto">Modifiable à tout moment</span>
      </div>
    </section>
  );
}
