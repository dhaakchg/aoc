const { splitClean } = require('../util/inputUtils')

class Machine {
  constructor (line) {
    // Initialize machine state here
    this.init(line)
  }

  init(line) {
    // line example: [.#..#]  (0,2,3)  (1,2)  (0,1,2,3,4)  {5,7,10,6}
    const re = /^\[(?<lights>[.#]+)]\s+(?<wiring>(\([0-9,]+\)\s?)+)\{(?<joltage>[0-9,]+)}/
    const { lights, wiring, joltage } = line.match(re).groups
    this.lights = lights.split('')
    this.wiring = wiring.split(' ').filter(Boolean).map(buttons => buttons.match(/[0-9,]+/)[0].split(',').map(Number))
    this.joltage = joltage.split(',').map(Number)
    console.log(`Parsed Machine - lights: ${this.lights.join('')}, wiring: ${JSON.stringify(this.wiring)}, joltage: ${this.joltage}`)
  }
}

module.exports = (input) => {
    const machines = splitClean(input).map(line => new Machine(line))
    console.log(`${machines.map(m => m.lights).join('\n')}`)
    let part1 = 0
    let part2 = 0
    return { part1, part2 }
}
