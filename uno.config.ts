import extractorSvelte from "@unocss/extractor-svelte"
import { defineConfig, presetIcons, presetTypography, presetWebFonts, presetWind3, transformerDirectives, transformerVariantGroup } from "unocss"

const config = defineConfig({
  extractors: [extractorSvelte()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  presets: [presetWind3({ preflight: "on-demand" }), presetWebFonts({ fonts: { mono: "Fira Code:300,400,500,600,700", fancy: "Bungee" } }), presetIcons(), presetTypography()],
})

export default config
