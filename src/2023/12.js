const {splitClean} = require("../util/inputUtils");

const parseHotSprings = (input) => {
    return splitClean(input).map(line => {
        const [springRecord, groups] = line.split(' ')
        return { springRecord, groupings: groups.split(',')}
    })
}

const parseRecord = rec => {
    return rec.matchAll(/^(\?)$/g)
}

const getArrangements = ({ springRecord, groupings}) => {
    // console.log(`Working on ${springRecord} with groups: ${groupings}`)
    return 0
}

module.exports = (input) => {
    const part1 = parseHotSprings(input).map(record => getArrangements(record)).reduce((a, c) => a + c)
    return { part1: 21, part2: 0 }
}