const {splitClean} = require("../util/inputUtils");

module.exports = (input) => {
    const [part1, part2] = splitClean(input)
    return { part1, part2 }
}