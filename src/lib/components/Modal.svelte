<script lang="ts">
  import { onMount } from "svelte"

  export let show: boolean

  export let ssr = false

  let mounted = false

  $: showModal = show && (ssr || mounted)

  onMount(() => mounted = true)
</script>

<slot name="backdrop">
  <div class="pointer-events-none absolute inset-0 transition duration-1000" class:backdrop-grayscale={show} />
</slot>

{#if showModal}
  <slot>
    <div class="absolute inset-0 z-100 grid place-items-center">
      <slot name="content" />
    </div>
  </slot>
{/if}
