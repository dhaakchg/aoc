const { splitOnEmptyLine } = require("../util/inputUtils");

const makeAlmanac = (input) => {
    const chunks = splitOnEmptyLine(input)
    const almanac = {}
    const seeds = chunks[0].split(':')[1].trim().split(' ').map(s => parseInt(s))
    const seedRanges = seeds.map((seed, i, seeds) => {
        if (i % 2 === 0) {
            return { start: seed, end: ( seed + seeds[i + 1]) - 1 }
        }
    }).filter(rng => !!rng)
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
    return { seeds, seedRanges, ...almanac }
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
    Object.keys(almanac).filter(map => !map.match(/seeds|seedRanges/)).forEach(map => {
        srcNum = lookup(srcNum, almanac[map])
    })
    return srcNum
}

const traceLocationRanges = (seedRange, almanac) => {
    const locations = []
    const { start, end } = seedRange
    for (let seed = start; seed <= end; seed++) {
        locations.push(traceLocation(seed, almanac))
    }
    return locations
}

module.exports = (input) => {
    const almanac = makeAlmanac(input)
    console.log(`${JSON.stringify(almanac)}`)
    let locations = almanac.seeds.map(seed => traceLocation(seed, almanac))
    const part1 = Math.min(...locations)
    locations = almanac.seedRanges.map(rng => traceLocationRanges(rng, almanac))
    const part2 = Math.min(...locations.flat())
    return { part1, part2 }
}