const {splitClean} = require("../util/inputUtils");

module.exports = (input) => {
    let part1 = 0
    let part2 = 0
    let left = []
    let right = []
    splitClean(input).forEach(line => {
        const [a, b] = line.split('   ').map(Number)
        left.push(a)
        right.push(b)
    })
    const [lsort, rsort] = [left, right].map(arr => arr.sort((a, b) => a - b))
    for (let i = 0; i < lsort.length; i++) {
        part1 +=  Math.abs(rsort[i] - lsort[i])
    }

    for (let i = 0; i < lsort.length; i++) {
        let count = right.filter(r => r === lsort[i]).length
        part2 += lsort[i] * count
    }

    return { part1, part2 }
}
