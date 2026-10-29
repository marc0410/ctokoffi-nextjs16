'use client';

import { useEffect } from 'react';
import type { Locale } from '@/i18n/config';

export function LocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

