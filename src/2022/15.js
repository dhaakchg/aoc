const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers");

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
        this.bd = Math.abs(this.x - cb.x) + Math.abs(this.y - cb.y) // Beacon Distance
        this.diamond = this.getBeaconDiamond()
    }

    getBeaconDiamond() {
        const diamond = new Map()
        for(let row = this.y - this.bd; row <= this.y + this.bd; row++) {
            const xr = Math.abs(Math.abs(this.y - row) - this.bd)
            diamond.set(row, [this.x - xr, this.x + xr])
        }
        return diamond
    }
}

const aggregateSensors = (sensors, y) => {
    let positions = []
    sensors.filter(sensor => sensor.diamond.has(y)).forEach(sensor => {
        const [sxmin, sxmax] = sensor.diamond.get(y)
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

module.exports = (input, yPos) => {
    const sensors = parse(input)
    const dmz = aggregateSensors(sensors, yPos)
    return [dmz, 'part2']
}