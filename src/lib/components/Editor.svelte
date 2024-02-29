<script lang="ts">
  import type { editor as Editor } from "monaco-editor-core/esm/vs/editor/editor.api"

  import { shikiToMonaco } from "@shikijs/monaco"
  import { getHighlighter } from "$lib/highlight"
  import { onMount } from "svelte"

  let container: HTMLDivElement

  export let source: string
  export let derived = false

  export let lang = "python"

  let editor: Editor.IStandaloneCodeEditor

  onMount(async () => {
    const monaco = await import("monaco-editor-core")
    const highlighter = await getHighlighter(lang)
    monaco.languages.register({ id: lang })
    shikiToMonaco(highlighter, monaco)

    editor = monaco.editor.create(container, {
      value: source,
      readOnly: derived,
      language: lang,
      theme: "vitesse-dark",
      fontFamily: "fira code",
      smoothScrolling: true,
      lineHeight: 1.6,
      minimap: { enabled: false },
      fontLigatures: true,
      lineNumbers: "interval",
      roundedSelection: false,
      cursorBlinking: "phase",
      wordWrap: "off",
      cursorSmoothCaretAnimation: "explicit",
      renderLineHighlight: "all",
      renderLineHighlightOnlyWhenFocus: true,
      padding: { top: 24 },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    })

    editor.onDidChangeModelContent(() => (source = editor.getValue()))
  })

  $: derived && editor?.setValue(source)
</script>

<div bind:this={container} class="h-full w-full overflow-hidden b-1 b-white/10 rounded-md" />
