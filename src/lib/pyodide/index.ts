import { pyodideReady } from "../stores"
import { dev } from "$app/environment"
import { cacheSingleton } from "$lib/utils/cache"

const indexURL = dev ? "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/" : "/pyodide/"

async function initPyodide() {
  const { loadPyodide } = await import("pyodide")
  return await loadPyodide({ indexURL, packages: ["micropip"] })
}

async function initPy() {
  const [py, { default: initCode }] = await Promise.all([initPyodide(), import("./init.py?raw")])
  await py.runPythonAsync(initCode)
  pyodideReady.set(true)
  return py
}

export default cacheSingleton(initPy)
