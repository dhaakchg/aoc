const { splitOnEmptyLine } = require("../util/inputUtils");

const makeAlmanac = (input) => {
    const chunks = splitOnEmptyLine(input)
    const almanac = { seeds: chunks[0].split(':')[1].trim().split(' ').map(s => parseInt(s)) }
    chunks.slice(1).forEach(chunk => {
        const { map, ranges } = chunk.match(/^(?<map>[a-z-]+)\s+map:(?<ranges>(.|[\r\n])+)/m).groups
        almanac[map] = ranges.trim().split('\n').map(range => {
            const [ destStart, srcStart, length ] = range.trim().split(' ').map(r => parseInt(r))
            return { destStart, srcStart, length }
        })
    })
    return almanac
}

module.exports = (input) => {
    const almanac = makeAlmanac(input)
    console.log(JSON.stringify(almanac))
    return { part1, part2 }
}