const {splitClean} = require("../util/inputUtils");
const lcm = require('../util/lcm')

const parseInstructions = (input) => {
    const cleaned = splitClean(input)
    const instructions = cleaned[0].split('')
    const nodes = cleaned.slice(1).map(line => {
        const { name, left, right } = line.match(/^(?<name>[A-Z0-9]{3}) = \((?<left>[A-Z0-9]{3}), (?<right>[A-Z0-9]{3})\)$/).groups
        return { name, data: { left, right }}
    })
    return { instructions, nodes }
}

const navigate = ({instructions, nodes}, stopCond) => {
    let currentNode = nodes[0]
    let steps = 0
    while (!stopCond(currentNode)) {
        for(let instruction of instructions) {
            // console.log(`At node: ${currentNode.name}, L/R = ${JSON.stringify(currentNode.data)}, steps: ${steps}`)
            if (instruction === 'L') {
                currentNode = nodes.find(node => node.name === currentNode.data.left)
            } else {
                currentNode = nodes.find(node => node.name === currentNode.data.right)
            }
            // console.log(`\tGoing ${instruction} to ${currentNode.name}`)
            steps++
        }
    }
    return steps
}

module.exports = (input) => {
    const parsed = parseInstructions(input)
    const p1stop = cnode => cnode.name === 'ZZZ'
    const part1 = navigate(parsed, p1stop)
    return { part1, part2: 0 }
}