<script>
  import { onMount } from 'svelte';

  export let tag;
  export let sizes = undefined;

  // Registers <adviverse-ad> on the client only (onMount never runs during SSR).
  onMount(() => {
    void import('@adviverse/element');
  });
</script>

<adviverse-ad {tag} {sizes}></adviverse-ad>
