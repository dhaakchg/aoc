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
        return a.join('')
      })
    this.joltage = joltage.split(',').map(Number)
    this.lights = 0 // to be toggled by bitwise operations
    // console.log(`Parsed Machine - to start: ${this.lightsToStart}, buttons: ${JSON.stringify(this.buttons)}, joltage: ${this.joltage}`)
  }

  set(lightState) {
    this.lights = lightState
  }

  toggleLight(button) {
    // Bitwise XOR to toggle lights
    return this.lights ^ Number.parseInt(button, 2)
  }

  lightToString(light) {
    return light
      .toString(2)
      .padStart(this.lightsToStart.length, 0)
  }

  isStarted(lights) {
    return lights === Number.parseInt(this.lightsToStart, 2)
  }
}

function bfsClaudeDebug(machine) {
  const queue = [];
  const visited = new Set();
  queue.push([0, 0]); // [lightState, presses]

  while (queue.length > 0) {
    const [seenLightState, presses] = queue.shift();
    if (visited.has(seenLightState)) continue;
    visited.add(seenLightState);

    if (machine.isStarted(seenLightState)) {
      console.log(`${seenLightState} started machine after ${presses} presses`);
      return presses;
    }

    for (const button of machine.buttons) {
      const newLightState = seenLightState ^ Number.parseInt(button, 2);
      console.log(`Pressing button ${button} on lights ${seenLightState.toString(2).padStart(machine.lightsToStart.length, 0)} results in ${newLightState.toString(2).padStart(machine.lightsToStart.length, 0)}`);
      if (!visited.has(newLightState)) {
        queue.push([newLightState, presses + 1]);
      }
    }
  }
  return -1; // Not reachable
}


const solve1 = (machines) => {
  return machines.reduce((acc, machine) => {
    let buttonPresses = bfsClaudeDebug(machine)
    console.log(`Machine solved in ${buttonPresses} button presses`)
    return acc + buttonPresses
  }, 0)

}

module.exports = (input) => {
  const machines = splitClean(input).map(line => new Machine(line))
  const part1 = solve1(machines)
  let part2 = 0
  return { part1, part2 }
}
