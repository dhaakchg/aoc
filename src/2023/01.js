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
        const m = [...line.matchAll(re)].map(match => match[0] in wordIntMap ? wordIntMap[match[0]] : match[0])
        const first = m[0]
        const last = m[m.length - 1]
        const num = parseInt(`${first}${last}`)
        console.log(`line ${line} matched: ${m} first: ${first} last: ${last} parsed: ${num}`)
        return num
    }).reduce((p, c) => {
        console.log(`accum: ${p} adding ${c}`)
        return p + c
    }, 0)
}

module.exports = (input) => {
    console.log('---- Part 1 ----')
    const part1 = parseReduce(input, /\d/g)
    console.log('---- Part 2 ----')
    const part2 = parseReduce(input, /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
    return { part1, part2 }
}