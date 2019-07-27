Page = {
    Input: undefined,
    Output: undefined,
    Stack: [],
    Write: function(value, color="white") {
        if (Page.Output != undefined) {
            Page.Output.innerHTML += "<font color=\"" + color + "\">" + value + "</font>";
        }
    },
    WriteLine: function(value, color="white") {
        Page.Write(value + "\n", color);
    },
    Process: function(input) {
        if (input.keyCode != 13) return;
        let Instruction = Page.Input.value.trim();
        switch (Instruction[0]) {
            case ".": { // Comment/Command
                if (Instruction[1] == "?") {
                    Page.ProcessMeta(Instruction.slice(2));
                }
                break;
            }

            default: { // Instruction
                Page.WriteLine(Instruction, "gray");
                let Instructions = [];
                Instruction.split(",").forEach(_Instruction => {
                    Instructions.push(novm.Parser.Parse(_Instruction.trim()));
                });
                novm.Core.Execute(Instructions, Page.Stack);
            }
        }
        Page.Input.value = "";
    },
    ProcessMeta: function(input) {
        let End = input.indexOf(" ");
        switch (input.slice(0, End > 0 ? End : input.length)) {
            case "help": case "h": { // Help Command
                Page.WriteLine("\nRuntime Information:\nVersion: " + novm.Version + "\n\nMeta Commands:\n- .?help - Prints out help\n- .?clear - Clears both input and output\n- .?stack - Prints out the current stack\n- .?parse - Parses an instruction and prints it\n- .?reset - Clears the stack and resets the VM context\n");
                break;
            }

            case "clear": case "c": {
                this.Output.innerText = "";
                break;
            }

            case "stack": case "s": {
                Page.WriteLine("[META] Stack: [" + Page.Stack.join(", ") + "]");
                break;
            }

            case "parse": case "p": {
                let Instruction = input.slice(5).trim();
                Page.WriteLine("[META] Parsed: (" + Instruction + " -> " + JSON.stringify(novm.Parser.Parse(Instruction)) + ")");
                break;
            }

            case "reset": case "r": {
                Page.Stack = [];
                break;
            }
        }
    },
    Load: function() {
        Page.Input = document.getElementById("command");
        Page.Output = document.getElementById("output");
        Page.Input.addEventListener("keydown", Page.Process);
        Page.WriteLine(`novm (v${novm.Version}) interactive!\ntype an instruction and press enter to execute it, type .?help to get help`);

        // override interface functions
        novm.Interface["__print__"] = function(s) {
            Page.WriteLine("[EXEC]: __print__ -> " + s.pop());
        }
    }
}