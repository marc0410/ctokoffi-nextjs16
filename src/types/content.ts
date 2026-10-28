import type { CSSProperties } from 'react';

export type ProjectCategory = 'IA' | 'Produit' | 'Web3';
export interface Project {
  id: string;
  name: string;
  url?: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  role: string;
  type: string;
  color: string;
  tags: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: [value: string, label: string][];
}
export type Experience = [date: string, role: string, company: string, description: string];
export type SkillGroup = [number: string, title: string, skills: string[]];
export interface Publication {
  id: string;
  date: string;
  category: string;
  shortTitle: string;
  title: string;
  summary: string;
  status: string;
  doi: string;
  url: string;
  pdf: string;
  tags: string[];
}
export interface Article {
  slug: string;
  category: 'Engineering' | 'Architecture' | 'Recherche';
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  theme: 'field' | 'scale' | 'trust';
  intro: string;
  sections: [title: string, text: string][];
  takeaway: string;
  sources?: { title: string; url: string }[];
}
export type CSSVariables = CSSProperties & { [key: `--${string}`]: string | number };
export interface MotionPreferenceProps {
  quiet: boolean;
}
