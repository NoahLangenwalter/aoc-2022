function cathoderayRender(): string {
    let input: string =
`noop
addx 12
addx -5
addx -1
noop
addx 4
noop
addx 1
addx 4
noop
addx 13
addx -8
noop
addx -19
addx 24
addx 1
noop
addx 4
noop
addx 1
addx 5
addx -1
addx -37
addx 16
addx -13
addx 18
addx -11
addx 2
addx 23
noop
addx -18
addx 9
addx -8
addx 2
addx 5
addx 2
addx -21
addx 26
noop
addx -15
addx 20
noop
addx 3
noop
addx -38
addx 3
noop
addx 26
addx -4
addx -19
addx 3
addx 1
addx 5
addx 3
noop
addx 2
addx 3
noop
addx 2
noop
noop
noop
noop
addx 5
noop
noop
noop
addx 3
noop
addx -30
addx -4
addx 1
addx 18
addx -8
addx -4
addx 2
noop
addx 7
noop
noop
noop
noop
addx 5
noop
noop
addx 5
addx -2
addx -20
addx 27
addx -20
addx 25
addx -2
addx -35
noop
noop
addx 4
addx 3
addx -2
addx 5
addx 2
addx -11
addx 1
addx 13
addx 2
addx 5
addx 6
addx -1
addx -2
noop
addx 7
addx -2
addx 6
addx 1
addx -21
addx 22
addx -38
addx 5
addx 3
addx -1
noop
noop
addx 5
addx 1
addx 4
addx 3
addx -2
addx 2
noop
addx 7
addx -1
addx 2
addx 4
addx -10
addx -19
addx 35
addx -1
noop
noop
noop`;

    let inputRows = input.split("\n");

    let render: string = "";
    let cycle = 0;
    let x = 1;

    for (let i = 0; i < inputRows.length; i++) {
        let row = inputRows[i];
        let cycleAdd = 1;
        let xAdd = 0;

        if (row.startsWith("addx")) {
            let v: number = parseInt(row.substring(5));
            cycleAdd = 2;
            xAdd = v;
        }

        for (let j = 0; j < cycleAdd; j++) {
            let char = cycle >= x - 1 && cycle <= x + 1 ? "#" : ".";
            render += char;

            cycle++;

            if (cycle == 40) {
                cycle = 0;
                render += "\n";
            }
        }

        x += xAdd;
    }

    return render;
}

console.log(cathoderayRender());
