const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");
const xmasRegex = /(?=(XMAS|SAMX))/g

const findInArray = (list) => {
    return [...list.join('').matchAll(xmasRegex)].length
}

module.exports = (input) => {
    let part1 = 0
    const grid = new Grid({data: splitClean(input)})
    part1 += grid.getRows().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    part1 += grid.getCols().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    part1 += grid.getLeftToRightDiags().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    part1 += grid.getRightToLeftDiags().map(row => findInArray(row)).reduce((acc, curr) => acc + curr)
    return { part1, part2: 0 }
}
