import antfu from "@antfu/eslint-config"

export default antfu({
  svelte: true,
  typescript: true,
  stylistic: {
    quotes: "double",
  },
  formatters: true,
  unocss: true,
  rules: {
    "perfectionist/sort-imports": ["error", {
      groups: ["type", ["side-effect", "side-effect-style"]],
    }],
    "import/order": "off",
    "svelte/no-at-html-tags": "off",
    "no-console": "warn",
    "no-self-assign": "off",
    "ts/no-redeclare": "warn",
  },
  overrides: {
    svelte: {
      "import/no-mutable-exports": "off",
    },
  },
})
