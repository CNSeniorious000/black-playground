import type { PyodideInterface } from "pyodide"

import initPy from "../pyodide"
import * as env from "$env/static/public"
import { promplateReady } from "$lib/stores"
import { cacheSingleton } from "$lib/utils/cache"

let py: PyodideInterface

export const ensurePromplate = cacheSingleton(async () => {
  if (!env.PUBLIC_OPENAI_API_KEY && !env.PUBLIC_OPENAI_BASE_URL)
    return

  const [pyodide, { default: installCode }, { OpenAI }, version] = await Promise.all([initPy(), import("./init.py?raw"), import("openai"), import("openai/version")])
  pyodide.registerJsModule("openai", { OpenAI, version, __all__: [] })
  await pyodide.runPythonAsync(installCode)

  promplateReady.set(true)
  py = pyodide
})

type Context = Record<string, any>

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  name?: string
}

type AsyncGenerate = (prompt: string | Message[]) => AsyncIterable<string>
type AsyncComplete = (prompt: string | Message[]) => Promise<string>

interface Node {
  astream: <T extends Context>(context?: T, generate?: AsyncGenerate) => AsyncIterable<T & Context & { result: string }>
  ainvoke: <T extends Context>(context?: T, generate?: AsyncComplete) => Promise<T & Context & { result: string }>
}

function Node(template: string): Node {
  return py.runPython("Node")(template)
}

function AsyncGenerate(): AsyncGenerate {
  return py.runPython("generate")
}

export async function* makeSource(previous_source: string) {
  const [_, { default: template }] = await Promise.all([ensurePromplate(), import("./template.j2?raw")])
  const generate = AsyncGenerate()
  const node = Node(template)
  yield* node.astream({ previous_source }, generate)
}
