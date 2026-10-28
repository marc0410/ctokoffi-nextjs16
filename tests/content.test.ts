import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { projects } from '../src/content/projects';
import { articles, publications } from '../src/content/journal';

test('Project identifiers stay unique and external URLs use HTTPS', () => {
  assert.equal(projects.length, 9);
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  for (const p of projects) {
    assert.ok(p.name && p.summary && p.challenge && p.approach && p.outcome);
    if (p.url) assert.equal(new URL(p.url).protocol, 'https:');
  }
});
test('Article slugs are unique and compatible with static routes', () => {
  assert.equal(new Set(articles.map((a) => a.slug)).size, articles.length);
  for (const a of articles) {
    assert.match(a.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(a.sections.length > 0);
    assert.ok(a.intro && a.takeaway);
  }
});
test('Publications keep the matching DOI and PDF record', () => {
  for (const p of publications) {
    const record = p.url.split('/').at(-1);
    assert.ok(record);
    assert.equal(p.doi, `10.5281/zenodo.${record}`);
    assert.ok(p.pdf.startsWith(p.url + '/files/'));
    assert.ok(p.pdf.endsWith('.pdf'));
  }
});
test('The downloadable CV is an actual included PDF', () => {
  assert.equal(
    readFileSync(new URL('../public/Koffi-Marc-Ephrem-CV.pdf', import.meta.url))
      .subarray(0, 5)
      .toString(),
    '%PDF-',
  );
});
