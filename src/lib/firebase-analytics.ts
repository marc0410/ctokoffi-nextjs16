'use client';

// Déclaration globale pour le dataLayer et gtag de Google Analytics / Firebase Web
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Analytics est considéré configuré si l'identifiant de mesure GA4 / Firebase est fourni
export const analyticsConfigured = Boolean(
  firebaseConfig.measurementId && firebaseConfig.measurementId.trim() !== '',
);

let initialized = false;
let scriptLoadingPromise: Promise<boolean> | null = null;
let consentGranted = false;

/**
 * Initialise le tag Firebase Analytics / GA4 gtag.js
 */
export async function startAnalytics(): Promise<boolean> {
  if (!analyticsConfigured || typeof window === 'undefined') return false;
  if (initialized) return true;

  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise<boolean>((resolve) => {
    try {
      const measurementId = firebaseConfig.measurementId;
      if (!measurementId) {
        resolve(false);
        return;
      }

      window.dataLayer = window.dataLayer || [];
      if (!window.gtag) {
        window.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer?.push(arguments);
        };
      }

      // Horodatage d'initialisation
      window.gtag('js', new Date());

      // Configuration du consentement par défaut RGPD (refusé par défaut avant choix explicite)
      window.gtag('consent', 'default', {
        analytics_storage: consentGranted ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });

      // Configuration de la propriété GA4 / Firebase
      window.gtag('config', measurementId, {
        send_page_view: false, // Contrôlé manuellement dans Next.js pour éviter les doublons SPA
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        restricted_data_processing: true,
      });

      // Chargement asynchrone du script officiel Google Tag
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
      if (existingScript) {
        initialized = true;
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.onload = () => {
        initialized = true;
        resolve(true);
      };
      script.onerror = () => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Firebase Analytics] Impossible de charger gtag.js');
        }
        resolve(false);
      };

      document.head.appendChild(script);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Firebase Analytics] Erreur d’initialisation:', err);
      }
      resolve(false);
    }
  });

  return scriptLoadingPromise;
}

/**
 * Met à jour le consentement utilisateur (RGPD)
 */
export async function setAnalyticsConsent(granted: boolean) {
  consentGranted = granted;

  if (typeof window === 'undefined') return;

  if (granted) {
    await startAnalytics();
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  } else {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  }
}

/**
 * Enregistre une vue de page (route Next.js)
 */
export async function trackPageView(pathname: string) {
  if (!consentGranted || !analyticsConfigured || typeof window === 'undefined') return;

  await startAnalytics();
  if (!window.gtag || !firebaseConfig.measurementId) return;

  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: pathname,
    page_title: document.title,
    send_to: firebaseConfig.measurementId,
  });
}

/**
 * Enregistre un événement analytique personnalisé
 */
export async function trackAnalyticsEvent(
  eventName: string,
  params: Record<string, unknown> = {},
) {
  if (!consentGranted || !analyticsConfigured || typeof window === 'undefined') return;

  await startAnalytics();
  if (!window.gtag) return;

  window.gtag('event', eventName, params);
}

/**
 * Enregistre la profondeur de défilement (scroll depth: 25%, 50%, 75%, 90%, 100%)
 */
export function trackScrollDepth(percent: number, pathname: string) {
  void trackAnalyticsEvent('scroll_depth', {
    percent_scrolled: percent,
    page_path: pathname,
  });
}

/**
 * Enregistre un clic sur un bouton ou CTA
 */
export function trackButtonClick(buttonName: string, details: Record<string, unknown> = {}) {
  void trackAnalyticsEvent('button_click', {
    button_name: buttonName,
    ...details,
  });
}
