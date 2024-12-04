const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    const [part1, part2] = splitClean(input)
    return { part1, part2 }
}
