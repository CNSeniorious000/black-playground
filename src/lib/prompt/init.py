# type: ignore

from micropip import install

await install(
    [
        "promplate==0.3.3.4",
        "promplate-pyodide==0.0.3",
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
).bind(model="gpt-3.5-turbo-0125")
