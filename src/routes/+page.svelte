<script lang="ts">
  import { type Options, defaultOptions } from "../lib/format"
  import { browser } from "$app/environment"
  import Editor from "$lib/components/Editor.svelte"
  import Modal from "$lib/components/Modal.svelte"
  import Regenerate from "$lib/components/Regenerate.svelte"
  import Settings from "$lib/components/Settings.svelte"
  import example from "$lib/example.txt?raw"
  import { pyodideReady } from "$lib/stores"
  import { cubicIn, cubicOut } from "svelte/easing"
  import { scale } from "svelte/transition"

  let source = example

  let options = defaultOptions

  let showSettings = false

  let output = ""

  let generating = false

  async function update(source: string, options: Options) {
    const { format } = await import("../lib/format")
    output = await format(source, options)
  }

  $: browser && update(source, options)
</script>

<div class="mx-4vmin mt-4vmin h-[calc(100vh-8vmin)] max-w-450 w-[calc(100vw-8vmin)] flex flex-col gap-[min(4vmin,1.5rem)] lg:(flex-row gap-2vmin)">
  <div class="relative h-1/2 flex flex-col gap-2.5 lg:h-full lg:w-1/2 sm:gap-1">
    <header class="flex flex-row justify-between">
      <div class="translate-y-0.5 select-none sm:-translate-y-1.5">
        <h1 class="text-3xl font-fancy">black</h1>
        <h2 class="whitespace-nowrap text-xs font-bold tracking-wide capitalize op-30 <sm:hidden">the uncompromising python code formatter</h2>
      </div>
      <nav class="h-fit flex flex-row gap-2 [&>a,&>button]:(rounded-md bg-white/5 p-2.5 text-lg outline-none transition sm:p-3) [&>a:hover,&>button:hover]:(bg-white/10)">
        <a href="https://github.com/psf/black">
          <div class="i-uiw-github" />
        </a>
        <a href="https://black.readthedocs.io/">
          <div class="i-cib-read-the-docs" />
        </a>
        <button aria-label="options" type="button" on:click={() => showSettings = true}>
          <div class="i-fluent-settings-32-filled transition-transform duration-500" class:rotate-30={showSettings} />
        </button>
      </nav>
    </header>
    <Editor bind:source derived={generating} />
    <Regenerate bind:source bind:generating />
  </div>
  <div class="h-1/2 flex flex-col lg:(h-full w-1/2 gap-2.5)">
    <Editor bind:source={output} derived />
    <footer class="flex flex-row select-none justify-between text-xs text-neutral-7 <lg:hidden [&_a:hover]:text-white [&_a]:(text-neutral-4 transition-color)">
      <div class="flex flex-row gap-1">
        <a href="https://black.readthedocs.io/en/stable/the_black_code_style">
          black code style
        </a>
        |
        <a href="https://github.com/CNSeniorious000/black-playground">
          playground repo
        </a>
      </div>
      <div>
        Playground built by
        <a href="https://github.com/CNSeniorious000">Muspi Merol</a>
      </div>
    </footer>
  </div>
</div>

<Modal show={!$pyodideReady}>
  <div slot="content" in:scale={{ easing: cubicOut, start: 0.85 }} out:scale|global={{ easing: cubicIn, start: 0.9 }} class="flex flex-row items-center gap-2 rounded-lg bg-neutral-8/60 p-3.5 text-white/70 backdrop-blur-md">
    <div class="i-svg-spinners-90-ring-with-bg text-lg md:text-lg" />
    <div class="text-sm md:text-base">loading python runtime ...</div>
  </div>
</Modal>

<Modal show={showSettings}>
  <svelte:component slot="content" this={Settings} bind:show={showSettings} bind:options />
  <svelte:fragment slot="backdrop">
    <div class="pointer-events-none absolute inset-0 bg-op-30 transition duration-400" class:duration-700={!showSettings} class:bg-neutral-9={showSettings} />
  </svelte:fragment>
</Modal>
