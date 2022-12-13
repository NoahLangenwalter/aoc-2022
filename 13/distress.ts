function distress(): number {
    let input: string =
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
    let pairs: { left: object, right: object, order: number}[] = [];
    let inputPairs = input.split("\n\n");

    function comparePair(left: object[], right: object[]): number {
        for (let i = 0; i < left.length; i++) {

            if(i == right.length) {
                return -1;
            }

            if (typeof left[i] !== typeof right[i]) {
                if (typeof left[i] === "number") {
                    left[i] = [left[i]];
                }
                else {
                    right[i] = [right[i]];
                }
            }

            if (typeof left[i] === "number" && typeof right[i] === "number") {
                if (left[i] < right[i]) {
                    return 1;
                }
                else if (left[i] > right[i]) {
                    return -1;
                }
            }
            else if (left[i] instanceof Array && right[i] instanceof Array) {
                let value = comparePair(left[i] as object[], right[i] as object[]);

                if (value !== 0) {
                    return value;
                }
            }
        }

        if(left.length < right.length) {
            return 1;
        }

        return 0;
    }

    inputPairs.forEach(inputPair => {
        let splitPair = inputPair.split("\n");
        let pair = { left: JSON.parse(splitPair[0]), right: JSON.parse(splitPair[1]), order: 0 };
        pair.order = comparePair(pair.left, pair.right);
        
        pairs.push(pair);
    });

    function sumIndices(): number {
        let sum = 0;

        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];

            if (pair.order == 1) {
                sum += i + 1;
            }
        }

        return sum;
    }

    return sumIndices();
}

console.log(distress());
