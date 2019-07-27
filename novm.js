/// novm.js by Nommiin (2019)
novm = {
    // the version
    Version: 0.1,
    // includes runtime
    Core: {
        /// @description Takes instructions and runs in a unique context
        /// @argument input List of parsed instructions
        Execute: function(input, Stack=[]) {
            input.forEach(Instruction => {
                switch (Instruction.Opcode) {

                    case 0x00: { // Push
                        Stack.push(Instruction.Operand);
                        break;
                    }

                    case 0x01: { // Duplicate
                        if (Stack.length < 1) {}// TODO: Error @ Not Enough Values
                        Stack.push(Stack[Stack.length - 1]);
                        break;
                    }

                    case 0x02: { // Invoke
                        let Found = false;
                        if (Instruction.Operand in novm.Interface) {
                            Found = true;
                            novm.Interface[Instruction.Operand](Stack);
                        }

                        if (Found == false) // TODO: Error @ Unknown Function
                        break;
                    }

                    case 0x03: { // Define
                        // TODO: Allow for function definitions
                        break;
                    }

                    case 0x04: { // Add
                        if (Stack.length < 2) {}// TODO: Error @ Not Enough Values
                        let a = Stack.pop(), b = Stack.pop();
                        Stack.push(b + a);
                        break;
                    }

                    case 0x05: { // Subtract
                        if (Stack.length < 2) {}// TODO: Error @ Not Enough Values
                        let a = Stack.pop(), b = Stack.pop();
                        Stack.push(b - a);
                        break;
                    }

                    case 0x06: { // Divide
                        if (Stack.length < 2) {}// TODO: Error @ Not Enough Values
                        let a = Stack.pop(), b = Stack.pop();
                        Stack.push(b / a);
                        break;
                    }

                    case 0x07: { // Multiply
                        if (Stack.length < 2) {}// TODO: Error @ Not Enough Values
                        let a = Stack.pop(), b = Stack.pop();
                        Stack.push(b * a);
                        break;
                    }

                    default: {
                        // TODO: Error @ Bad Opcode
                        console.log("BAD OPCODE");
                        break;
                    }
                }

            });

            console.log(Stack);
        }
    },
    // includes instruction parser
    Parser: {
        /// @description Parses instruction into opcode and operand (+other data)
        /// @argument instruction Takes a string and parses it into instruction object
        Parse: function(instruction) {
            let Instruction = instruction.trim(), Opcode = -1, Operand = novm.Parser.Type(Instruction.slice(1));
            switch (Instruction[0]) {
                case ">": Opcode = 0x00; break; // Push
                case "<": Opcode = 0x01; break; // Duplicate
                case "&": Opcode = 0x02; break; // Invoke
                case "|": Opcode = 0x03; break; // Define
                case "+": Opcode = 0x04; break; // Add
                case "-": Opcode = 0x05; break; // Subtract
                case "/": Opcode = 0x06; break; // Divide
                case "*": Opcode = 0x07; break; // Multiply
                default: {
                    // TODO: Error @ Bad/Unknown Instruction
                    break;
                }
            }
            return {Opcode: Opcode, Operand: Operand};
        },
        /// @description Gets an operand and casts to the correct type
        /// @argument operand The operand to parse
        Type: function(operand) {
            let AsNumber = parseFloat(operand);
            if (isNaN(AsNumber) == true) return operand;
            return AsNumber;
        }
    },
    // includes native functions
    Interface: {
        // @description A simple function to print to the native console
        "__print__": function(stack) {
            console.log(stack.pop());
        }
    }
}

/*
novm.Core.Execute([
    novm.Parser.Parse(">Hello World!"),
    novm.Parser.Parse("&__print__")
]);
*/