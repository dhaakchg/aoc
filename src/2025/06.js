const Grid = require("../util/grid");

const makeGridFromInput = (input) => {
  const inputLines = input.replaceAll('\r', '').split('\n').filter(line => line)
  const operators = inputLines[inputLines.length - 1].match(/([*+]\s+)/g).map((op, i, a) => {
    return i !== a.length - 1 ? op.replace(/\s?$/, '') : op // don't trim the last one
  })
  let data = inputLines.slice(0, inputLines.length - 1).map(line => {
    let rowData = []
    const splitLine = line.split('')
    for(let i = 0; i < operators.length; i++) {
      let chunk = ''
      for(let c = 0; c < operators[i].length; c++) {
        chunk += splitLine.shift()
      }
      splitLine.shift() // discard the separating space
      rowData.push(chunk)
    }
    return rowData
  })
  data.push(operators)
  return new Grid({ data, rows: data.length, cols: data[0].length })
}

const solve1 = (input) => {
  const grid = makeGridFromInput(input)
  return grid.getCols().reduce((acc, col) => {
    const op = col[col.length - 1].trim()
    acc += col.slice(0, col.length - 1).map(Number).reduce((sum, val) => {
      if (op === '+') return sum + val
      if (op === '*') return sum * val
      throw new Error(`Unknown operation: ${op}`)
    }, op === '+' ? 0 : 1)
    return acc
  }, 0)
}

/**
 * 123 328  51 64
 *  45 64  387 23
 *   6 98  215 314
 * *   +   *   +
 *
 * @param col
 */
const columnToVerticalNumbers = (col) => {
  const verticalNumbers = []
  // for each character position in the strings
  for(let c = col[0].length - 1; c >= 0; c--) {
    let verticalNumber = ''
    for(let i = 0; i < col.length - 1; i++) {
      verticalNumber += col[i][c]
    }
    verticalNumbers.push(verticalNumber)
  }
  return verticalNumbers.map(Number)
}

const solve2 = (input) => {
  const grid = makeGridFromInput(input)
  const rightToLeftCols = grid.getCols().toReversed()
  return rightToLeftCols.reduce((acc, col) => {
    const op = col[col.length - 1].trim()
    acc += columnToVerticalNumbers(col).reduce((sum, val) => {
      if (op === '+') return sum + val
      if (op === '*') return sum * val
      throw new Error(`Unknown operation: ${op}`)
    }, op === '+' ? 0 : 1)
    return acc
  }, 0)
}

module.exports = (input) => {
  return { part1: solve1(input), part2: solve2(input) }
}
