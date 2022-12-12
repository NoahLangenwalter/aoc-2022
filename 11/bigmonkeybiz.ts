// import BigNumber = require('bignumber.js');
import BigNumber from "bignumber.js";

class Monkey {
    private static nextNum = 0;
    private static getNextNum(): number {
        Monkey.nextNum++;
        return Monkey.nextNum - 1;
    }

    num: number = Monkey.getNextNum();
    items: BigNumber[];
    operator: string;
    operand: number;
    testValue: number;
    trueTarget: Monkey;
    falseTarget: Monkey;
    trueIndex: number;
    falseIndex: number
    inspected: number = 0;

    linkTargets(monkeys: Monkey[]) {
        this.trueTarget = monkeys[this.trueIndex];
        this.falseTarget = monkeys[this.falseIndex];
    }

    addItem(item: BigNumber): void {
        this.items.push(item);
    }

    takeTurn(round: number) {
        1 == 1;
        while (this.items.length > 0) {
            let item = this.items.shift();

            item = this.inspect(item);
            this.throw(item);
        }
    }

    private inspect(item: BigNumber): BigNumber {
        if (this.operator == "+") {
            if (Number.isNaN(this.operand)) {
                item = item.plus(item);
            }
            else {
                item = item.plus(this.operand);
            }
        }
        // else {
        //     if (Number.isNaN(this.operand)) {
        //         item = item.multipliedBy(item);
        //     }
        //     else {
        //         item = item.multipliedBy(this.operand);
        //     }
        // }

        // Part 1
        // item = Math.floor(item / 3);

        this.inspected++;

        return item;
    }

    private throw(item: BigNumber): void {
        if (item.mod(this.testValue).isEqualTo(new BigNumber(0))) {
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
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;
    let rounds = 1000;
    let monkeys: Monkey[] = [];

    let inputRows = input.split("\n");
    let currentMonkey: Monkey;

    inputRows.forEach(row => {
        if (row.startsWith("Monkey")) {
            currentMonkey = new Monkey();
        }
        else if (row.startsWith("  Starting items:")) {
            let items: BigNumber[] = row.substring(17).split(",").map((x) => { return new BigNumber(parseInt(x, 10)); });
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

    monkeys.forEach(monkey => {
        monkey.linkTargets(monkeys);
    });

    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => {
            monkey.takeTurn(i);
        });
        console.log(`Round ${i+1} complete!`)
    }

    function calculateMonkeyBusiness(): number {
        let result = 0;

        // multiply item inspection count of top two monkeys
        monkeys.forEach(monkey => {
            console.log(`Monkey ${monkey.num} inspected items ${monkey.inspected} times.`)
        });
        monkeys.sort((a, b) => b.inspected - a.inspected);

        result = monkeys[0].inspected * monkeys[1].inspected;

        return result;
    }

    return calculateMonkeyBusiness();
}

console.log(monkeybiz());
