namespace Sensors {
    export class Sensor {
        x: number;
        y: number;
        coverage: number;

        constructor(x: number, y: number, beaconX: number, beaconY: number) {
            this.x = x;
            this.y = y;
            this.coverage = Math.abs(x - beaconX) + Math.abs(y - beaconY);
        }
    }

    function sensor(): number {
        let input: string =
            `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;
        let inputRows = input.split("\n");

        let sensors: Sensor[] = [];
        let targetRow: number = 10;
        let noBeaconCells: Set<number> = new Set();
        let beaconCells: Set<number> = new Set();

        inputRows.forEach(row => {
            row = row.replace("Sensor at x=", "");
            row = row.replace(": closest beacon is at x=", ",");
            row = row.replace(" y=", "");
            row = row.replace(" y=", "");
            let values = row.split(",").map(v => parseInt(v));

            sensors.push(new Sensor(values[0], values[1], values[2], values[3]));

            if (values[3] == targetRow) {
                beaconCells.add(values[2]);
            }
        });

        sensors.forEach(sensor => {
            let minY = sensor.y - sensor.coverage;
            let maxY = sensor.y + sensor.coverage;
            if (targetRow <= maxY && targetRow >= minY) {
                // sensor coverage overlaps target row
                let vertDist = Math.abs(sensor.y - targetRow);
                let coverageAtTarget = (sensor.coverage - vertDist);
                let minXAtTarget = sensor.x - coverageAtTarget;
                let maxXAtTarget = sensor.x + coverageAtTarget;
                for (let x = minXAtTarget; x <= maxXAtTarget; x++) {
                    noBeaconCells.add(x);
                }
            }
        });

        return noBeaconCells.size - beaconCells.size;
    }

    console.log(sensor());
}