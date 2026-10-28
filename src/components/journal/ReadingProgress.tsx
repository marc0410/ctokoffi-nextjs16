'use client';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  );
}
