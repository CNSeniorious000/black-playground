<script lang="ts">
  export let show: boolean
</script>

<slot name="backdrop">
  <div class="pointer-events-none fixed inset-0 transition duration-1000" class:backdrop-grayscale={show} />
</slot>

{#if show}
  <slot>
    <div class="fixed inset-0 z-100 grid place-items-center">
      <slot name="content" />
    </div>
  </slot>
{/if}
