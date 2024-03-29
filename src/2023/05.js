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
                src: [ srcStart, (srcStart + length) - 1 ],
                dst: [ destStart, (destStart + length) - 1 ],
            }
        })
    })
    return { seeds, seedRanges, ...almanac }
}
const lookup = (srcNum, map) => {
    for(const mapRng of map) {
        if(srcNum >= mapRng.src[0] && srcNum <= mapRng.src[1] ) {
            return mapRng.dst[1] - (mapRng.src[1] - srcNum)
        }
    }
    return srcNum
}

const lookupR = (dstNum, map) => {
    for(const mapRng of map) {
        if(dstNum >= mapRng.dst[0] && dstNum <= mapRng.dst[1] ) {
            return mapRng.src[1] - (mapRng.dst[1] - dstNum)
        }
    }
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
    const { start, end } = seedRange
    let lowest = traceLocation(start, almanac)
    for (let seed = start; seed <= end; seed++) {
        lowest = Math.min(traceLocation(seed, almanac), lowest)
    }
    return lowest
}

// do it backwards from 0
const traceSeed = (location, almanac) => {
    let dstNum = location
    Object.keys(almanac).filter(map => !map.match(/seeds|seedRanges/)).reverse().forEach(map => {
        dstNum = lookupR(dstNum, almanac[map])
    })
    return dstNum
}

const seedInRanges = (seed, almanac) => {
    for (let rng of almanac.seedRanges) {
        if (seed >= rng.start && seed <= rng.end) return true
    }
    return false
}

module.exports = (input) => {
    const almanac = makeAlmanac(input)
    // let locations = almanac.seeds.map(seed => traceLocation(seed, almanac))
    // const part1 = Math.min(...locations)
    // locations = almanac.seedRanges.map(rng => traceLocationRanges(rng, almanac))
    // const part2 = Math.min(...locations)
    let found = false
    let part1 = -1
    while (!found) {
        part1++
        found = almanac.seeds.includes(traceSeed(part1, almanac))
    }
    found = false
    let part2 = -1
    while (!found) {
        part2++
        found = seedInRanges(traceSeed(part2, almanac), almanac)
    }
    return { part1, part2 }
}