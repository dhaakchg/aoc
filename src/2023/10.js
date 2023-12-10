const {splitClean} = require("../util/inputUtils");

const parseInput = (input) => {
    return splitClean(input)
}

module.exports = (input) => {
    const [part1, part2] = parseInput(input)
    return { part1, part2 }
}