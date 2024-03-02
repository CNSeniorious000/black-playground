<script lang="ts">
  import { scale } from "svelte/transition"

  export let label: string
  export let selected: boolean
</script>

<button class="w-fit flex flex-row-reverse items-center gap-0.8 rounded-md bg-white/8 py-1 pl-1.5 pr-2 outline-none ring-neutral-2 transition-colors hover:bg-white/14 focus-visible:ring-1.5" class:!bg-neutral-1={selected} class:hover:!bg-neutral-3={selected} class:text-neutral-8={selected} type="button" on:click={() => selected = !selected}>
  <h5 class="text-sm">{label}</h5>
  <div class="relative aspect-square w-4.2">
    {#if selected}
      <div transition:scale={{ start: 0, duration: 350 }} class="i-mdi-check absolute h-full w-full"></div>
    {:else}
      <div transition:scale={{ start: 0, duration: 350 }} class="i-mdi-close absolute h-full w-full"></div>
    {/if}
  </div>
</button>
