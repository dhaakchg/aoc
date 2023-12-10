const {splitClean} = require("../util/inputUtils");

const parseInput = (input) => {
    return splitClean(input).map(line => line.split(' ').map(n => parseInt(n)))
}
const allZeros = seq => seq.every(n => n === 0)
const getNextSeq = (seq) => {
    const next = []
    for(let i = 0; i < seq.length - 1; i++) {
        next.push(seq[i + 1] - seq[i])
    }
    return next
}
const getSequencesToZeros = (seq) => {
    const extrapolations = [seq]
    let nextSeq = [...seq]
    while (!allZeros(nextSeq)) {
        nextSeq = [...getNextSeq(nextSeq)]
        extrapolations.push(nextSeq)
    }
    extrapolations.reverse()
    return extrapolations
}
const extrapolateArrayEnds = (extrapolations) => {
    extrapolations.forEach((extrapolation, i) => {
        if(i === 0) {
            extrapolation.push(0)
        } else {
            const prevLastVal = extrapolations[i - 1][extrapolations[i - 1].length - 1]
            extrapolation.push(extrapolation[extrapolation.length - 1] + prevLastVal)
        }
    })
    return extrapolations.at(-1).at(-1)
}
const extrapolateArrayBegin = (extrapolations) => {
    extrapolations.forEach((extrapolation, i) => {
        if(i === 0) {
            extrapolation.unshift(0)
        } else {
            const prevFirstVal = extrapolations[i - 1][0]
            extrapolation.unshift(extrapolation[0] - prevFirstVal)
        }
    })
    return extrapolations.at(-1).at(0)
}

module.exports = (input) => {
    const histories = parseInput(input)
    const toZeros = histories.map(history => getSequencesToZeros(history))
    const part1 = toZeros.map(ex => extrapolateArrayEnds(ex)).reduce((a, c) => a + c)
    const part2 = toZeros.map(ex => extrapolateArrayBegin(ex)).reduce((a, c) => a + c)
    return { part1, part2 }
}