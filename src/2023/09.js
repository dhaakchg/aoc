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
const extraPolateHist = (seq) => {
    const extrapolations = [seq]
    let nextSeq = [...seq]
    while(!allZeros(nextSeq)) {
        nextSeq = [...getNextSeq(nextSeq)]
        extrapolations.push(nextSeq)
    }
    console.log(`Initial:\n${extrapolations.join('\n')}`)
    extrapolations.reverse()
    console.log(`Reversed:\n${extrapolations.join('\n')}`)
    extrapolations.forEach((extrapolation, i) => {
        if(i === 0) {
            extrapolation.push(0)
        } else {
            const prevLastVal = extrapolations[i - 1][extrapolations[i - 1].length - 1]
            extrapolation.push(extrapolation[extrapolation.length - 1] + prevLastVal)
        }
    })
    console.log(`After:\n${extrapolations.join('\n')}`)
    return extrapolations.at(-1).at(-1)
}

module.exports = (input) => {
    const histories = parseInput(input)
    const part1 = histories.map(history => extraPolateHist(history)).reduce((a, c) => a + c)
    return { part1, part2: 0 }
}