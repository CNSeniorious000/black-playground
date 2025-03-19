import { cacheGlobally } from "./utils/cache"

export async function getHighlighter(lang: string) {
  return await cacheGlobally(`shiki-${lang}`, async () => {
    const { getSingletonHighlighter } = await import("shiki")
    return await getSingletonHighlighter({ themes: ["vitesse-dark"], langs: [lang] })
  })()
}
