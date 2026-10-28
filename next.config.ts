import type { NextConfig } from 'next';
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(process.env.STATIC_EXPORT === 'true' ? { output: 'export', trailingSlash: true } : {}),
};
export default config;
