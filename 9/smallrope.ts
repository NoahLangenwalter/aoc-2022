function smallRope(): number {
    let input: string =
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

    let inputRows = input.split("\n");

    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
    let visited: Set<string> = new Set();
    visited.add(tail.x + ":" + tail.y);

    inputRows.forEach(ins => {
        let parts = ins.split(" ");
        let direction = parts[0];
        let count: number = parseInt(parts[1]);

        for (let i = 0; i < count; i++) {
            if (direction === "U") {
                head.y++;
            }
            else if (direction === "D") {
                head.y--;
            }
            else if (direction === "L") {
                head.x--;
            }
            else if (direction === "R") {
                head.x++;
            }

            // move tail
            // diagonal
            let distance = Math.abs(head.x - tail.x) + Math.abs(head.y - tail.y);
            if (distance > 2) {
                if (tail.x < head.x) {
                    tail.x++;
                }
                else {
                    tail.x--;
                }

                if (tail.y < head.y) {
                    tail.y++;
                }
                else {
                    tail.y--;
                }
            }
            // horizontal
            else if (Math.abs(head.x - tail.x) > 1) {
                if (tail.x < head.x) {
                    tail.x++;
                }
                else {
                    tail.x--;
                }
            }
            // vertical
            else if (Math.abs(head.y - tail.y) > 1) {
                if (tail.y < head.y) {
                    tail.y++;
                }
                else {
                    tail.y--;
                }
            }

            // record location
            visited.add(tail.x + ":" + tail.y);
        }
    });


    return visited.size;
}

console.log(smallRope());
