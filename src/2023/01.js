const { splitClean } = require("../util/inputUtils");

const wordIntMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const parseReduce = (input, re) => {
    return splitClean(input).map(line => {
        const m = [...line.matchAll(re)].map(match => match[1] in wordIntMap ? wordIntMap[match[1]] : match[1])
        const first = m[0]
        const last = m[m.length - 1]
        return parseInt(`${first}${last}`)
    }).reduce((p, c) => p + c, 0)
}

module.exports = (input) => {
    const part1 = parseReduce(input, /(\d)/g)
    const part2 = parseReduce(input, /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
    return { part1, part2 }
}