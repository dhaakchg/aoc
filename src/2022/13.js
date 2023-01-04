const {splitClean} = require("../util/inputUtils");

const compare = (lhs, rhs, indent = 0) => {
    // console.log(`${' '.repeat(indent)}- Compare ${JSON.stringify(lhs)} vs ${JSON.stringify(rhs)}`)
    let result = 0
    for(let i = 0; i < Math.min(lhs.length, rhs.length); i++) {
        let lp = lhs[i]
        let rp = rhs[i]
        if(typeof lp === 'number' && typeof rp === 'number') {
            result = lp - rp
            // console.log(`${' '.repeat(indent + 1)}- Compare ${lp} vs ${rp} == ${result}`)
            if(result <  0) {
                // console.log(`${' '.repeat(indent + 2)}- Left side is smaller, so inputs are in the right order`)
            } else if(result > 0) {
                // console.log(`${' '.repeat(indent + 2)}- Right side is smaller, so inputs are not in the right order`)
            }
        } else {
            if(typeof lp === 'number') {
                // console.log(`${' '.repeat(indent)}- Mixed types; convert left to [${lp}] and retry comparison`)
                lp = [lp]
            }
            if(typeof rp === 'number') {
                // console.log(`${' '.repeat(indent)}- Mixed types; convert right to [${rp}] and retry comparison`)
                rp = [rp]
            }
            result = compare(lp, rp, indent + 1)
        }
        if(result !== 0) {
            return Math.sign(result)
        }
    }
    result = Math.sign(lhs.length - rhs.length)
    if(result < 0) {
        // console.log(`${' '.repeat(indent)}- Left side ran out of items, so inputs are in the right order`)
    } else if(result > 0) {
        // console.log(`${' '.repeat(indent)}- Right side ran out of items, so inputs are not in the right order`)
    }
    return result
}

module.exports = (input) => {
    const packetPairs = input.split(/\n{2}/).map(p => p.trim())
    let part1 = 0
    packetPairs.forEach((pair, index) => {
        // console.log(`== Pair ${index + 1} ==`)
        const [p1, p2] = pair.split('\n').map(p => JSON.parse(p))
        const pairEqual = compare(p1, p2)
        // console.log(`Packet result: ${pairEqual}, ${pairEqual <= 0 ? 'equal' : 'not equal'}`)
        if(pairEqual < 0) {
            part1 += index + 1
        }
    })
    let packets = splitClean(input).map(p => JSON.parse(p))
    const dividePkts = [[[2]], [[6]]]
    dividePkts.map(pkt => packets.push(pkt))
    packets.sort(compare)
    const part2 = dividePkts.map(pkt => packets.indexOf(pkt) + 1).reduce((a, b) => a * b)
    return [part1, part2]
}