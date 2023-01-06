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
        range(this.y - this.bd, this.y + this.bd).forEach(row => {
            const xr = Math.abs(Math.abs(this.y - row) - this.bd)
            diamond.set(row, new Set(range(this.x - xr, this.x + xr)))
        })
        return diamond
    }
}

const aggregateSensors = (sensors, y) => {
    let positions = new Set()
    sensors.filter(sensor => sensor.diamond.has(y)).forEach(sensor => {
        sensor.diamond.get(y).forEach(v => positions.add(v))
    })
    let beaconPositions = sensors.filter(sensor => sensor.cb.y === y).map(sensor => sensor.cb.x)
    beaconPositions.forEach(b => positions.delete(b))
    return positions
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
    console.log(Array.from(dmz).sort((a, b) => a - b))
    return [dmz.size, 'part2']
}