# @adviverse/svelte

Svelte ad slot for [Adviverse](https://adviverse.com), built on the
[`@adviverse/element`](https://github.com/Adviverse/element) `<adviverse-ad>` web component. SSR-safe (SvelteKit-friendly): the element is only loaded in `onMount`.

## Install

```sh
npm i @adviverse/svelte
```

## Usage

```svelte
<script>
  import { AdSlot } from '@adviverse/svelte';
</script>

<AdSlot tag="tk_…" sizes="300x250" />
```

Props: `tag` (required), `sizes` (optional). Changing a prop re-renders the slot.

The package ships `.svelte` source; your Svelte toolchain (vite-plugin-svelte / SvelteKit) compiles it.

MIT
