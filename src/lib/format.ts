import type { PyCallable } from "pyodide/ffi"

import getPy from "./pyodide"
import { cacheSingleton } from "./utils/cache"

enum TargetVersion {
  PY33 = 3,
  PY34 = 4,
  PY35 = 5,
  PY36 = 6,
  PY37 = 7,
  PY38 = 8,
  PY39 = 9,
  PY310 = 10,
  PY311 = 11,
  PY312 = 12,
}

export interface Options {
  target_versions: Set<TargetVersion>
  line_length: number
  string_normalization: boolean
  is_pyi: boolean
  magic_trailing_comma: boolean
  preview: boolean
  unstable: boolean
}

export const defaultOptions: Options = {
  target_versions: new Set(),
  line_length: 88,
  string_normalization: true,
  is_pyi: false,
  magic_trailing_comma: true,
  preview: false,
  unstable: false,
}

let getFormat = async () => {
  const py = await getPy()
  const format: PyCallable = py.globals.get("format")
  return format
}

getFormat = cacheSingleton(getFormat)

export async function format(source: string, options?: Options) {
  const format = await getFormat()
  return format(source, options) as string
}
