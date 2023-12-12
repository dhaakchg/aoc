const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");

const parseInput = (input) => {
    const grid = new Grid({data: splitClean(input)})
    console.log(grid.toString())
}

const findStart = grid => grid.findValue('S')

const findValidNav = (coord, grid) => {
    const compass = grid.getCardinalDirsFromPoint(coord)

}

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    console.log(grid.toString())
    const startCoords = findStart(grid)
    console.log(`Start: ${JSON.stringify(startCoords)}, adj: ${JSON.stringify(grid.getCardinalDirsFromPoint(startCoords))}`)
    const startAdj = grid.getAdjacentGrid(startCoords)
    console.log(`Start subgrid: ${startAdj.toString()}`)
    return { part1: 0, part2: 0 }
}