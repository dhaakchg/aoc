const {splitClean} = require("../util/inputUtils");

const parseInput = (input) => {
    return splitClean(input).map(line => {
        const { cardNum, win, you } = line.match(/^Card\s+(?<cardNum>\d+):(?<win>[ 0-9]+)\|(?<you>[ 0-9]+)/).groups
        const winning = new Set(win.trim().split(' ').filter(n => n !== '').map(n => parseInt(n)))
        const youhave = new Set(you.trim().split(' ').filter(n => n !== '').map(n => parseInt(n)))
        return { card: parseInt(cardNum), winning, youhave }
    })
}

const cardScore = (scratchCard) => {
    const { winning, youhave } = scratchCard
    let score = 0
    const winningNums = [...youhave].filter(n => winning.has(n))
    if (winningNums.length >= 1) {
        score = 1
        winningNums.slice(1).forEach(() => score = score * 2)
    }
    return score
}

module.exports = (input) => {
    const part1 = parseInput(input).map(card => cardScore(card)).reduce((a, c) => a + c)
    return { part1, part2: 0 }
}