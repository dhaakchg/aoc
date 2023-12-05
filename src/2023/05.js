const { splitOnEmptyLine } = require("../util/inputUtils");

const makeAlmanac = (input) => {
    const chunks = splitOnEmptyLine(input)
    const almanac = { seeds: chunks[0].split(':')[1].trim().split(' ').map(s => parseInt(s)) }
    chunks.slice(1).forEach(chunk => {
        const { map, ranges } = chunk.match(/^(?<map>[a-z-]+)\s+map:(?<ranges>(.|[\r\n])+)/m).groups
        almanac[map] = ranges.trim().split('\n').map(r => {
            const [ destStart, srcStart, length ] = r.trim().split(' ').map(val => parseInt(val))
            return {
                srcStart,
                srcEnd: (srcStart + length) - 1,
                destStart,
                destEnd: (destStart + length) - 1
            }
        })
    })
    return almanac
}
const lookup = (srcNum, map) => {
    let dstNum = srcNum
    map.forEach(mapRng => {
        if(srcNum >= mapRng.srcStart && srcNum <= mapRng.srcEnd ) {
            dstNum = mapRng.destEnd - (mapRng.srcEnd - srcNum)
        }
    })
    return dstNum
}
const traceLocation = (seed, almanac) => {
    let srcNum = seed
    Object.keys(almanac).filter(map => map !== 'seeds').forEach(map => {
        srcNum = lookup(srcNum, almanac[map])
    })
    return srcNum
}

module.exports = (input) => {
    const almanac = makeAlmanac(input)
    console.log(`${JSON.stringify(almanac)}`)
    const locations = almanac.seeds.map(seed => traceLocation(seed, almanac))
    const part1 = Math.min(...locations)
    return { part1, part2: 0 }
}