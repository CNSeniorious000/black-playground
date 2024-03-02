from typing import TypedDict

from micropip import install
from pyodide.ffi import JsProxy

await install("black")  # type: ignore

from black import format_str
from black.mode import Mode, TargetVersion


class Options(TypedDict):
    target_versions: set[int]
    line_length: int
    string_normalization: bool
    is_pyi: bool
    magic_trailing_comma: bool
    preview: bool
    unstable: bool


def format(source: str, js_options: JsProxy):
    options: Options = js_options.to_py()
    mode = Mode({TargetVersion(v) for v in options.pop("target_versions")}, **options)  # type: ignore
    return format_str(source, mode=mode)
