namespace volcano2 {
    class StepResult {
        messages: string[];
        pressureReleased: number;
    }

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
    }

    enum Action {
        Move,
        Open,
        Wait
    }

    class Actor {
        id: string;
        target: Valve;
        distance: number;

        constructor(id: string, target: Valve = null, distance: number = -1) {
            this.id = id;
            this.target = target;
            this.distance = distance;
        }

        takeAction(): Action {
            if (this.distance == -1) {
                return Action.Wait;
            }

            if (this.distance == 0) {
                this.distance = -1;
                return Action.Open;
            }

            this.distance--;
            return Action.Move;
        }

        clone(): Actor {
            return new Actor(this.id, this.target, this.distance);
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

    function createPairs(list: Valve[]): [Valve, Valve][] {
        let pairs = [];
        if (list.length == 1) {
            pairs.push([list[0], null]);
            return pairs;
        }

        for (let i = 0; i < list.length; i++) {
            const first = list[i];

            for (let j = i + 1; j < list.length; j++) {
                const second = list[j];
                pairs.push([first, second]);
            }
        }

        return pairs;
    }

    function createPerms(firstList: Valve[], secondList: Valve[]): [Valve, Valve][] {
        let pairs = [];
        for (let i = 0; i < firstList.length; i++) {
            const first = firstList[i];
            if (secondList.length > 0) {
                for (let j = 0; j < secondList.length; j++) {
                    const second = secondList[j];
                    if (first == second) {
                        continue;
                    }
                    pairs.push([first, second]);
                }
            }
            else {
                pairs.push([first, null]);
            }
        }

        // let overlapped = secondList.filter(v => firstList.indexOf(v) > -1);
        for (let i = 0; i < secondList.length; i++) {
            const second = secondList[i];
            if (firstList.length > 0) {
                for (let j = 0; j < firstList.length; j++) {
                    const first = firstList[j];
                    if (first == second) {
                        continue;
                    }

                    let isDupe = pairs.filter(p => p[0] == first && p[1] == second).length > 0;
                    if (isDupe) {
                        continue;
                    }

                    pairs.push([first, second]);
                }
            }
            else {
                pairs.push([null, second]);
            }
        }

        return pairs;
    }

    function runStep(actors: Actor[], closedValves: Valve[], openValves: Valve[], stepsLeft: number, pressureReleased: number): StepResult {
        let messages = [`\n== Minute ${Math.abs(stepsLeft - 27)} ==`];
        // calculate released pressure for this step and add to total
        let stepPressure = openValves.map(v => v.flowRate).reduce((sum, f) => sum += f, 0);
        messages.push(openValves.map(v => v.id) + ": " + stepPressure);
        pressureReleased += stepPressure;

        if (actors[0].target == valves["AA"]) {
            // actors have not been tasked yet
            messages.push("No tasks. Restart minute!");

            actors[0].target = actors[1].target = valves["AA"];
            // give them an "extra" turn to task them and recurse
            // stepsLeft++;
        }
        else {
            for (let i = 0; i < actors.length; i++) {
                const actor = actors[i];
                let action = actor.takeAction();
                if (action == Action.Open) {
                    closedValves.splice(closedValves.indexOf(actor.target), 1);
                    openValves.push(actor.target);
                    actor.distance = -1;
                    messages.push(`${actor.id} open(s) valve ${actor.target.id}.`);
                }
                else if (action == Action.Move) {
                    messages.push(`${actor.id} move(s) toward ${actor.target.id}: ${actor.distance}`);
                }
            }
        }

        let bestPressure = 0;
        let bestMessages = [];
        let untasked = actors.filter(a => a.distance == -1);
        if (untasked.length == 2) {
            // both actors need a new objective
            let candidatePairs: [Valve, Valve][] = [];
            if (actors[0].target == actors[1].target) {
                // and are in the same location
                // recurse for each unique pair of candidates
                let currentValve = actors[0].target;
                let candidates = closedValves.filter(v => {
                    return v != currentValve
                        && v.flowRate > 0
                        && v.paths[currentValve.id].length - 1 < stepsLeft
                });

                candidatePairs = createPairs(candidates);
            }
            else {
                // but are in different locations
                // recurse for each pair of candidates AND reversed permutation of each pair
                let firstCurrent = actors[0].target;
                let firstCandidates = closedValves.filter(v => {
                    return v != firstCurrent
                        && v.flowRate > 0
                        && v.paths[firstCurrent.id].length - 1 < stepsLeft
                });

                let secondCurrent = actors[1].target;
                let secondCandidates = closedValves.filter(v => {
                    return v != secondCurrent
                        && v.flowRate > 0
                        && v.paths[secondCurrent.id].length - 1 < stepsLeft
                });

                candidatePairs = createPerms(firstCandidates, secondCandidates);
            }

            for (let i = 0; i < candidatePairs.length; i++) {
                let firstLocation = actors[0].target;
                let firstTarget = candidatePairs[i][0] == null ? firstLocation : candidatePairs[i][0];
                let firstDistance = candidatePairs[i][0] == null ? -1 : firstLocation.paths[firstTarget.id].length;
                let first = new Actor(actors[0].id, firstTarget, firstDistance);
                let secondLocation = actors[1].target;
                let secondTarget = candidatePairs[i][1] == null ? secondLocation : candidatePairs[i][1];
                let secondDistance = candidatePairs[i][1] == null ? -1 : secondLocation.paths[secondTarget.id].length;
                let second = new Actor(actors[1].id, secondTarget, secondDistance);
                let newActors: Actor[] = [first, second];
                let result = runStep(newActors, [...closedValves], [...openValves], stepsLeft - 1, 0);

                if (result.pressureReleased > bestPressure) {
                    bestPressure = result.pressureReleased;
                    bestMessages = result.messages;
                }
            }

            if (candidatePairs.length == 0 && stepsLeft > 0) {
                let newActors: Actor[] = [actors[0].clone(), actors[1].clone()];
                let result = runStep(newActors, [...closedValves], [...openValves], stepsLeft - 1, 0);

                if (result.pressureReleased > bestPressure) {
                    bestPressure = result.pressureReleased;
                    bestMessages = result.messages;
                }
            }
        }
        else if (untasked.length == 1) {
            // only one actor needs a new objective
            let alreadyTasked = actors.filter(a => a != untasked[0])[0];
            let currentValve = untasked[0].target;// == null ? valves["AA"] : untasked[0].target;
            let candidates = [];

            if (closedValves.filter(v => v != currentValve && v.flowRate > 0).length > 0) {
                if(currentValve == null) {
                    1==1;
                }
                candidates = closedValves.filter(v => {
                    return v != currentValve
                        && v != alreadyTasked.target
                        && v.flowRate > 0
                        && v.paths[currentValve.id].length - 1 < stepsLeft
                });
            }

            for (let i = 0; i < candidates.length; i++) {
                let target: Valve = candidates[i];
                let newlyTasked = new Actor(untasked[0].id, target, currentValve.paths[target.id].length);
                let newActors: Actor[] = [alreadyTasked.clone(), newlyTasked];
                let result = runStep(newActors, [...closedValves], [...openValves], stepsLeft - 1, 0);

                if (result.pressureReleased > bestPressure) {
                    bestPressure = result.pressureReleased;
                    bestMessages = result.messages;
                }
            }

            if (candidates.length == 0 && stepsLeft > 0) {
                let newActors: Actor[] = [alreadyTasked.clone(), untasked[0].clone()];
                let result = runStep(newActors, [...closedValves], [...openValves], stepsLeft - 1, 0);

                if (result.pressureReleased > bestPressure) {
                    bestPressure = result.pressureReleased;
                    bestMessages = result.messages;
                }
            }
        }
        else {
            // both actors are working on existing tasks
            // let it ride!
            if(stepsLeft > 0) {
                let newActors: Actor[] = [actors[0].clone(), actors[1].clone()];
                let result = runStep(newActors, [...closedValves], [...openValves], stepsLeft - 1, 0);
                bestPressure = result.pressureReleased;
                bestMessages = result.messages;
            }
        }

        pressureReleased += bestPressure;
        messages = messages.concat(bestMessages);

        return { messages, pressureReleased };
    }

    let result = runStep([new Actor("The elephant", valves["AA"]), new Actor("You", valves["AA"])], [...closedValves], [], 26, 0);

    console.log(result.pressureReleased);
    result.messages.forEach(message => {
        console.log(message);
    });
}