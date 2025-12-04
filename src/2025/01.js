const {splitClean} = require('../util/inputUtils')

const moveDial = (currentDial, direction, count, midSpin = false) => {
  let zeroed = 0
  let newDialPos = currentDial
  let fullSpins = Math.floor(count / 100)
  if (midSpin) zeroed += fullSpins
  let move = count % 100
  if (direction === 'L') {
    newDialPos = currentDial - move
    if (newDialPos < 0) {
      newDialPos = 100 + newDialPos
      if (midSpin && currentDial !== 0 && newDialPos !== 0) zeroed += 1 // crossed zero
    }
  } else if (direction === 'R') {
    newDialPos = currentDial + move
    if (newDialPos > 99) {
      newDialPos = newDialPos - 100
      if (midSpin && currentDial !== 0 && newDialPos !== 0) zeroed += 1 // crossed zero
    }
  }
  if (newDialPos === 0) zeroed += 1
  return { newDialPos, zeroed }
}

module.exports = (input) => {
  let dial = 50
  let part1 = 0
  const instructions = splitClean(input).map(line => {
    const { direction, count } = line.match(/(?<direction>[LR])(?<count>\d+)/).groups
    return { direction, count: parseInt(count, 10) }
  })
  instructions.forEach(({ direction, count }) => {
    const { newDialPos, zeroed } = moveDial(dial, direction, count)
    dial = newDialPos
    part1 += zeroed
  })

  dial = 50
  let part2 = 0
  instructions.forEach(({ direction, count }) => {
    const { newDialPos, zeroed } = moveDial(dial, direction, count, true)
    dial = newDialPos
    part2 += zeroed
  })
  return { part1, part2 }
}
