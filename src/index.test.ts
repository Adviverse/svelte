import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { compile } from 'svelte/compiler';

// Lighter test (no DOM mount): SSR-compile + server-render the component with NO window,
// and assert the source wires adviverse-ad + onMount-only element import.
const url = new URL('./AdSlot.svelte', import.meta.url);
const src = readFileSync(url, 'utf8');

test('component source uses adviverse-ad and client-only onMount import', () => {
  assert.match(src, /<adviverse-ad/);
  assert.match(src, /onMount\(/);
  assert.match(src, /import\('@adviverse\/element'\)/);
  assert.ok(!/^\s*import ['"]@adviverse\/element['"]/m.test(src), 'no static element import');
});

test('SSR: server-renders <adviverse-ad> with no window/document', async () => {
  assert.equal(typeof window, 'undefined');
  assert.equal(typeof document, 'undefined');
  const js = compile(src.replace(' lang="ts"', '').replace(': string | undefined', '').replace(': string', ''), { generate: 'server', filename: 'AdSlot.svelte' }).js.code;
  const out = new URL('./_ssr_tmp.mjs', import.meta.url);
  writeFileSync(out, js);
  try {
    const mod = await import(out.href);
    const { render } = await import('svelte/server');
    const { body } = render(mod.default, { props: { tag: 'tk_ssr', sizes: '300x250' } });
    assert.match(body, /<adviverse-ad[^>]*tag="tk_ssr"/);
    assert.match(body, /sizes="300x250"/);
  } finally {
    rmSync(out, { force: true });
  }
});
