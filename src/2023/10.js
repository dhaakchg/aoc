const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");

const parseInput = (input) => {
    const grid = new Grid({data: splitClean(input)})
    console.log(grid.toString())
}

const findStart = grid => grid.findValue('S')

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    console.log(grid.toString())
    const startCoords = findStart(grid)
    console.log(`Start: ${startCoords}`)
    const startAdj = grid.getAdjacentGrid({ row: startCoords[0], col: startCoords[1]})
    console.log(`Start subgrid: ${startAdj.toString()}`)
    return { part1: 0, part2: 0 }
}