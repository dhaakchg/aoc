const { splitClean } = require('../util/inputUtils')

class Machine {
  constructor (line) {
    // Initialize machine state here
    // line example: [.#..#]  (0,2,3)  (1,2)  (0,1,2,3,4)  {5,7,10,6}
    const re = /^\[(?<lightsToStart>[.#]+)]\s+(?<buttons>(\([0-9,]+\)\s?)+)\{(?<joltage>[0-9,]+)}/
    const { lightsToStart, buttons, joltage } = line.match(re).groups
    this.lightsToStart = lightsToStart.split('').map(x => x === '#' ? 1 : 0).join('')
    this.buttons = buttons
      .split(' ')
      .filter(Boolean)
      .map(b => b.match(/[0-9,]+/)[0].split(',')
        .map(Number)
      )
      .map(b => {
        const a = new Array(lightsToStart.length).fill(0)
        b.forEach(i => { a[i] = 1 })
        const buttonAsBits = a.join('')
        console.log(`Button ${b} as bits: ${buttonAsBits} = ${Number.parseInt(a.join(''), 2)}`)
        return buttonAsBits
      })
    this.joltage = joltage.split(',').map(Number)
    this.lights = 0 // to be toggled by bitwise operations
    console.log(`Parsed Machine - to start: ${this.lightsToStart}, buttons: ${JSON.stringify(this.buttons)}, joltage: ${this.joltage}`)
  }

  toggleLight(button) {
    // Bitwise XOR to toggle lights
    this.lights = this.lights ^ Number.parseInt(button, 2)
  }

  lightsToString() {
    return this.lights
      .toString(2)
      .padStart(this.lightsToStart.length, 0)
      .replace(/0/g, '.')
      .replace(/1/g, '#')
  }

  isStarted() {
    return this.lights === Number.parseInt(this.lightsToStart, 2)
  }
}

module.exports = (input) => {
  const machines = splitClean(input).map(line => new Machine(line))
  console.log(`${machines.map(m => m.lights).join('\n')}`)
  for(let b of machines[0].buttons) {
    machines[0].toggleLight(b)
    console.log(`Toggled button ${b}, lights now: ${machines[0].lightsToString()}`)
    if(machines[0].isStarted()) {
      console.log(`Machine started!`)
      break
    }
  }

  let part1 = 0
  let part2 = 0
  return { part1, part2 }
}
