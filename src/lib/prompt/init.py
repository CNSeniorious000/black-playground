# type: ignore

from micropip import install

await install(
    [
        "promplate==0.3.4.9",
        "promplate-pyodide==0.0.3.2",
    ]
)

from promplate_pyodide import patch_all

await patch_all()

from os import getenv

from promplate import *
from promplate.llm.openai import *

generate = AsyncChatGenerate(
    api_key=getenv("PUBLIC_OPENAI_API_KEY"),
    base_url=getenv("PUBLIC_OPENAI_BASE_URL"),
).bind(model=getenv("PUBLIC_OPENAI_MODEL", "gpt-4o-mini"))
