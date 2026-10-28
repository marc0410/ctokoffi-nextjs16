'use client';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleField() {
  return (
    <ParticlesProvider init={loadSlim}>
      <Particles
        id="contact-particles"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 24,
          detectRetina: false,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          particles: {
            number: { value: 32 },
            color: { value: '#c4b4f4' },
            links: { enable: true, distance: 140, color: '#c4b4f4', opacity: 0.1 },
            opacity: { value: 0.35 },
            size: { value: { min: 1, max: 2 } },
            move: { enable: true, speed: 0.25 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'grab' } },
            modes: { grab: { distance: 140, links: { opacity: 0.25 } } },
          },
        }}
      />
    </ParticlesProvider>
  );
}
