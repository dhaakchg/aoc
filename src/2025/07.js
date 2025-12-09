const { splitClean } = require('../util/inputUtils')
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord");

const SPLITTER_CHAR = '^'
const START_CHAR = 'S'
const BEAM_CHAR = '|'

const findStart = (grid) => grid.findValue(START_CHAR)
const splitterPositions = (grid) => grid.findAll(SPLITTER_CHAR)
const currentBeamPositions = (grid, rowNum) => grid.getRow(rowNum).map((pos, colNum) => {
  return pos === BEAM_CHAR ? new GridCoord(rowNum, colNum) : null
}).filter(Boolean)

const solve1 = (grid) => {
  let splitBeams = 0
  grid.set(findStart(grid), BEAM_CHAR)
  const splitters = splitterPositions(grid)

  for(let row = 0; row < grid.rows - 1; row++) {
    const beamPositions = currentBeamPositions(grid, row)
    const nextRowSplitters = splitters.filter(splitter => splitter.row === row + 1)
    beamPositions.forEach((beamPosition) => {
      const beamSplitter = nextRowSplitters.find(splitter => splitter.col === beamPosition.col)
      if(beamSplitter) {
        grid.set({ row: beamSplitter.row, col: beamPosition.col - 1 }, BEAM_CHAR)
        grid.set({ row: beamSplitter.row, col: beamPosition.col + 1 }, BEAM_CHAR)
        splitBeams++
      } else {
        grid.set({ row: beamPosition.row + 1, col: beamPosition.col }, BEAM_CHAR)
      }
    })
  }
  return splitBeams
}

const solve2 = (grid) => {
  // memoize shit
  grid.set(findStart(grid), BEAM_CHAR)
  const splitters = splitterPositions(grid)

  for(let row = 0; row < grid.rows - 1; row++) {
    const beamPositions = currentBeamPositions(grid, row)
    const nextRowSplitters = splitters.filter(splitter => splitter.row === row + 1)
    beamPositions.forEach((beamPosition) => {
      const beamSplitter = nextRowSplitters.find(splitter => splitter.col === beamPosition.col)
      if(beamSplitter) {
        grid.set({ row: beamSplitter.row, col: beamPosition.col - 1 }, BEAM_CHAR)
        grid.set({ row: beamSplitter.row, col: beamPosition.col + 1 }, BEAM_CHAR)
        splitBeams++
      } else {
        grid.set({ row: beamPosition.row + 1, col: beamPosition.col }, BEAM_CHAR)
      }
    })
  }
  return splitBeams
}

module.exports = (input) => {
  const grid = new Grid({ data: splitClean(input) })
  return { part1: solve1(grid), part2: solve2(grid) }
}
