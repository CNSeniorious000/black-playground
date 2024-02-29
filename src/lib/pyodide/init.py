# type: ignore

from micropip import install

await install("black")

from black import Mode, format_str
