const {range} = require("../util/helpers");

const parseInstruction = (line) => {
  const [move, from, to] = line.replace(/(move |from |to )/g, '').split(' ').map(n => Number.parseInt(n))
  return {move, from, to}
}

const initCrateState = (rows, stackCount) => {
  let crateStacks = new Map()
  stackCount.map(stack => crateStacks.set(stack, []))
  /**  1   2   3
   *  [Z] [M] [P]
   *  [N] [C]
   *      [D]
   */
  rows.reverse().map(row => {
    const step = row.length / stackCount.length
    range(0, row.length - step, step).map((i, ci) => {
      const crate = row.slice(i, i + step).trim()
      if(crate) {
        crateStacks.get(ci + 1).push(crate.replaceAll(/[^A-Z]/g, ''))
      }
    })
  })
  return crateStacks
}

const parseInput = (input) => {
  let stackCount = []
  let crateRows = []
  let instructions = []
  input.split('\n').map(line => {
    if(/^move/.test(line)) {
      instructions.push(parseInstruction(line))
    } else if(/\s+\d\s+/.test(line)) {
      stackCount = line.split(/\s/).filter(x => x).map(n => Number.parseInt(n))
    } else if(/\[[A-Z]|\]/.test(line)) {
      crateRows.push(line)
    }
  })

  const crateState = initCrateState(crateRows, stackCount)

  return {stackCount, crateState, instructions}
}

const executeInstruction = (instruction, crateState) => {
  let fromStack = crateState.get(instruction.from)
  let toStack = crateState.get(instruction.to)
  for(let i = 0; i < instruction.move; i++) {
    toStack.push(fromStack.pop())
  }
}

const executeInstruction9001 = (instruction, crateState) => {
  // console.log('Instruction move', instruction.move, 'crate(s) from stack', instruction.from, 'to stack', instruction.to)
  // console.log('CrateState pre:', crateState)
  let fromStack = crateState.get(instruction.from)
  let toStack = crateState.get(instruction.to)
  let stackSlice = []
  for(let i = 0; i < instruction.move; i++) {
    stackSlice.push(fromStack.pop())
  }
  crateState.set(instruction.to, toStack.concat(stackSlice.reverse()))
  // console.log('CrateState post:', crateState)
}

const getTopLetters = (crateState) => {
  let topLetters = []
  crateState.forEach(stack => topLetters.push(stack[stack.length - 1]))
  return topLetters.join('')
}

module.exports = (input) => {
  let {crateState, instructions} = parseInput(input)
  instructions.forEach(instruction => {
    executeInstruction(instruction, crateState)
  })
  const part1 = getTopLetters(crateState);

  ({crateState, instructions} = parseInput(input))
  instructions.forEach(instruction => {
    executeInstruction9001(instruction, crateState)
  })
  const part2 = getTopLetters(crateState);
  return [part1, part2]
}
