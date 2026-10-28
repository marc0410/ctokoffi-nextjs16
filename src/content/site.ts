/** Edit your identity and public links here. No secrets belong in this file. */
export const site = {
  name: 'Kan Marc-Ephrem Koffi',
  brand: 'koffi',
  year: 2026,
  impact: { users: 100000, volumeMillionsFCFA: 200 },
  title: 'Koffi — CTO, Forward Deployed Engineer & AI Researcher',
  description:
    'Portfolio de Kan Marc-Ephrem Koffi : CTO, Forward Deployed Engineer et AI/ML Engineer. Produits, architectures évolutives et recherche en AI Safety.',
  email: 'koffikanmarcephrem@gmail.com',
  github: 'https://github.com/marc0410',
  linkedin: 'https://www.linkedin.com/in/marc-ephrem-koffi',
  cv: '/Koffi-Marc-Ephrem-CV.pdf',
  location: 'Abidjan, Côte d’Ivoire',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ctokoffi.me').replace(/\/$/, ''),
};
