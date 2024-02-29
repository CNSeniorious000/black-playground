<script lang="ts">
  import { browser } from "$app/environment"
  import Editor from "$lib/components/Editor.svelte"
  import example from "$lib/example.txt?raw"

  export let source = example

  let output = ""

  async function update(source: string) {
    const { format } = await import("../lib/format")
    output = await format(source)
  }

  $: browser && update(source)
</script>

<div class="mx-4vmin mt-4vmin h-[calc(100vh-8vmin)] max-w-400 w-[calc(100vw-8vmin)] flex flex-col gap-[min(4vmin,1.5rem)] lg:(flex-row gap-2vmin)">
  <Editor bind:source />
  <Editor bind:source={output} derived />
</div>
