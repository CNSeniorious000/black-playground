import type { RequestHandler } from "@sveltejs/kit"

import component from "./OG.svelte"
import { ImageResponse } from "@ethercorps/sveltekit-og"

export const GET: RequestHandler = async ({ url: { origin }, params: { path } }) => {
  const context = {
    title: "black interactive playground",
    subtitle: "the uncompromising code formatter",
    href: `${origin}/${decodeURI(path ?? "")}`,
  }
  const html = (component as any).render(context).html.replaceAll("class=", "tw=")
  return new ImageResponse(html)
}
