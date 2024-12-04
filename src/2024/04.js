const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord");
const xmasRegex = /(?=(XMAS|SAMX))/g

const findInArray = (list) => {
    return [...list.join('').matchAll(xmasRegex)].length
}

const part1 = (grid) => {
    let part1 = 0
    part1 += grid.getRows().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    part1 += grid.getCols().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    part1 += grid.getLeftToRightDiags().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    part1 += grid.getRightToLeftDiags().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    return part1
}

const isXmas = (grid) => {
    return grid.as1dArray().join('').match(/(M.S.A.M.S)|(S.S.A.M.M)|(S.M.A.S.M)|(M.M.A.S.S)/)
}

const part2 = (grid) => {
    let count = 0
    for(let i = 1; i < grid.cols - 1; i++) {
        for(let j = 1; j < grid.rows - 1; j++) {
            if(isXmas(grid.getAdjacentGrid(new GridCoord(j, i)))) {
                count++
            }
        }
    }
    return count
}

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    return { part1: part1(grid), part2: part2(grid) }
}
