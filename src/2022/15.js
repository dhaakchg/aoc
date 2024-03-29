const {splitClean} = require("../util/inputUtils");
const BEACON_MULT=4000000

class Device {
    constructor(x, y) {
        this.x = Number.parseInt(x)
        this.y = Number.parseInt(y)
    }
}

class Beacon extends Device {
    constructor(x, y) {
        super(x, y);
    }
}

class Sensor extends Device {
    constructor(x, y, cb) {
        super(x, y);
        this.cb = cb
        this.bd = this.manhattan([this.x, this.y], [cb.x, cb.y]) // Beacon Distance
        this.yMin = this.y - this.bd
        this.yMax = this.y + this.bd
        // this.diamond = this.getBeaconDiamond()
    }

    manhattan(coord1, coord2) {
        return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1])
    }
    rangeY(y) {
        return this.yMin <= y && y <= this.yMax
    }

    rangeX(y) {
        const xr = Math.abs(Math.abs(this.y - y) - this.bd)
        return [this.x - xr, this.x + xr]
    }

    coordInRange(coords) {
        return this.manhattan([this.x, this.y], [coords[0], coords[1]]) <= this.bd
    }
    *getSensorPerimeterIterator() {
        for(let row = this.yMin; row <= this.yMax; row++) {
            const xr = Math.abs(Math.abs(this.y - row) - this.bd);
            let coords = [[this.x - xr - 1, row], [this.x + xr + 1, row]]
            if( row === this.yMin) {
                coords.unshift([this.x, row - 1])
            } else if ( row === this.yMax) {
                coords.push([this.x, row + 1])
            }
            for(let coord of coords) {
                yield coord
            }
        }
    }
}

const aggregateSensors = (sensors, y) => {
    let positions = []
    sensors.filter(sensor => sensor.rangeY(y)).forEach(sensor => {
        const [sxmin, sxmax] = sensor.rangeX(y)
        positions.push(sxmin, sxmax)
    })
    let rangeMin = Math.min(...positions)
    let rangeMax = Math.max(...positions)
    let beaconPositions = new Set(sensors.filter(sensor => sensor.cb.y === y).map(sensor => sensor.cb.x))
    return (rangeMax - rangeMin) + 1 - beaconPositions.size
}

const parse = (raw) => {
    let sensors = []
    const parseRe = /Sensor at x=(?<sx>-?\d+), y=(?<sy>-?\d+): closest beacon is at x=(?<bx>-?\d+), y=(?<by>-?\d+)/
    splitClean(raw).forEach(line => {
        const parsed = line.match(parseRe).groups
        const b = new Beacon(parsed.bx, parsed.by)
        const s = new Sensor(parsed.sx, parsed.sy, b)
        sensors.push(s)
    })
    return sensors
}

const part2 = (sensors, bounds) => {
    for(let sensor of sensors) {
        console.log(`Checking perimeter of sensor at x=${sensor.x},y=${sensor.y}`)
        for(let coord of sensor.getSensorPerimeterIterator()) {
            if(coordsInBounds(coord, bounds)) {
                const pointInSensorRange = sensors
                    .filter(s => s.x !== sensor.x && s.y !== sensor.y) // obviously the point isn't in this sensors range
                    .filter(checkRangeSensor => checkRangeSensor.coordInRange(coord))
                const coordNotInSensorRange = pointInSensorRange.length === 0
                if(coordNotInSensorRange) {
                    console.log(`Perimeter coord: ${coord} within bounds: ${bounds} and not in any sensor range`)
                    return coord[0] * BEACON_MULT + coord[1]
                }
            }
        }
    }
}

const coordsInBounds = (coords, bounds) => {
    const [cx, cy] = coords
    return (bounds[0] <= cx && cx <= bounds[1]) && (bounds[0] <= cy && cy <= bounds[1])
}

module.exports = (input, options) => {
    const {yPos, bBounds} = options
    const sensors = parse(input)
    const dmz = aggregateSensors(sensors, yPos)
    const distressBeaconFreq = part2(sensors, bBounds)
    return [dmz, distressBeaconFreq]
}