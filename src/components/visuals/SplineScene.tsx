'use client';
// Supply an exported .splinecode scene via NEXT_PUBLIC_SPLINE_SCENE_URL to replace the native sculpture.
// The native Three.js scene is the complete default and works without an external Spline project.
import { lazy, Suspense } from 'react';
import Scene, { OrbFallback } from './Scene';
const Spline = lazy(() => import('@splinetool/react-spline'));
export default function VisualScene(props: { quiet?: boolean }) {
  const scene = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;
  return scene ? (
    <Suspense fallback={<OrbFallback />}>
      <Spline scene={scene} />
    </Suspense>
  ) : (
    <Scene {...props} />
  );
}
