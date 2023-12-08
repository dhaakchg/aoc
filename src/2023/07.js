const {splitClean} = require("../util/inputUtils");

const p1cards = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ]
const p2cards = [ 'A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J' ]
class Poker {

    constructor(cards = p1cards) {
        this.cards = cards
        this.types = [
            groups => groups.length === 1,      // 0: five of a kind
            groups => groups.includes(4), // 1: four of a kind
            groups => groups.length === 2,      // 2: full house
            groups => groups.includes(3), // 3: three of a kind
            groups => groups.length === 3,      // 4: two pair
            groups => groups.length === 4,      // 5: one pair
            () => true,                         // 6 :high card
        ]
        this.prettyTypes = ['Five of a kind', 'Four of a kind', 'Full House', 'Three of a kind', 'Two pair', 'One pair', 'High card']
    }

    compareHands(h1, h2) {
        const h1rank = this.handType(h1)
        const h2rank = this.handType(h2)
        let c = h2rank - h1rank // wtf I hate sorting. either h2 - h1, or reverse() at the end. fucking stupid.
        // Hand types are the same, compare the cards in the hand individually
        for(let i = 0; c === 0 && i < h1.length; i++) {
            c = this.cards.indexOf(h2[i]) - this.cards.indexOf(h1[i])
        }
        const sort = Math.sign(c)
        // const sym = sort === 1 ? '>' : '<'
        // console.log(`Sort ${h1} ${this.prettyType(h1)} ${sym} ${this.prettyType(h2)} ${h2}`)
        return sort
    }
    cardCounts(hand) {
        const map = [...hand].reduce((acc, c) => {
            acc.set(c, (acc.get(c) ?? 0) + 1);
            return acc
        }, new Map())
        return [...map.values()]
    }
    handType(hand) {
        if (this.cards.indexOf('J') === 3 || !hand.includes('J')) {
            const cnts = this.cardCounts(hand)
            return this.types.findIndex(pred => pred(cnts))
        } else {
            // p2 joker shit
            const possReplacement = p2cards.slice(0, p2cards.length - 1)
            const bestPoss = possReplacement.reduce((handIndex, wildCard) => {
                const wild = hand.replaceAll('J', wildCard)
                const cnts = this.cardCounts(wild)
                return Math.min(this.types.findIndex(pred => pred(cnts)), handIndex)
            }, 7)
            const cntsNoWild = this.cardCounts(hand)
            const typeNoWild = this.types.findIndex(pred => pred(cntsNoWild))
            return bestPoss <= typeNoWild ? bestPoss : typeNoWild
        }
    }
    prettyType(hand) {
        return this.prettyTypes[this.handType(hand)]
    }
}
const parseInput = (input) => {
    return splitClean(input).map(line => {
        const [hand, bid] = line.split(' ')
        return { hand, bid }
    })
}

module.exports = (input) => {
    let poker = new Poker()
    const handsAndBids = parseInput(input)
    // handsAndBids.forEach(({hand: h1, bid}) => {
    //     handsAndBids.forEach(({hand: h2}) => {
    //         const sort = poker.compareHands(h1, h2)
    //         let sym = '==='
    //         if (sort === -1) {
    //             sym = '>'
    //         } else if (sort === 1) {
    //             sym = '<'
    //         }
    //         console.log(`Sort ${h1} ${poker.prettyType(h1)} ${sym} ${poker.prettyType(h2)} ${h2}`)
    //     })
    // })

    handsAndBids.sort((h1, h2) => poker.compareHands(h1.hand, h2.hand))
    const part1 = handsAndBids.reduce((acc, c, i) => {
        acc += c.bid * (i + 1)
        return acc
    }, 0)

    // console.log('PART 2')
    poker = new Poker(p2cards)
    handsAndBids.sort((h1, h2) => poker.compareHands(h1.hand, h2.hand))
    const part2 = handsAndBids.reduce((acc, c, i) => {
        acc += c.bid * (i + 1)
        return acc
    }, 0)
    // console.log(`sorted: ${JSON.stringify(handsAndBids, null, 2)}`)
    return { part1, part2 }
}