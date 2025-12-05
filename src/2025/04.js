const {splitClean} = require('../util/inputUtils')
const Grid = require("../util/grid");
const ROLL_CHAR = '@'

const rollAccess = (grid) => {
  return grid.as1dArray().filter(x => x === ROLL_CHAR).length - 1 < 4
}

const findAccessibleRolls = (grid) => {
  return grid.findAll(ROLL_CHAR).filter(coord => rollAccess(grid.getAdjacentGrid(coord)))
}

const countAccessibleRolls = (grid) => {
  return findAccessibleRolls(grid).length
}

const removeRolls = (grid) => {
  let removedRolls = 0
  const currentGrid = grid.deepCopy()
  while(countAccessibleRolls(currentGrid) > 0) {
    const accessibleRolls = findAccessibleRolls(currentGrid)
    accessibleRolls.forEach(coord => currentGrid.set(coord, 'x'))
    removedRolls += accessibleRolls.length
  }
  return removedRolls
}

module.exports = (input) => {
  const grid = new Grid({ data: splitClean(input) })
  const part1 = countAccessibleRolls(grid)
  const part2 = removeRolls(grid)
  return { part1, part2 }
}
