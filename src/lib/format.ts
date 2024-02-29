import type { PyCallable } from "pyodide/ffi"

import getPy from "./pyodide"

export async function format(source: string) {
  const py = await getPy()
  const format: PyCallable = py.globals.get("format_str")
  const Mode = py.globals.get("Mode")
  return format.callKwargs({ src_contents: source, mode: Mode() }) as string
}
