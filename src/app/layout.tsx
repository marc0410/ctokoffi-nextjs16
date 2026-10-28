import type { Metadata } from 'next';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './globals.css';
import { site } from '@/content/site';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s | Koffi' },
  description: site.description,
  authors: [{ name: site.name, url: `${site.url}/a-propos` }],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Koffi — Engineering tomorrow.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og.png'],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-background text-foreground antialiased">
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
