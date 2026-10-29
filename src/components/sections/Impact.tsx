'use client';

import { useRef } from 'react';
import { site } from '@/content/site';
import { gsap, useGSAP } from '@/lib/animations';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';

export function Impact({ quiet, locale = 'fr' }: { quiet: boolean; locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const dict = getDictionary(locale);
  const langTag = locale === 'en' ? 'en-US' : locale === 'es' ? 'es-ES' : 'fr-FR';

  useGSAP(
    () => {
      if (quiet) {
        root.current
          ?.querySelectorAll<HTMLElement>('[data-count]')
          .forEach((el) => (el.textContent = Number(el.dataset.count).toLocaleString(langTag)));
        return;
      }
      gsap.utils.toArray<HTMLElement>('[data-count]', root.current).forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: end,
          duration: 1.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
          onUpdate: () => (el.textContent = Math.round(obj.value).toLocaleString(langTag)),
        });
      });
    },
    { scope: root, dependencies: [quiet, langTag], revertOnUpdate: true },
  );

  return (
    <section className="impact-section" ref={root} aria-label={dict.impact.eyebrow}>
      <div className="impact-lead">
        <span className="mono section-eyebrow">BUILT. SHIPPED. USED.</span>
        <p>
          {locale === 'en' ? (
            <>
              Software that thrives
              <br />
              <span>beyond the codebase.</span>
            </>
          ) : locale === 'es' ? (
            <>
              Sistemas que viven
              <br />
              <span>más allá del código.</span>
            </>
          ) : (
            <>
              Des systèmes qui vivent
              <br />
              <span>au-delà du code.</span>
            </>
          )}
        </p>
      </div>
      <div className="impact-number">
        <strong aria-label={`Plus de ${site.impact.users.toLocaleString(langTag)} utilisateurs`}>
          <span aria-hidden="true" data-count={site.impact.users}>
            {site.impact.users.toLocaleString(langTag)}
          </span>
          <em aria-hidden="true">+</em>
        </strong>
        <p>
          {locale === 'en' ? (
            <>
              active users across
              <br />
              all deployed platforms
            </>
          ) : locale === 'es' ? (
            <>
              usuarios activos en
              <br />
              todas las plataformas
            </>
          ) : (
            <>
              utilisateurs à travers
              <br />
              l’ensemble des plateformes
            </>
          )}
        </p>
      </div>
      <div className="impact-number">
        <strong aria-label={`Plus de ${site.impact.volumeMillionsFCFA} millions de FCFA de volume`}>
          <span aria-hidden="true" data-count={site.impact.volumeMillionsFCFA}>
            {site.impact.volumeMillionsFCFA}
          </span>
          <em aria-hidden="true">M+</em>
        </strong>
        <p>
          {locale === 'en' ? (
            <>
              FCFA transacted through
              <br />
              resilient architectures
            </>
          ) : locale === 'es' ? (
            <>
              millones FCFA gestionados
              <br />
              en las arquitecturas
            </>
          ) : (
            <>
              millions FCFA ayant transité
              <br />
              par les architectures
            </>
          )}
        </p>
      </div>
    </section>
  );
}
