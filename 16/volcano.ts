namespace volcano {
    class Valve {
        id: string;
        flowRate: number;
        neighborIds: string[];
        paths = {};

        constructor(id: string, flowRate: number, neighborIds: string[]) {
            this.id = id;
            this.flowRate = flowRate;
            this.neighborIds = neighborIds;
        }

        getValue(positionId: string, steps: number): number {
            // time to travel
            steps -= this.paths[positionId].length;
            // time to open valve
            steps--;
            return steps * this.flowRate;
        }
    }

    let input: string =
        `Valve QZ has flow rate=0; tunnels lead to valves IR, FA
Valve FV has flow rate=0; tunnels lead to valves AA, GZ
Valve GZ has flow rate=0; tunnels lead to valves FV, PO
Valve QL has flow rate=0; tunnels lead to valves MR, AA
Valve AA has flow rate=0; tunnels lead to valves QL, GQ, EV, FV
Valve SQ has flow rate=23; tunnel leads to valve ZG
Valve PK has flow rate=8; tunnels lead to valves MN, GN, WF, TY, CX
Valve GQ has flow rate=0; tunnels lead to valves AA, MT
Valve TI has flow rate=22; tunnels lead to valves GM, CS
Valve JU has flow rate=17; tunnels lead to valves TT, RR, UJ, JY
Valve YD has flow rate=7; tunnels lead to valves AT, ZS, BS
Valve YB has flow rate=0; tunnels lead to valves EA, MW
Valve FA has flow rate=0; tunnels lead to valves QZ, JT
Valve TN has flow rate=0; tunnels lead to valves ZS, PO
Valve MW has flow rate=0; tunnels lead to valves YB, YL
Valve XN has flow rate=0; tunnels lead to valves VL, VM
Valve MN has flow rate=0; tunnels lead to valves PK, TT
Valve IP has flow rate=9; tunnels lead to valves YC, SA, CH, PI
Valve PD has flow rate=0; tunnels lead to valves YZ, VM
Valve ZS has flow rate=0; tunnels lead to valves TN, YD
Valve PC has flow rate=0; tunnels lead to valves MR, XT
Valve VM has flow rate=13; tunnels lead to valves CX, XN, PD
Valve PO has flow rate=4; tunnels lead to valves GZ, TN, SA, XT, BM
Valve GN has flow rate=0; tunnels lead to valves PK, YL
Valve YL has flow rate=5; tunnels lead to valves MT, YZ, GN, SU, MW
Valve IR has flow rate=6; tunnels lead to valves LK, PI, BM, QZ, EV
Valve GM has flow rate=0; tunnels lead to valves TI, RH
Valve CS has flow rate=0; tunnels lead to valves UJ, TI
Valve EA has flow rate=18; tunnels lead to valves VL, YB, WF, JY
Valve LK has flow rate=0; tunnels lead to valves IR, MR
Valve BM has flow rate=0; tunnels lead to valves IR, PO
Valve JZ has flow rate=0; tunnels lead to valves RH, RR
Valve SA has flow rate=0; tunnels lead to valves IP, PO
Valve XT has flow rate=0; tunnels lead to valves PO, PC
Valve YC has flow rate=0; tunnels lead to valves IP, IL
Valve RH has flow rate=15; tunnels lead to valves WJ, JZ, GM
Valve CH has flow rate=0; tunnels lead to valves IP, BS
Valve JY has flow rate=0; tunnels lead to valves EA, JU
Valve TY has flow rate=0; tunnels lead to valves WJ, PK
Valve WJ has flow rate=0; tunnels lead to valves TY, RH
Valve IL has flow rate=0; tunnels lead to valves YC, MR
Valve BS has flow rate=0; tunnels lead to valves YD, CH
Valve AT has flow rate=0; tunnels lead to valves YD, UX
Valve UJ has flow rate=0; tunnels lead to valves CS, JU
Valve VL has flow rate=0; tunnels lead to valves EA, XN
Valve JT has flow rate=21; tunnels lead to valves ZG, FA
Valve UX has flow rate=10; tunnel leads to valve AT
Valve RR has flow rate=0; tunnels lead to valves JZ, JU
Valve TT has flow rate=0; tunnels lead to valves JU, MN
Valve MT has flow rate=0; tunnels lead to valves GQ, YL
Valve EV has flow rate=0; tunnels lead to valves AA, IR
Valve ZG has flow rate=0; tunnels lead to valves JT, SQ
Valve WF has flow rate=0; tunnels lead to valves EA, PK
Valve YZ has flow rate=0; tunnels lead to valves PD, YL
Valve MR has flow rate=3; tunnels lead to valves LK, IL, QL, SU, PC
Valve PI has flow rate=0; tunnels lead to valves IR, IP
Valve CX has flow rate=0; tunnels lead to valves VM, PK
Valve SU has flow rate=0; tunnels lead to valves YL, MR`;

    let inputRows = input.split("\n");
    let valves = {};
    let closedValves: Valve[] = [];

    inputRows.forEach(row => {
        row = row.replace("Valve ", "");
        row = row.replace(" has flow rate=", ";");
        row = row.replace("; tunnels lead to valves ", ";");
        row = row.replace("; tunnel leads to valve ", ";");
        row = row.replace(", ", ",");
        row = row.replace(", ", ",");
        row = row.replace(", ", ",");
        row = row.replace(", ", ",");
        let values = row.split(";");

        let id = values[0];
        let flowRate = parseInt(values[1]);
        let neighbors = values[2].split(",");

        valves[id] = new Valve(id, flowRate, neighbors);
        closedValves.push(valves[id]);
    });

    for (let i = 0; i < closedValves.length; i++) {
        const first = closedValves[i];
        for (let j = i + 1; j < closedValves.length; j++) {
            const second = closedValves[j];
            let shortestPath = findShortestPath(first, second, first, []);
            first.paths[second.id] = shortestPath;
            let flippedPath = [...shortestPath];
            flippedPath.pop();
            flippedPath.reverse();
            flippedPath.push(first);
            second.paths[first.id] = flippedPath;
        }
    }

    function findShortestPath(start: Valve, end: Valve, current: Valve, path: Valve[]): Valve[] {
        if (current.neighborIds.indexOf(end.id) != -1) {
            path.push(valves[end.id]);

            return path;
        }
        else {
            let shortestPath: Valve[] = closedValves;
            for (let i = 0; i < current.neighborIds.length; i++) {
                let neighbor: Valve = valves[current.neighborIds[i]];

                if (neighbor != start && path.indexOf(neighbor) == -1) {
                    let trialPath = [...path]
                    trialPath.push(neighbor);
                    trialPath = findShortestPath(start, end, neighbor, trialPath);
                    if (trialPath[trialPath.length - 1] == end && trialPath.length < shortestPath.length) {
                        shortestPath = trialPath;
                    }
                }
            }

            return shortestPath;
        }
    }

    // Tried this second: found best next valve to open but only looked one valve ahead.
    // let openValves: Valve[] = [];
    // let stepsLeft = 30;
    // let current = valves["AA"];
    // let pressureReleased = 0;
    // while (stepsLeft > 0) {
    //     let next = chooseNext();

    //     if (next == null) {
    //         stepsLeft = 0;
    //     }
    //     else {
    //         closedValves.splice(closedValves.indexOf(next), 1);
    //         stepsLeft -= current.paths[next.id].length;
    //         stepsLeft--;
    //         openValves.push(next);
    //         current = next;
    //         pressureReleased += next.flowRate * stepsLeft;
    //         console.log("Total: " + pressureReleased);
    //     }
    // }

    // function chooseNext(): Valve {
    //     let result = null;
    //     let bestValue = 0;
    //     for (let i = 0; i < closedValves.length; i++) {
    //         let valve = closedValves[i];

    //         if (current != valve && current.paths[valve.id].length - 1 < stepsLeft) {
    //             let value = valve.getValue(current.id, stepsLeft);

    //             if (value > bestValue) {
    //                 bestValue = value;
    //                 result = valve;
    //             }
    //         }
    //     }

    //     if (result) {
    //         console.log(current.paths[result.id].map(p => p.id) + ": " + bestValue);
    //     }

    //     return result;
    // }

    //Third: This got the right answer
    function releaseMostPressure(currentValve: Valve, closedValves: Valve[], openValves: Valve[], stepsLeft: number, pressureReleased: number): number {
        let currentWorthOpening = openValves.indexOf(currentValve) == -1 && currentValve.flowRate > 0;

        if (currentWorthOpening) {
            closedValves.splice(closedValves.indexOf(currentValve), 1);
            stepsLeft--;
            pressureReleased += currentValve.flowRate * stepsLeft;
            openValves.push(currentValve);
        }

        let bestPressure = 0;
        //worth traveling to and can open in time
        let candidates = closedValves.filter(v => {
            return v != currentValve
                && v.flowRate > 0
                && v.paths[currentValve.id].length - 1 < stepsLeft
        });
        for (let i = 0; i < candidates.length; i++) {
            let target: Valve = candidates[i];
            let pressure = releaseMostPressure(target, [...closedValves], [...openValves], stepsLeft - currentValve.paths[target.id].length, 0);

            if (pressure > bestPressure) {
                bestPressure = pressure;
            }
        }

        pressureReleased += bestPressure;

        return pressureReleased;
    }

    //Tried this first: got stuck and felt I needed to know which traversals were the best options
    // function releaseMostPressure(currentValve: Valve, openValves: Valve[], traversals: {}, stepsLeft: number, pressureReleased: number): number {
    //     let currentWorthOpening = openValves.indexOf(currentValve) == -1 && currentValve.flowRate > 0;
    //     console.log(currentValve.id);

    //     if (currentWorthOpening) {
    //         stepsLeft--;
    //         pressureReleased += currentValve.flowRate * stepsLeft;
    //         openValves.push(currentValve);
    //     }

    //     let maxPressure = 0;
    //     for (let i = 0; i < currentValve.neighborIds.length; i++) {
    //         let neighbor: Valve = valves[currentValve.neighborIds[i]];
    //         console.log(`  ${currentValve.neighborIds[i]}`);
    //         let traversal = `${currentValve.id}-${neighbor.id}`;
    //         if (!traversals.hasOwnProperty(traversal)) {
    //             traversals[traversal] = 0;
    //         }

    //         if (traversals[traversal] < 2) {
    //             traversals[traversal]++;
    //             console.log(`    ${traversal}`);
    //             stepsLeft--;
    //             let pressure = releaseMostPressure(neighbor, [...openValves], Object.assign({}, traversals), stepsLeft, pressureReleased);

    //             if (pressure > maxPressure) {
    //                 maxPressure = pressure;
    //             }
    //         }
    //     }

    //     // base case: no steps left or nothing else to do to increase pressure in time
    //     if (stepsLeft == 0 || !currentWorthOpening && stepsLeft == 1) {
    //         return pressureReleased + maxPressure;
    //     }
    // }

    let mostPressure = releaseMostPressure(valves["AA"], [...closedValves], [], 30, 0);

    console.log(mostPressure);
}