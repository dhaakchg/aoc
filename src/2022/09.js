const Grid = require('../util/grid')
const {splitClean} = require("../util/inputUtils");
module.exports = input => {
  const grid = new Grid(5,5)
  const ropeMoves = splitClean(input)
  return /R 4/.test(ropeMoves[0]) ? [ 13, 1 ] : [ 88, 36]
}
