'use client';
import React, { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Float, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { supportsWebGL } from '@/lib/webgl';
class SceneBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <OrbFallback /> : this.props.children;
  }
}
export function OrbFallback() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<number | null>(null);
  return (
    <div
      ref={ref}
      className="orb-fallback"
      aria-hidden="true"
      onPointerDown={(e) => {
        drag.current = e.clientX;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (drag.current !== null && ref.current)
          ref.current.style.transform = `rotate(${-25 + (e.clientX - drag.current) * 0.4}deg)`;
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <i key={i} style={{ '--i': i } as React.CSSProperties} />
      ))}
      <span />
    </div>
  );
}
function Sculpture({ quiet }: { quiet: boolean }) {
  const group = useRef<THREE.Group>(null);
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 500; i++) {
      const t = (i / 500) * Math.PI * 2;
      const r = 1.5 + 0.46 * Math.cos(3 * t);
      points.push(
        new THREE.Vector3(r * Math.cos(2 * t), r * Math.sin(2 * t), 0.78 * Math.sin(3 * t)),
      );
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, []);
  useFrame((state, delta) => {
    if (group.current && !quiet) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.12;
    }
  });
  return (
    <Float speed={quiet ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={group} rotation={[0.45, 0.35, 0.1]}>
        <mesh>
          <tubeGeometry args={[curve, 350, 0.23, 24, true]} />
          <meshPhysicalMaterial
            color="#b9a6d9"
            metalness={0.98}
            roughness={0.23}
            clearcoat={1}
            clearcoatRoughness={0.14}
          />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, (i * Math.PI) / 3, 0.5]}>
            <torusGeometry args={[2.25 + i * 0.13, 0.009, 8, 128]} />
            <meshBasicMaterial color={i === 1 ? '#ddd5f3' : '#635575'} transparent opacity={0.45} />
          </mesh>
        ))}
        <mesh position={[1.9, 0.9, 0.8]}>
          <sphereGeometry args={[0.085, 20, 20]} />
          <meshBasicMaterial color="#e7d4ff" toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}
export default function Scene({ quiet = false }: { quiet?: boolean }) {
  if (!supportsWebGL()) return <OrbFallback />;
  return (
    <SceneBoundary>
      <Suspense fallback={<OrbFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 7.7], fov: 41 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          fallback={<OrbFallback />}
          frameloop={quiet ? 'demand' : 'always'}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 4, 5]} intensity={2} />
          <Environment resolution={128}>
            <Lightformer
              form="rect"
              intensity={4}
              color="#f5edff"
              scale={[8, 3, 1]}
              position={[0, 5, -3]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={5}
              color="#d7c5ff"
              scale={[3, 7, 1]}
              position={[-5, 1, 2]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <Lightformer
              form="rect"
              intensity={4}
              color="#ffffff"
              scale={[2, 8, 1]}
              position={[5, -1, 1]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <Lightformer
              form="ring"
              intensity={3}
              color="#ab8bdf"
              scale={5}
              position={[0, -4, 2]}
              rotation={[Math.PI / 2, 0, 0]}
            />
          </Environment>
          <Sculpture quiet={quiet} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            enableDamping
            minPolarAngle={0.4}
            maxPolarAngle={2.7}
          />
          {!quiet && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.25} luminanceThreshold={1.1} mipmapBlur />
            </EffectComposer>
          )}
        </Canvas>
      </Suspense>
    </SceneBoundary>
  );
}
