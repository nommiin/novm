
NOTES + SPEC
\/\/\/\/\/\/

novm is a stack-based interpreted language 
the idea is that each instruction is defined as a single character opcode followed by an operand
example structure: >10000
      push opcode -^  ^- operand to push

the operand can be either a number or string
variables do not exist, instead you reference instruction indices
references can be direct or relative
- direct: an exact line number
- relative: -1 will reference the previous instruction, +1 will reference the next instruction
functions can be invoked using &
builtin functions are pre/post-fixed with __
functions are defined with | and all proceeding instructions are included
+, -, *, and / are all supported math opcodes, will read from stack

Opcodes:
">" = Push
"<" = Duplicate
"&" = Invoke
"|" = Define
"+" = Add
"-" = Subtract
"/" = Divide
"*" = Multiply