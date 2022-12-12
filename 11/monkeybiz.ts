class Item {
    value: number;
    history: [number, string][];

    constructor(value: number) {
        this.value = value;
        this.history = [[value, ""]];
    }

    update(operator: string, operand: number, mod: number) {
        if (operator == "+") {
            if (Number.isNaN(operand)) {
                this.value += this.value;
            }
            else {
                this.value += operand;
            }
        }
        else {
            if (Number.isNaN(operand)) {
                this.value *= this.value;
            }
            else {
                this.value *= operand;
            }
        }

        // Part 1
        // this.value = Math.floor(this.value / 3);

        // Part 2 (Procured from https://github.com/hyper-neutrino/advent-of-code/blob/main/2022/day11p2.py)
        this.value %= mod;

        this.history.push([this.value, `= old ${operator} ${operand}`]);
    }
}

class Monkey {
    private static nextNum = 0;
    private static getNextNum(): number {
        Monkey.nextNum++;
        return Monkey.nextNum - 1;
    }

    num: number = Monkey.getNextNum();
    items: Item[];
    operator: string;
    operand: number;
    testValue: number;
    trueTarget: Monkey;
    falseTarget: Monkey;
    trueIndex: number;
    falseIndex: number
    inspected: number = 0;
    mod: number;

    setup(monkeys: Monkey[], commonMod: number) {
        this.trueTarget = monkeys[this.trueIndex];
        this.falseTarget = monkeys[this.falseIndex];
        this.mod = commonMod;
    }

    addItem(item: Item): void {
        this.items.push(item);
    }

    takeTurn(round: number) {
        while (this.items.length > 0) {
            let item = this.items.shift();

            item = this.inspect(item);
            this.throw(item);
        }
    }

    private inspect(item: Item): Item {
        item.update(this.operator, this.operand, this.mod);

        this.inspected++;

        return item;
    }

    private throw(item: Item): void {
        if (item.value % this.testValue == 0) {
            this.trueTarget.addItem(item);
        }
        else {
            this.falseTarget.addItem(item);
        }
    }
}

function monkeybiz(): number {
    let input: string =
        `Monkey 0:
  Starting items: 97, 81, 57, 57, 91, 61
  Operation: new = old * 7
  Test: divisible by 11
    If true: throw to monkey 5
    If false: throw to monkey 6

Monkey 1:
  Starting items: 88, 62, 68, 90
  Operation: new = old * 17
  Test: divisible by 19
    If true: throw to monkey 4
    If false: throw to monkey 2

Monkey 2:
  Starting items: 74, 87
  Operation: new = old + 2
  Test: divisible by 5
    If true: throw to monkey 7
    If false: throw to monkey 4

Monkey 3:
  Starting items: 53, 81, 60, 87, 90, 99, 75
  Operation: new = old + 1
  Test: divisible by 2
    If true: throw to monkey 2
    If false: throw to monkey 1

Monkey 4:
  Starting items: 57
  Operation: new = old + 6
  Test: divisible by 13
    If true: throw to monkey 7
    If false: throw to monkey 0

Monkey 5:
  Starting items: 54, 84, 91, 55, 59, 72, 75, 70
  Operation: new = old * old
  Test: divisible by 7
    If true: throw to monkey 6
    If false: throw to monkey 3

Monkey 6:
  Starting items: 95, 79, 79, 68, 78
  Operation: new = old + 3
  Test: divisible by 3
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 7:
  Starting items: 61, 97, 67
  Operation: new = old + 4
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 5`;
    let rounds = 10000;
    let monkeys: Monkey[] = [];

    let inputRows = input.split("\n");
    let currentMonkey: Monkey;

    inputRows.forEach(row => {
        if (row.startsWith("Monkey")) {
            currentMonkey = new Monkey();
        }
        else if (row.startsWith("  Starting items:")) {
            let items: Item[] = row.substring(17).split(",").map((x) => { return new Item(parseInt(x, 10)); });
            currentMonkey.items = items;
        }
        else if (row.startsWith("  Operation:")) {
            let operator: string = row.substring(23, 24);
            let operand: number = parseInt(row.substring(25));
            currentMonkey.operator = operator;
            currentMonkey.operand = operand;
        }
        else if (row.startsWith("  Test:")) {
            let test: number = parseInt(row.substring(21));
            currentMonkey.testValue = test;
        }
        else if (row.startsWith("    If true:")) {
            let trueIndex: number = parseInt(row.substring(29));
            currentMonkey.trueIndex = trueIndex;
        }
        else if (row.startsWith("    If false:")) {
            let falseIndex: number = parseInt(row.substring(30));
            currentMonkey.falseIndex = falseIndex;

            monkeys.push(currentMonkey);
        }
    });

    // Part 2 (Procured from https://github.com/hyper-neutrino/advent-of-code/blob/main/2022/day11p2.py)
    let commonMod = monkeys.map(x => x.testValue).reduce((m, x)=> m*=x);

    monkeys.forEach(monkey => {
        monkey.setup(monkeys, commonMod);
    });

    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => {
            monkey.takeTurn(i);
        });
    }

    function calculateMonkeyBusiness(): number {
        let result = 0;

        // multiply item inspection count of top two monkeys
        monkeys.forEach(monkey => {
            console.log(`Monkey ${monkey.num} inspected items ${monkey.inspected} times.`)
            // monkey.items.forEach(item => {
            //     item.history.forEach(record => {
            //         console.log(`   ${record[0]} ${record[1]}`);
            //     });
            // });
        });
        monkeys.sort((a, b) => b.inspected - a.inspected);

        result = monkeys[0].inspected * monkeys[1].inspected;

        return result;
    }

    return calculateMonkeyBusiness();
}

console.log(monkeybiz());
