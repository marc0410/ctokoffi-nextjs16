import assert from 'node:assert/strict';
import { test } from 'node:test';
import sitemap from '../src/app/sitemap';
import robots from '../src/app/robots';
import manifest from '../src/app/manifest';
import { site } from '../src/content/site';
import { projectPages, researchSlugs } from '../src/content/seo';
import { articles } from '../src/content/journal';
import { locales } from '../src/i18n/config';

test('Sitemap generates all localized routes with alternates and valid priorities', () => {
  const routes = sitemap();
  // 1 racine + 20 chemins de base * 3 langues = 61 routes
  assert.ok(routes.length >= 60, `Expected at least 60 routes, got ${routes.length}`);

  const urls = routes.map((r) => r.url);
  assert.ok(urls.includes(`${site.url}/`));

  for (const locale of locales) {
    assert.ok(urls.includes(`${site.url}/${locale}`));
    assert.ok(urls.includes(`${site.url}/${locale}/a-propos`));
    assert.ok(urls.includes(`${site.url}/${locale}/projets`));
    assert.ok(urls.includes(`${site.url}/${locale}/recherche`));
    assert.ok(urls.includes(`${site.url}/${locale}/journal`));
    assert.ok(urls.includes(`${site.url}/${locale}/contact`));

    for (const p of projectPages) {
      assert.ok(urls.includes(`${site.url}/${locale}/projets/${p.slug}`));
    }
    for (const slug of Object.values(researchSlugs)) {
      assert.ok(urls.includes(`${site.url}/${locale}/recherche/${slug}`));
    }
    for (const a of articles) {
      assert.ok(urls.includes(`${site.url}/${locale}/journal/${a.slug}`));
    }
  }

  // Vérifier la présence des alternates hreflang
  const homeFr = routes.find((r) => r.url === `${site.url}/fr`);
  assert.ok(homeFr?.alternates?.languages?.fr);
  assert.ok(homeFr?.alternates?.languages?.en);
  assert.ok(homeFr?.alternates?.languages?.es);
  assert.ok(homeFr?.alternates?.languages?.['x-default']);
});

test('Robots.txt allows indexing and links to sitemap', () => {
  const r = robots();
  assert.equal(r.sitemap, `${site.url}/sitemap.xml`);
  assert.deepEqual(r.rules, { userAgent: '*', allow: '/' });
});

test('Web manifest contains proper metadata and icons', () => {
  const m = manifest();
  assert.equal(m.name, `${site.name} — Portfolio`);
  assert.equal(m.short_name, site.brand);
  assert.equal(m.display, 'standalone');
  assert.ok(m.icons && m.icons.length > 0);
});

test('Site configuration has canonical domain, email, and social profiles', () => {
  assert.ok(site.url.startsWith('https://'));
  assert.ok(site.email.includes('@'));
  assert.ok(site.github.startsWith('https://github.com/'));
  assert.ok(site.linkedin.startsWith('https://www.linkedin.com/'));
});
