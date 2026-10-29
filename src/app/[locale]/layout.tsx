import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { LocaleSync } from '@/components/i18n/LocaleSync';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <LocaleSync locale={locale} />
      {children}
    </>
  );
}

