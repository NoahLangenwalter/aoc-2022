function fallingSand(): number {
    let input: string =
`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

    let inputRows = input.split("\n");
    // let rocks: Rock[] = [];
    let rocks: Set<string> = new Set();

    let lowestRock = 0;

    inputRows.forEach(row => {
        let coords = row.split(" -> ").map((c) => {
            let nums = c.split(",").map(n => parseInt(n));
            if (nums[1] > lowestRock) {
                lowestRock = nums[1];
            }

            return { x: nums[0], y: nums[1] };
        });

        let previous = coords[0];
        rocks.add(previous.x + "," + previous.y);
        for (let i = 1; i < coords.length; i++) {
            let current = coords[i];
            if (current.x == previous.x) {
                if (current.y > previous.y) {
                    for (let y = previous.y + 1; y < current.y; y++) {
                        rocks.add(current.x + "," + y);
                    }
                }
                else {
                    for (let y = previous.y - 1; y > current.y; y--) {
                        rocks.add(current.x + "," + y);
                    }
                }
            }
            else {
                if (current.x > previous.x) {
                    for (let x = previous.x + 1; x < current.x; x++) {
                        rocks.add(x + "," + current.y);
                    }
                }
                else {
                    for (let x = previous.x - 1; x > current.x; x--) {
                        rocks.add(x + "," + current.y);
                    }
                }
            }
            rocks.add(current.x + "," + current.y);
            previous = current;
        }
    });

    let sandAtRest: Set<string> = new Set();
    let voidReached = false;

    function tryMove(current: { x: number, y: number }): boolean {
        let down = current.x + "," + (current.y + 1);
        let left = (current.x - 1) + "," + (current.y + 1);
        let right = (current.x + 1) + "," + (current.y + 1);

        if (!rocks.has(down) && !sandAtRest.has(down)) {
            current.y++;
        }
        else if (!rocks.has(left) && !sandAtRest.has(left)) {
            current.x--;
            current.y++;
        }
        else if (!rocks.has(right) && !sandAtRest.has(right)) {
            current.x++;
            current.y++;
        }
        else {
            sandAtRest.add(current.x + "," + current.y);
            return false;
        }

        return true;
    }

    while (voidReached == false) {
        let sand = { x: 500, y: 0 };
        let falling = true;
        while (falling) {
            falling = tryMove(sand);

            if (sand.y > lowestRock) {
                voidReached = true;
                falling = false;
            }
        }
    }

    return sandAtRest.size;
}

console.log(fallingSand());