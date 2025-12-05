const {splitClean} = require('../util/inputUtils')
const Grid = require("../util/grid");
const ROLL_CHAR = '@'


const rollAccess = (grid) => {
  return grid.as1dArray().filter(x => x === ROLL_CHAR).length - 1 < 4
}

module.exports = (input) => {
  const grid = new Grid({ data: splitClean(input) })
  const part1 = grid.findAll(ROLL_CHAR).filter(coord => rollAccess(grid.getAdjacentGrid(coord))).length
  return { part1, part2: 0 }
}
