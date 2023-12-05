const {splitClean} = require("../util/inputUtils");

const parseInput = (input) => {
    return splitClean(input).map(line => {
        const { cardNum, win, you } = line.match(/^Card\s+(?<cardNum>\d+):(?<win>[ 0-9]+)\|(?<you>[ 0-9]+)/).groups
        const winning = new Set(win.trim().split(' ').filter(n => n !== '').map(n => parseInt(n)))
        const youhave = new Set(you.trim().split(' ').filter(n => n !== '').map(n => parseInt(n)))
        return { num: parseInt(cardNum), winning, youhave }
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
    return {...scratchCard, winCount: winningNums.length, score }
}

const winMoar = (initialCards) => {
    const counts = initialCards.map(c => c.num).reduce((ac,a) => ({...ac,[a]:1}),{});
    initialCards.forEach((card, i) => {
        // Figure out how which cards would be won
        const wouldWin = initialCards.slice(i + 1, i + 1 + card.winCount).map(c => c.num)
        // For each winning card, add the count of the currently processed card to it
        // Effectively multiplying
        wouldWin.forEach(winCard => counts[winCard] += counts[card.num])
    })
    return Object.values(counts).reduce((a, c) => a + c, 0)
}

module.exports = (input) => {
    const cards = parseInput(input).map(card => cardScore(card))
    const part1 = cards.map(card => card.score).reduce((a, c) => a + c)
    const part2 = winMoar(cards)
    return { part1, part2 }
}