import { cacheGlobally } from "./utils/cache"

export async function getHighlighter(lang: string) {
  return await cacheGlobally(`shiki-${lang}`, async () => {
    const { getHighlighter } = await import("shiki")
    return await getHighlighter({ themes: ["vitesse-dark"], langs: [lang] })
  })()
}
