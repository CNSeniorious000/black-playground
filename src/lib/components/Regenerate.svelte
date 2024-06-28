<script lang="ts">
  import { ensurePromplate, makeSource } from "$lib/prompt"
  import { promplateReady } from "$lib/stores"
  import { onMount } from "svelte"
  import { scale } from "svelte/transition"

  export let source: string
  export let generating = false

  async function regenerate() {
    generating = true

    for await (const context of makeSource(source)) source = context.result.replaceAll("\r\n", "\n").replace(/```.*(?:\n([\s\S]*?))?(\n```|$)/, "$1")

    generating = false
  }

  onMount(ensurePromplate)
</script>

{#if $promplateReady}
  <button in:scale={{ start: 0.8 }} class="absolute bottom-4 right-4 aspect-square w-8 overflow-hidden rounded-md bg-white/10 backdrop-blur-md transition [&>div]:(absolute left-1/2 top-1/2 -translate-1/2) 2xl:(bottom-5 right-5 w-10) lg:(bottom-4 right-4 w-8) md:(bottom-5 right-5 w-10) active:bg-white/30 disabled:(bg-white text-neutral-8) hover:bg-white/15" on:click|trusted={regenerate} disabled={generating}>
    {#if generating}
      <div transition:scale={{ start: 5 }} class="i-svg-spinners-90-ring-with-bg 2xl:text-lg lg:text-base md:text-lg" />
    {:else}
      <div transition:scale class="i-fe-random 2xl:text-xl lg:text-base md:text-xl" />
    {/if}
  </button>
{/if}
