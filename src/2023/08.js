const {splitClean} = require("../util/inputUtils");

const parseInstructions = (input) => {
    const cleaned = splitClean(input)
    const instructions = cleaned[0].split('')
    const nodes = cleaned.slice(1).map(line => {
        const { node, left, right } = line.match(/^(?<node>[A-Z]{3}) = \((?<left>[A-Z]{3}), (?<right>[A-Z]{3})\)$/).groups
        return { node, data: { left, right }}
    })
    return { instructions, nodes }
}

module.exports = (input) => {
    const { instructions, nodes } = parseInstructions(input)
    console.log(`ins ${instructions} nodes: ${JSON.stringify(nodes, null, 2)}`)
    return { part1: 0, part2: 0 }
}