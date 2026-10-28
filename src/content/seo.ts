import { projects } from '@/content/projects';

const slugById: Record<string, string> = {
  fvundi: 'fvundi',
  immo: 'immo-plus',
  kvix: 'kvix',
  nalia: 'nalia',
  rix: 'rix3',
  style: 'style-pass',
  naturalink: 'naturalink',
  ndaya: 'ndaya',
  solana: 'solana-pay',
};

export const projectPages = projects.map((project) => ({ ...project, slug: slugById[project.id] }));

export const researchSlugs = {
  'constitutional-oversight': 'constitutional-oversight-ml-rag',
  'holistic-life-scoring': 'holistic-life-scoring',
} as const;
