import { pyodideReady } from "../stores"
import { cacheSingleton } from "../utils/cache"
import { dev } from "$app/environment"
import * as env from "$env/static/public"

const indexURL = dev ? "https://cdn.jsdelivr.net/pyodide/v0.26.3/full/" : "/pyodide/v0.26.3/"

export const initPyodide = cacheSingleton(async () => {
  const { loadPyodide } = await import("pyodide")
  return await loadPyodide({ indexURL, packages: ["micropip"], env: { ...env } })
})

async function initPy() {
  const [py, { default: initCode }] = await Promise.all([initPyodide(), import("./init.py?raw")])
  await py.runPythonAsync(initCode)
  pyodideReady.set(true)
  return py
}

export default cacheSingleton(initPy)
