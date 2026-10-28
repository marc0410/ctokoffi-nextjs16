'use client';
import { useRef } from 'react';
import { site } from '@/content/site';
import { gsap, useGSAP } from '@/lib/animations';
export function Impact({ quiet }: { quiet: boolean }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (quiet) {
        root.current
          ?.querySelectorAll<HTMLElement>('[data-count]')
          .forEach((el) => (el.textContent = Number(el.dataset.count).toLocaleString('fr-FR')));
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
          onUpdate: () => (el.textContent = Math.round(obj.value).toLocaleString('fr-FR')),
        });
      });
    },
    { scope: root, dependencies: [quiet], revertOnUpdate: true },
  );
  return (
    <section className="impact-section" ref={root} aria-label="Impact cumulé des plateformes">
      <div className="impact-lead">
        <span className="mono section-eyebrow">BUILT. SHIPPED. USED.</span>
        <p>
          Des systèmes qui vivent
          <br />
          <span>au-delà du code.</span>
        </p>
      </div>
      <div className="impact-number">
        <strong aria-label={`Plus de ${site.impact.users.toLocaleString('fr-FR')} utilisateurs`}>
          <span aria-hidden="true" data-count={site.impact.users}>
            {site.impact.users.toLocaleString('fr-FR')}
          </span>
          <em aria-hidden="true">+</em>
        </strong>
        <p>
          utilisateurs à travers
          <br />
          l’ensemble des plateformes
        </p>
      </div>
      <div className="impact-number financial">
        <strong aria-label={`Plus de ${site.impact.volumeMillionsFCFA} millions de francs CFA`}>
          <span aria-hidden="true" data-count={site.impact.volumeMillionsFCFA}>
            {site.impact.volumeMillionsFCFA}
          </span>
          <em aria-hidden="true">M+</em>
        </strong>
        <p>
          FCFA ayant transité
          <br />
          par les architectures
        </p>
      </div>
      <span className="impact-foot mono">CHIFFRES CUMULÉS · TOUTES PLATEFORMES CONFONDUES</span>
    </section>
  );
}
