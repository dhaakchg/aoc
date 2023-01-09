const {splitClean} = require("../util/inputUtils");

const TIME_LIMIT = 30

class Valve {
    constructor(name, flowRate, tunnelValves) {
        this.name = name
        this.flowRate = flowRate
        this.tunnelValves = tunnelValves
    }
}

const openValves = (valves) => {
    let pressureRelease = 0
    let currentMinute = TIME_LIMIT

}
const parse = (input) => {
    let valves = []
    "Valve AA has flow rate=0; tunnels lead to valves DD, II, BB"
    const parseRe = /Valve (?<name>[A-Z]+) has flow rate=(?<flow>\d+); tunnels? leads? to valves? (?<valves>.*)/
    splitClean(input).forEach(line => {
        console.log(line)
        const parsed = line.match(parseRe).groups
        const tunnels = parsed.valves.split(',').map(c => c.trim())
        valves.push(new Valve(parsed.name, Number.parseInt(parsed.flow), tunnels))
    })
    return valves
}

module.exports = (input) => {
    let valves = parse(input)
    console.log(valves)
    return ['part1', 'part2']
}