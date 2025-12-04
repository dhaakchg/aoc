const {splitClean} = require('../util/inputUtils')

const moveDial = (currentDial, direction, count) => {
  let zeroed = 0
  let newDialPos = currentDial
  let move = count % 100
  if (direction === 'L') {
    newDialPos = currentDial - move
    if (newDialPos < 0) {
      newDialPos = 100 + newDialPos
    }
  } else if (direction === 'R') {
    newDialPos = currentDial + move
    if (newDialPos > 99) {
      newDialPos = newDialPos - 100
    }
  }
  if (newDialPos === 0) zeroed += 1
  return { newDialPos, zeroed }
}

module.exports = (input) => {
  let dial = 50
  let zeroCount = 0
  splitClean(input).forEach(line => {
    const { direction, count } = line.match(/(?<direction>[LR])(?<count>\d+)/).groups
    const { newDialPos, zeroed } = moveDial(dial, direction, parseInt(count, 10))
    dial = newDialPos
    zeroCount += zeroed
    console.log(`Dial at: ${dial}, zeroed: ${zeroCount}`)
  })


  return { part1: zeroCount, part2: 0 }
}
