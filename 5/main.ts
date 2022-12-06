function supplyStacks(): void {
    let inputCrates: string = `[W] [V]     [P]                    
[B] [T]     [C] [B]     [G]        
[G] [S]     [V] [H] [N] [T]        
[Z] [B] [W] [J] [D] [M] [S]        
[R] [C] [N] [N] [F] [W] [C]     [W]
[D] [F] [S] [M] [L] [T] [L] [Z] [Z]
[C] [W] [B] [G] [S] [V] [F] [D] [N]
[V] [G] [C] [Q] [T] [J] [P] [B] [M]`;

    let inputSteps: string = `move 2 from 8 to 4
move 2 from 7 to 3
move 2 from 9 to 2
move 4 from 1 to 9
move 1 from 7 to 8
move 1 from 9 to 6
move 6 from 6 to 1
move 6 from 1 to 6
move 2 from 7 to 1
move 9 from 4 to 1
move 6 from 2 to 7
move 5 from 9 to 7
move 7 from 3 to 7
move 19 from 7 to 9
move 1 from 7 to 1
move 3 from 6 to 8
move 4 from 5 to 6
move 1 from 4 to 1
move 2 from 5 to 2
move 8 from 9 to 7
move 1 from 5 to 1
move 3 from 9 to 4
move 1 from 4 to 9
move 2 from 4 to 7
move 1 from 7 to 6
move 3 from 8 to 9
move 17 from 1 to 7
move 21 from 7 to 3
move 4 from 6 to 2
move 1 from 7 to 2
move 8 from 9 to 2
move 2 from 8 to 3
move 1 from 1 to 7
move 2 from 7 to 9
move 1 from 6 to 1
move 1 from 7 to 4
move 1 from 1 to 2
move 4 from 6 to 1
move 1 from 9 to 2
move 1 from 7 to 9
move 1 from 4 to 1
move 7 from 3 to 7
move 6 from 2 to 8
move 3 from 3 to 4
move 1 from 8 to 4
move 12 from 2 to 8
move 2 from 9 to 2
move 12 from 3 to 2
move 12 from 8 to 6
move 3 from 4 to 2
move 19 from 2 to 8
move 4 from 1 to 9
move 1 from 3 to 8
move 1 from 4 to 6
move 1 from 2 to 4
move 1 from 6 to 3
move 8 from 9 to 6
move 1 from 4 to 9
move 1 from 3 to 1
move 1 from 9 to 5
move 11 from 6 to 3
move 5 from 8 to 6
move 14 from 6 to 9
move 2 from 1 to 4
move 3 from 8 to 1
move 8 from 8 to 4
move 3 from 3 to 4
move 8 from 3 to 1
move 9 from 8 to 2
move 12 from 4 to 2
move 12 from 9 to 3
move 9 from 3 to 4
move 1 from 5 to 3
move 7 from 7 to 1
move 2 from 9 to 1
move 2 from 4 to 6
move 16 from 2 to 6
move 1 from 2 to 8
move 10 from 1 to 4
move 1 from 8 to 2
move 4 from 1 to 6
move 15 from 4 to 8
move 1 from 4 to 2
move 2 from 6 to 8
move 5 from 2 to 8
move 21 from 8 to 3
move 6 from 1 to 3
move 15 from 6 to 1
move 1 from 2 to 1
move 1 from 8 to 9
move 15 from 1 to 3
move 7 from 3 to 8
move 1 from 7 to 9
move 2 from 9 to 8
move 2 from 3 to 7
move 4 from 6 to 1
move 2 from 7 to 8
move 1 from 6 to 2
move 4 from 8 to 3
move 2 from 4 to 8
move 1 from 2 to 1
move 4 from 1 to 5
move 3 from 5 to 8
move 1 from 5 to 1
move 12 from 8 to 3
move 3 from 1 to 2
move 17 from 3 to 5
move 2 from 5 to 3
move 15 from 5 to 1
move 1 from 1 to 4
move 17 from 3 to 2
move 5 from 2 to 8
move 17 from 3 to 6
move 6 from 1 to 3
move 5 from 1 to 6
move 4 from 8 to 9
move 10 from 3 to 8
move 7 from 2 to 9
move 2 from 6 to 3
move 2 from 2 to 8
move 1 from 1 to 4
move 17 from 6 to 9
move 13 from 8 to 2
move 2 from 4 to 1
move 1 from 6 to 7
move 2 from 2 to 4
move 8 from 2 to 7
move 1 from 6 to 1
move 4 from 7 to 9
move 1 from 4 to 7
move 1 from 4 to 6
move 1 from 1 to 7
move 5 from 2 to 4
move 2 from 3 to 8
move 6 from 7 to 1
move 1 from 7 to 4
move 11 from 9 to 7
move 1 from 8 to 4
move 8 from 1 to 2
move 1 from 1 to 4
move 1 from 1 to 9
move 1 from 6 to 1
move 1 from 8 to 4
move 6 from 2 to 3
move 1 from 1 to 3
move 1 from 6 to 7
move 1 from 4 to 6
move 6 from 2 to 5
move 7 from 3 to 4
move 2 from 7 to 6
move 2 from 7 to 3
move 8 from 7 to 5
move 3 from 6 to 7
move 1 from 5 to 7
move 1 from 7 to 5
move 13 from 9 to 3
move 1 from 3 to 8
move 8 from 4 to 3
move 3 from 5 to 1
move 7 from 4 to 1
move 5 from 1 to 4
move 3 from 1 to 4
move 2 from 1 to 8
move 2 from 7 to 5
move 2 from 8 to 9
move 1 from 7 to 6
move 1 from 8 to 7
move 4 from 5 to 1
move 1 from 7 to 2
move 2 from 1 to 8
move 1 from 2 to 1
move 5 from 9 to 7
move 3 from 9 to 4
move 8 from 4 to 8
move 6 from 8 to 5
move 11 from 5 to 1
move 3 from 4 to 2
move 9 from 3 to 7
move 6 from 7 to 2
move 13 from 3 to 2
move 3 from 8 to 1
move 2 from 2 to 8
move 1 from 6 to 7
move 3 from 8 to 4
move 9 from 1 to 5
move 5 from 5 to 8
move 2 from 8 to 4
move 3 from 9 to 4
move 2 from 8 to 2
move 8 from 1 to 5
move 8 from 7 to 9
move 1 from 8 to 3
move 15 from 5 to 9
move 6 from 4 to 1
move 1 from 7 to 2
move 4 from 2 to 1
move 1 from 3 to 4
move 5 from 1 to 7
move 3 from 7 to 3
move 14 from 9 to 8
move 1 from 4 to 8
move 1 from 7 to 6
move 2 from 4 to 5
move 4 from 1 to 5
move 1 from 6 to 5
move 4 from 9 to 3
move 5 from 3 to 7
move 4 from 5 to 9
move 1 from 3 to 7
move 1 from 3 to 2
move 4 from 5 to 2
move 4 from 7 to 5
move 4 from 2 to 1
move 1 from 5 to 4
move 7 from 9 to 7
move 1 from 4 to 2
move 1 from 5 to 8
move 21 from 2 to 4
move 1 from 9 to 8
move 1 from 9 to 4
move 3 from 4 to 1
move 7 from 1 to 6
move 1 from 5 to 1
move 18 from 4 to 7
move 1 from 5 to 8
move 27 from 7 to 8
move 1 from 7 to 3
move 1 from 3 to 7
move 1 from 7 to 2
move 1 from 2 to 1
move 42 from 8 to 9
move 1 from 8 to 7
move 1 from 8 to 2
move 1 from 4 to 6
move 1 from 2 to 9
move 2 from 1 to 2
move 1 from 7 to 3
move 7 from 6 to 4
move 4 from 9 to 6
move 1 from 3 to 2
move 1 from 2 to 7
move 2 from 2 to 5
move 1 from 8 to 4
move 1 from 9 to 3
move 5 from 4 to 7
move 1 from 5 to 6
move 1 from 5 to 9
move 1 from 6 to 3
move 1 from 7 to 5
move 2 from 3 to 2
move 22 from 9 to 7
move 2 from 2 to 3
move 18 from 7 to 9
move 1 from 4 to 9
move 1 from 1 to 4
move 4 from 7 to 3
move 4 from 3 to 2
move 3 from 4 to 5
move 1 from 2 to 4
move 5 from 6 to 9
move 1 from 5 to 3
move 1 from 4 to 7
move 2 from 5 to 1
move 3 from 2 to 4
move 1 from 5 to 6
move 2 from 7 to 9
move 1 from 6 to 8
move 2 from 3 to 2
move 2 from 4 to 7
move 1 from 8 to 7
move 1 from 4 to 6
move 35 from 9 to 7
move 13 from 7 to 3
move 1 from 2 to 7
move 1 from 2 to 5
move 1 from 5 to 8
move 1 from 8 to 5
move 8 from 7 to 3
move 1 from 6 to 4
move 6 from 3 to 9
move 1 from 1 to 9
move 1 from 4 to 1
move 14 from 9 to 8
move 1 from 5 to 7
move 16 from 3 to 2
move 2 from 1 to 2
move 1 from 9 to 2
move 1 from 8 to 1
move 1 from 1 to 3
move 7 from 2 to 9
move 6 from 9 to 8
move 1 from 3 to 4
move 3 from 7 to 6
move 2 from 2 to 1
move 1 from 4 to 7
move 2 from 2 to 5
move 1 from 9 to 6
move 2 from 2 to 5
move 2 from 6 to 2
move 4 from 5 to 4
move 5 from 2 to 6
move 1 from 1 to 7
move 1 from 1 to 2
move 13 from 8 to 1
move 2 from 8 to 4
move 19 from 7 to 4
move 3 from 1 to 6
move 11 from 4 to 3
move 2 from 7 to 9
move 4 from 2 to 5
move 2 from 9 to 5
move 1 from 7 to 4
move 2 from 5 to 7
move 4 from 3 to 4
move 3 from 4 to 1
move 3 from 5 to 1
move 9 from 6 to 4
move 1 from 7 to 9
move 1 from 7 to 5
move 10 from 1 to 4
move 1 from 9 to 6
move 1 from 6 to 8
move 32 from 4 to 5
move 7 from 5 to 4
move 27 from 5 to 9
move 5 from 3 to 2
move 3 from 2 to 8
move 1 from 6 to 2
move 8 from 4 to 9
move 1 from 2 to 9
move 8 from 8 to 6
move 2 from 4 to 3
move 1 from 2 to 3
move 15 from 9 to 8
move 4 from 1 to 4
move 3 from 4 to 8
move 6 from 9 to 7
move 1 from 4 to 9
move 8 from 8 to 2
move 2 from 1 to 9
move 2 from 7 to 9
move 10 from 8 to 3
move 6 from 2 to 6
move 2 from 3 to 2
move 6 from 6 to 3
move 1 from 7 to 5
move 8 from 3 to 2
move 4 from 3 to 2
move 1 from 3 to 5
move 6 from 6 to 1
move 4 from 3 to 7
move 2 from 5 to 8
move 3 from 7 to 5
move 6 from 1 to 7
move 1 from 3 to 4
move 1 from 3 to 9
move 10 from 7 to 4
move 8 from 2 to 8
move 11 from 9 to 5
move 11 from 4 to 1
move 5 from 2 to 6
move 3 from 2 to 7
move 11 from 1 to 6
move 1 from 5 to 6
move 8 from 5 to 4
move 19 from 6 to 7
move 3 from 7 to 9
move 3 from 5 to 4
move 1 from 2 to 5
move 3 from 5 to 7
move 8 from 9 to 6
move 2 from 4 to 1
move 1 from 1 to 9
move 2 from 9 to 7
move 6 from 6 to 2
move 2 from 4 to 6
move 4 from 8 to 6
move 1 from 8 to 1
move 7 from 6 to 7
move 1 from 9 to 4
move 5 from 8 to 4
move 3 from 2 to 6
move 4 from 6 to 4
move 2 from 9 to 6
move 3 from 2 to 9
move 16 from 4 to 8
move 1 from 6 to 8
move 2 from 9 to 5
move 1 from 9 to 7
move 2 from 5 to 2
move 1 from 4 to 6
move 2 from 2 to 5
move 1 from 9 to 6
move 3 from 7 to 3
move 7 from 7 to 8
move 2 from 7 to 1
move 3 from 8 to 5
move 3 from 6 to 2
move 4 from 7 to 4
move 1 from 5 to 1
move 1 from 5 to 7
move 3 from 3 to 4
move 5 from 1 to 4
move 16 from 7 to 2
move 5 from 4 to 7
move 19 from 8 to 1
move 11 from 2 to 9
move 11 from 9 to 6
move 2 from 1 to 6
move 2 from 4 to 1
move 5 from 4 to 6
move 1 from 5 to 9
move 1 from 9 to 6
move 2 from 2 to 6
move 1 from 5 to 4
move 8 from 6 to 5
move 16 from 1 to 6
move 1 from 4 to 9
move 3 from 2 to 9
move 2 from 2 to 5
move 2 from 5 to 8
move 4 from 8 to 4
move 4 from 9 to 7
move 2 from 1 to 3
move 5 from 6 to 4
move 21 from 6 to 2
move 9 from 7 to 3
move 1 from 1 to 2
move 1 from 5 to 3
move 23 from 2 to 7
move 1 from 7 to 5
move 3 from 6 to 1
move 9 from 4 to 5
move 11 from 7 to 1
move 2 from 3 to 4
move 1 from 3 to 7
move 1 from 4 to 1
move 10 from 1 to 6
move 5 from 7 to 1
move 3 from 1 to 4
move 7 from 1 to 7
move 4 from 3 to 8
move 4 from 7 to 4
move 5 from 7 to 3
move 2 from 4 to 9
move 1 from 8 to 1
move 4 from 4 to 1
move 1 from 6 to 1
move 1 from 6 to 5
move 16 from 5 to 1
move 2 from 5 to 7
move 1 from 5 to 6
move 2 from 8 to 2
move 1 from 7 to 9
move 3 from 9 to 5
move 2 from 5 to 4
move 6 from 7 to 1
move 3 from 4 to 7
move 1 from 8 to 6
move 5 from 1 to 4
move 1 from 6 to 1
move 19 from 1 to 5
move 1 from 7 to 6
move 9 from 3 to 1
move 6 from 6 to 5
move 4 from 6 to 9
move 3 from 9 to 4
move 13 from 1 to 4
move 1 from 3 to 1
move 2 from 5 to 1
move 1 from 2 to 3
move 1 from 3 to 9
move 4 from 5 to 4
move 1 from 2 to 3
move 1 from 3 to 5
move 1 from 9 to 1
move 1 from 9 to 5
move 19 from 4 to 7
move 4 from 1 to 6
move 5 from 4 to 3
move 3 from 6 to 1
move 1 from 6 to 8
move 2 from 1 to 6
move 2 from 1 to 7
move 2 from 6 to 3
move 2 from 3 to 1
move 8 from 7 to 6
move 5 from 3 to 9
move 2 from 4 to 9
move 2 from 6 to 8
move 10 from 7 to 2
move 7 from 2 to 9
move 1 from 8 to 9
move 1 from 1 to 2
move 2 from 9 to 3
move 2 from 8 to 7
move 1 from 1 to 6
move 1 from 2 to 8
move 2 from 2 to 5
move 4 from 5 to 7
move 5 from 6 to 1
move 1 from 3 to 4`;

    let cratesArray: string[] = inputCrates.split("\n");
    let stepsArray: string[] = inputSteps.split("\n");

    let crates = buildStacks(cratesArray);
    let topCrates: string = "";

    function buildStacks(cratesInput: string[]): string[][] {
        let crates: string[][] = [];
        let stackCount: number = (cratesInput[0].length + 1) / 4;

        for (let i = 0; i < stackCount; i++) {
            crates.push([]);
        }

        cratesInput.forEach(row => {
            for (let i = 0; i < stackCount; i++) {
                let valueIndex = (i * 4) + 1
                let value = row[valueIndex];

                if (value !== " ") {
                    crates[i].unshift(value);
                }
            }
        });

        return crates;
    }

    function performMove(crates: string[][], from: number, to: number, count: number): void {
        for (let i = 0; i < count; i++) {
            let crate: string = crates[from - 1].pop();
            crates[to - 1].push(crate);
        }
    }

    function performMultiMove(crates: string[][], from: number, to: number, count: number): void {
        let temp: string[] = [];
        for (let i = 0; i < count; i++) {
            let crate: string = crates[from - 1].pop();
            temp.unshift(crate);
        }

        crates[to - 1] = crates[to - 1].concat(temp);
    }

    //First Part
    let stepArray: string[] = inputSteps.split("\n");
    stepArray.forEach(step => {
        let moveCount: number = parseInt(step.substring(5, step.indexOf(" from")));
        let fromColumn: number = parseInt(step.substring(step.indexOf("from ") + 5, step.indexOf(" to")));
        let toColumn: number = parseInt(step.substring(step.indexOf("to ") + 3, step.length));

        // First Part
        // performMove(crates, fromColumn, toColumn, moveCount);

        // Second Part
        performMultiMove(crates, fromColumn, toColumn, moveCount);
    });

    topCrates = crates.map((stack) => { return stack[stack.length - 1]; }).join("");
    console.log(topCrates);
}

supplyStacks();