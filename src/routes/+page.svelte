<script lang="ts">
  import { browser } from "$app/environment"
  import Editor from "$lib/components/Editor.svelte"
  import example from "$lib/example.txt?raw"
  import { format } from "$lib/format"

  export let source = example

  let output = ""

  async function update(source: string) {
    output = await format(source)
  }

  $: browser && update(source)
</script>

<div class="mx-20 mt-20 max-w-100rem w-[calc(100vw-10rem)] flex flex-row gap-7">
  <Editor bind:source />
  <Editor bind:source={output} derived />
</div>
