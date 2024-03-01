<script lang="ts">
  import { browser } from "$app/environment"
  import Editor from "$lib/components/Editor.svelte"
  import Modal from "$lib/components/Modal.svelte"
  import example from "$lib/example.txt?raw"
  import { pyodideReady } from "$lib/stores"
  import { cubicIn, cubicOut } from "svelte/easing"
  import { scale } from "svelte/transition"

  export let source = example

  let output = ""

  async function update(source: string) {
    const { format } = await import("../lib/format")
    output = await format(source)
  }

  $: browser && update(source)
</script>

<div class="mx-4vmin mt-4vmin h-[calc(100vh-8vmin)] max-w-450 w-[calc(100vw-8vmin)] flex flex-col gap-[min(4vmin,1.5rem)] lg:(flex-row gap-2vmin)">
  <Editor bind:source />
  <Editor bind:source={output} derived />
</div>

<Modal show={!$pyodideReady}>
  <svelte:fragment slot="content">
    {#await Promise.resolve() then _}
      <div in:scale={{ easing: cubicOut, start: 0.85 }} out:scale|global={{ easing: cubicIn, start: 0.9 }} class="flex flex-row items-center gap-2 rounded-lg bg-neutral-7/20 p-3.5 text-white/70 backdrop-blur-md">
        <div class="i-svg-spinners-90-ring-with-bg text-lg md:text-lg" />
        <div class="text-sm md:text-base">loading python runtime ...</div>
      </div>
    {/await}
  </svelte:fragment>
</Modal>
