const {splitClean} = require('../util/inputUtils')
const GridCoord = require("../util/gridCoord");
const { combinationN } = require('../util/helpers')

const getTiles = (input) => {
  return splitClean(input).map(line => {
    const [col, row] = line.split(',').map(Number)
    return new GridCoord(row, col)
  })
}

const solve1 = (redTiles) => {
  const corners = [...combinationN(redTiles, 2)]
  return corners.map(cornerPair => {
    const [coordA, coordB] = cornerPair
    const dX = Math.abs(coordA.col - coordB.col) + 1
    const dY = Math.abs(coordA.row - coordB.row) + 1
    return dX * dY
  }).toSorted((a, b) => b - a)[0]
}

module.exports = (input) => {
  const redTiles = getTiles(input)
  return { part1: solve1(redTiles), part2: 0 }
}
