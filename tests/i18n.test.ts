import assert from 'node:assert/strict';
import { test } from 'node:test';
import { locales, isValidLocale, getLocalizedPath } from '../src/i18n/config';
import { getDictionary } from '../src/i18n/get-dictionary';
import {
  getLocalizedProjects,
  getLocalizedPublications,
  getLocalizedArticles,
  getLocalizedExperiences,
  getLocalizedSkillGroups,
} from '../src/content/i18n-content';

test('Locales list contains fr, en, es and validates correctly', () => {
  assert.deepEqual(locales, ['fr', 'en', 'es']);
  assert.equal(isValidLocale('fr'), true);
  assert.equal(isValidLocale('en'), true);
  assert.equal(isValidLocale('es'), true);
  assert.equal(isValidLocale('de'), false);
  assert.equal(isValidLocale(''), false);
});

test('getLocalizedPath rewrites paths accurately', () => {
  assert.equal(getLocalizedPath('/', 'en'), '/en');
  assert.equal(getLocalizedPath('/fr', 'en'), '/en');
  assert.equal(getLocalizedPath('/fr/projets', 'en'), '/en/projets');
  assert.equal(getLocalizedPath('/fr/projets/fvundi', 'es'), '/es/projets/fvundi');
  assert.equal(getLocalizedPath('/en/contact', 'fr'), '/fr/contact');
  assert.equal(getLocalizedPath('/recherche', 'es'), '/es/recherche');
});

test('Dictionaries are complete and valid for all 3 locales', () => {
  for (const locale of locales) {
    const dict = getDictionary(locale);
    assert.ok(dict.nav.about);
    assert.ok(dict.nav.projects);
    assert.ok(dict.nav.research);
    assert.ok(dict.nav.journal);
    assert.ok(dict.nav.contact);
    assert.ok(dict.hero.byline);
    assert.ok(dict.projects.filterAll);
    assert.ok(dict.cookies.title);
    assert.ok(dict.cookies.accept);
    assert.ok(dict.cookies.refuse);
  }
});

test('Localized content returns complete entries for all locales', () => {
  for (const locale of locales) {
    const projects = getLocalizedProjects(locale);
    assert.equal(projects.length, 9);
    for (const p of projects) {
      assert.ok(p.id && p.name && p.summary && p.challenge && p.approach && p.outcome);
    }

    const pubs = getLocalizedPublications(locale);
    assert.equal(pubs.length, 2);
    for (const pub of pubs) {
      assert.ok(pub.id && pub.title && pub.summary && pub.doi);
    }

    const articles = getLocalizedArticles(locale);
    assert.equal(articles.length, 3);
    for (const a of articles) {
      assert.ok(a.slug && a.title && a.excerpt && a.intro && a.takeaway);
    }

    const exps = getLocalizedExperiences(locale);
    assert.equal(exps.length, 5);
    for (const [period, role, company, desc] of exps) {
      assert.ok(period && role && company && desc);
    }

    const skills = getLocalizedSkillGroups(locale);
    assert.equal(skills.length, 4);
    for (const [num, title, items] of skills) {
      assert.ok(num && title && items.length > 0);
    }
  }
});
