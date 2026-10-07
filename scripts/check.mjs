// Source-shipped package: "build" validates the Svelte component compiles (client + SSR).
import { readFileSync } from 'node:fs';
import { compile } from 'svelte/compiler';
const src = readFileSync(new URL('../src/AdSlot.svelte', import.meta.url), 'utf8');
for (const generate of ['client', 'server']) compile(src, { generate, filename: 'AdSlot.svelte' });
console.log('AdSlot.svelte compiles (client + server)');
