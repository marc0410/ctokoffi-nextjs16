'use client';
import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { supportsWebGL } from '@/lib/webgl';
export default function Shader({ quiet }: { quiet: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (quiet || !ref.current || !supportsWebGL()) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, dpr: 1 });
    } catch {
      return;
    }
    const gl = renderer.gl;
    ref.current.appendChild(gl.canvas);
    let frame: number;
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: `attribute vec2 uv; attribute vec2 position; varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`,
      fragment: `precision highp float; varying vec2 vUv; uniform float uTime; void main(){vec2 p=vUv-.5;float a=atan(p.y,p.x);float r=length(p);float wave=sin(r*44.-uTime*.45+sin(a*5.)*1.4);float line=pow(max(0.,wave),22.);float glow=exp(-r*3.);vec3 col=mix(vec3(.25,.2,.36),vec3(.76,.66,.94),line);gl_FragColor=vec4(col,line*.3*glow);}`,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });
    const resize = () => {
      if (ref.current) renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(ref.current);
    resize();
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(ref.current);
    function draw(t: number) {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      geometry.remove();
      program.remove();
      gl.canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [quiet]);
  return <div className="research-shader" ref={ref} aria-hidden="true" />;
}
