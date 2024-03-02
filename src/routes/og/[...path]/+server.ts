import type { EntryGenerator } from "./$types"
import type { RequestHandler } from "@sveltejs/kit"

import component from "./OG.svelte"
import { ImageResponse } from "@ethercorps/sveltekit-og"

export const GET: RequestHandler = async ({ url: { origin }, params: { path } }) => {
  const context = {
    title: "black interactive playground",
    subtitle: "the uncompromising code formatter",
    href: `${origin}/${decodeURI(path ?? "")}`.replace(/\..*$/, ""),
  }
  const html = (component as any).render(context).html.replaceAll("class=", "tw=")
  return new ImageResponse(html)
}

export const entries: EntryGenerator = () => [{ path: ".png" }]
export const prerender = true
