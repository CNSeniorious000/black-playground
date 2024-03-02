<script lang="ts">
  import type { Options } from "$lib/format"

  import Toggle from "./Toggle.svelte"
  import { cubicIn, cubicOut } from "svelte/easing"
  import { scale } from "svelte/transition"

  export let show: boolean

  export let options: Options

  function handleVersionClick(v: number) {
    return () => {
      const versions = options.target_versions
      versions.has(v) ? versions.delete(v) : versions.add(v)
      options = options
    }
  }
</script>

<div class="mb-30vmin max-w-lg w-3/4 select-none">
  <div in:scale|global={{ start: 0.95, easing: cubicOut }} out:scale|global={{ start: 0.97, easing: cubicIn, duration: 300 }} class="flex flex-col gap-2 rounded-lg bg-neutral-8/60 p-4 ring-1.3 ring-white/20 backdrop-blur-md xl:max-w-3xl sm:gap-3">
    <div class="flex flex-row items-center justify-between">
      <h3 class="text-lg font-fancy">options</h3>
      <button class="rounded-md bg-transparent p-1.5 text-white/80 transition-colors hover:(bg-red-3/10 text-red-3/80)" on:click={() => (show = false)}>
        <div class="i-material-symbols-close-rounded" />
      </button>
    </div>
    <section class="mt-1 flex flex-col gap-3 capitalize [&>hgroup]:(flex flex-col gap-2)">
      <hgroup>
        <h4>line length</h4>
        <div class="flex flex-row gap-1.5 -my-0.5">
          <input type="range" min="1" max="120" bind:value={options.line_length} class="w-full accent-neutral-1" aria-label="line length">
          <span class="w-2em text-right font-mono">{options.line_length}</span>
        </div>
      </hgroup>

      <hgroup>

        <h4>misc</h4>
        <div class="flex flex-row flex-wrap gap-1.5">
          <Toggle label="string normalization" bind:selected={options.string_normalization} />
          <Toggle label="is pyi" bind:selected={options.is_pyi} />
          <Toggle label="magic trailing comma" bind:selected={options.magic_trailing_comma} />
          <Toggle label="preview" bind:selected={options.preview} />
          <Toggle label="unstable" bind:selected={options.unstable} />
        </div>
      </hgroup>

      <hgroup>

        <h4>python versions</h4>
        <div class="flex flex-row flex-wrap gap-1.5">
          {#each [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as v}
            <button class="rounded-md bg-white/8 px-1.5 py-1 text-sm transition-colors hover:bg-white/14 [&.selected]:(text-neutral-8) ![&.selected]:bg-neutral-1 [&.selected:hover]:!bg-neutral-3" class:selected={options.target_versions.has(v)} on:click={handleVersionClick(v)} class:!bg-white={options.target_versions.has(v)}>3.{v}</button>
          {/each}
        </div>
      </hgroup>
    </section>
  </div>
</div>
