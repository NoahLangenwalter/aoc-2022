let input: string = `A Y
B X
C Z`;

enum RoundResult {
    Loss = 0,
    Draw = 3,
    Win = 6,
}
function resolveRound(op: number, own: number): RoundResult {
    if (op === own) {
        return RoundResult.Draw;
    }
    else if (own+1 === op || own-2 === op) {
        return RoundResult.Loss;
    }
    else if (own-1 === op || own+2 === op) {
        return RoundResult.Win;
    }
}

let inputArray: string[] = input.split("\n");

let values = new Map();
values.set("A", 1);
values.set("B", 2);
values.set("C", 3);
values.set("X", 1);
values.set("Y", 2);
values.set("Z", 3);

let total: number = 0;

inputArray.forEach(round => {
    let plays: string[] = round.split(" ");
    let opposingPlay: number = values.get(plays[0]);
    let ownPlay: number = values.get(plays[1]);
    let outcome = resolveRound(opposingPlay, ownPlay);

    console.log(ownPlay + "+" + outcome + "=" + (ownPlay+outcome));
    total += ownPlay + outcome;
});

console.log(total);