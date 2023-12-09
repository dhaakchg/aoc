const {splitClean} = require("../util/inputUtils");
const { lcm } = require('../util/helpers')

const parseInstructions = (input) => {
    const cleaned = splitClean(input)
    const instructions = cleaned[0].split('')
    const nodes = cleaned.slice(1).map(line => {
        const { name, left, right } = line.match(/^(?<name>[A-Z0-9]{3}) = \((?<left>[A-Z0-9]{3}), (?<right>[A-Z0-9]{3})\)$/).groups
        return { name, data: { left, right }}
    })
    return { instructions, nodes }
}

const navigate = ({ instructions, nodes }, startNodes) => {
    const ghosts = []
    startNodes.forEach((node) => {
        ghosts.push({ node, steps: 0, cycles: []})
    })
    const stopCond = ghosts => ghosts.every(ghost => ghost.cycles.length >= 1)
    while(!stopCond(ghosts)) {
        for(let instruction of instructions) {
            // console.log(`At node: ${currentNode.name}, L/R = ${JSON.stringify(currentNode.data)}, steps: ${steps}`)
            if (instruction === 'L') {
                ghosts.forEach(ghost => {
                    ghost.node = nodes.find(node => node.name === ghost.node.data.left)
                })
            } else {
                ghosts.forEach(ghost => {
                    ghost.node = nodes.find(node => node.name === ghost.node.data.right)
                })
            }
            ghosts.forEach(ghost => ghost.steps += 1)
            ghosts.forEach((ghost) => {
                if(ghost.node.name.endsWith('Z')) {
                    ghost.cycles.push(ghost.steps)
                }
            })
        }
    }
    // ghosts.forEach((ghost, i) => {
    //     console.log(`Ghost ${i} at ${ghost.node.name} in ${ghost.steps} cycles: ${ghost.cycles}`)
    // })
    // console.log(`${ghosts.map(ghost => ghost.cycles[0]).join(' ')}`)
    return ghosts.map(ghost => ghost.cycles[0]).reduce((a, c) => lcm(a, c), 1)
}

module.exports = (input) => {
    const parsed = parseInstructions(input)
    const part1 = navigate(parsed, parsed.nodes.filter(node => node.name === 'AAA'))
    const part2 = navigate(parsed, parsed.nodes.filter(node => node.name.endsWith('A')))
    return { part1, part2 }
}