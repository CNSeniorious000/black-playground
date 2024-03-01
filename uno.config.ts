import extractorSvelte from "@unocss/extractor-svelte"
import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss"

const config = defineConfig({
  extractors: [extractorSvelte()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  presets: [presetUno(), presetWebFonts({ fonts: { mono: "Fira Code:300,400,500,600,700", fancy: "Bungee" } }), presetIcons(), presetTypography()],
})

export default config
