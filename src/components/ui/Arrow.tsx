import { ArrowUpRight } from 'lucide-react';
export function Arrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRight size={size} strokeWidth={1.5} aria-hidden="true" />;
}
