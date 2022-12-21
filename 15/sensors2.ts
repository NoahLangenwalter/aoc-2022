namespace Sensors {

    function sensor2(): number {
        let input: string =
            `Sensor at x=1638847, y=3775370: closest beacon is at x=2498385, y=3565515
Sensor at x=3654046, y=17188: closest beacon is at x=3628729, y=113719
Sensor at x=3255262, y=2496809: closest beacon is at x=3266439, y=2494761
Sensor at x=3743681, y=1144821: closest beacon is at x=3628729, y=113719
Sensor at x=801506, y=2605771: closest beacon is at x=1043356, y=2000000
Sensor at x=2933878, y=5850: closest beacon is at x=3628729, y=113719
Sensor at x=3833210, y=12449: closest beacon is at x=3628729, y=113719
Sensor at x=2604874, y=3991135: closest beacon is at x=2498385, y=3565515
Sensor at x=1287765, y=1415912: closest beacon is at x=1043356, y=2000000
Sensor at x=3111474, y=3680987: closest beacon is at x=2498385, y=3565515
Sensor at x=2823460, y=1679092: closest beacon is at x=3212538, y=2537816
Sensor at x=580633, y=1973060: closest beacon is at x=1043356, y=2000000
Sensor at x=3983949, y=236589: closest beacon is at x=3628729, y=113719
Sensor at x=3312433, y=246388: closest beacon is at x=3628729, y=113719
Sensor at x=505, y=67828: closest beacon is at x=-645204, y=289136
Sensor at x=1566406, y=647261: closest beacon is at x=1043356, y=2000000
Sensor at x=2210221, y=2960790: closest beacon is at x=2498385, y=3565515
Sensor at x=3538385, y=1990300: closest beacon is at x=3266439, y=2494761
Sensor at x=3780372, y=2801075: closest beacon is at x=3266439, y=2494761
Sensor at x=312110, y=1285740: closest beacon is at x=1043356, y=2000000
Sensor at x=51945, y=2855778: closest beacon is at x=-32922, y=3577599
Sensor at x=1387635, y=2875487: closest beacon is at x=1043356, y=2000000
Sensor at x=82486, y=3631563: closest beacon is at x=-32922, y=3577599
Sensor at x=3689149, y=3669721: closest beacon is at x=3481800, y=4169166
Sensor at x=2085975, y=2190591: closest beacon is at x=1043356, y=2000000
Sensor at x=712588, y=3677889: closest beacon is at x=-32922, y=3577599
Sensor at x=22095, y=3888893: closest beacon is at x=-32922, y=3577599
Sensor at x=3248397, y=2952817: closest beacon is at x=3212538, y=2537816`;
        let inputRows = input.split("\n");

        let sensors: Sensor[] = [];
        let targetRow: number = 10;
        let noBeaconCells: Set<number> = new Set();

        inputRows.forEach(row => {
            row = row.replace("Sensor at x=", "");
            row = row.replace(": closest beacon is at x=", ",");
            row = row.replace(" y=", "");
            row = row.replace(" y=", "");
            let values = row.split(",").map(v => parseInt(v));

            sensors.push(new Sensor(values[0], values[1], values[2], values[3]));
        });

        // let sensorRange = {
        //     min: {
        //         x: Number.MAX_SAFE_INTEGER,
        //         y: Number.MAX_SAFE_INTEGER
        //     },
        //     max: {
        //         x: Number.MIN_SAFE_INTEGER,
        //         y: Number.MIN_SAFE_INTEGER
        //     }
        // }

        let searchArea: Set<string> = new Set();

        // for (let y = 0; y < 4000001; y++) {
        //     console.log("starting row: " + y);
        //     for (let x = 0; x < 4000001; x++) {
        //         searchArea.add(x + ":" + y)
        //     }
        // }

        function mergeRanges(ranges: [number, number][], newRange: [number, number]): [number, number][] {
            let merged = [];

            if (ranges.length == 0) {
                merged.push(newRange);
                return merged;
            }

            let overlapFound = false;
            for (let i = 0; i < ranges.length; i++) {
                let range = ranges[i];
                if ((newRange[0] >= range[0] && newRange[0] <= range[1])
                    || (newRange[1] >= range[0] && newRange[1] <= range[1])
                    || (newRange[0] <= range[0] && newRange[1] >= range[1])) {
                    //overlap to the right or left
                    overlapFound = true;
                    newRange[0] = Math.min(newRange[0], range[0]);
                    newRange[1] = Math.max(newRange[1], range[1]);
                    ranges.splice(i, 1);
                    merged = mergeRanges(ranges, newRange);
                    break;
                }
            }

            if (!overlapFound) {
                merged = ranges;
                merged.push(newRange);
                merged.sort((a, b) => (a[0] - b[0]));
            }

            return merged;
        }

        // let testRanges = [];
        // testRanges.push([5, 10]);
        // testRanges = mergeRanges(testRanges, [11, 20]);
        // testRanges = mergeRanges(testRanges, [9, 14]);

        let rowRanges: [number, number][] = [];
        let y = 3246513;
        for (; y < 4000001; y++) {
            if (y % 100000 == 0) {
                console.log("starting row: " + y);
            }
            targetRow = y;
            rowRanges = [];
            for (let i = 0; i < sensors.length; i++) {
                const sensor = sensors[i];
                let minY = sensor.y - sensor.coverage;
                let maxY = sensor.y + sensor.coverage;
                if (targetRow <= maxY && targetRow >= minY) {
                    // sensor coverage overlaps target row
                    let vertDist = Math.abs(sensor.y - targetRow);
                    let coverageAtTarget = (sensor.coverage - vertDist);
                    let minXAtTarget = Math.max(0, sensor.x - coverageAtTarget);
                    let maxXAtTarget = Math.min(4000000, sensor.x + coverageAtTarget);

                    if (minXAtTarget <= maxXAtTarget) {
                        rowRanges = mergeRanges(rowRanges, [minXAtTarget, maxXAtTarget]);
                    }
                }
            }

            if (rowRanges[0][1] !== 4000000) {
                console.log("found at: " + y!);
                break;
            }
        }

        return (rowRanges[0][1] + 1) * 4000000 + y;
    }

    console.log(sensor2());
}