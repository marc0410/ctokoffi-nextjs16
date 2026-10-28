'use client';
import { useRef, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/animations';
import { Arrow } from '@/components/ui/Arrow';
export function Preloader({ done }: { done: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(done, 2400);
    return () => clearTimeout(timer);
  }, [done]);
  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete: done });
      tl.from('.intro-mark', { scale: 0.7, opacity: 0, duration: 0.4 })
        .to('.intro-line', { scaleX: 1, duration: 0.95, ease: 'power2.inOut' }, 0.1)
        .to(root.current, { yPercent: -100, duration: 0.65, ease: 'power3.inOut' }, 1.2);
      return () => tl.kill();
    },
    { scope: root },
  );
  return (
    <div className="preloader" ref={root}>
      <div className="intro-top mono">
        <span>CTOKOFFI.ME</span>
        <button onClick={done}>
          PASSER L’INTRO <Arrow size={14} />
        </button>
      </div>
      <div className="intro-mark">
        K<span>®</span>
      </div>
      <div className="intro-bottom mono">
        <span>HUMAN INTENT. MACHINE INTELLIGENCE.</span>
        <span>INITIALIZING / 2026</span>
      </div>
      <div className="intro-line" />
    </div>
  );
}
