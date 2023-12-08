const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers")

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

    compareHands(h1, h2, part = 1) {
        const h1rank = this.handType(h1)
        const h2rank = this.handType(h2)
        if(part === 1) {
            let compare = h2rank - h1rank // wtf I hate sorting. either h2 - h1, or reverse() at the end. fucking stupid.
            // Hand types are the same, compare the cards in the hand individually
            for(let i = 0; compare === 0 && i < h1.length; i++) {
                compare = this.cards.indexOf(h2[i]) - this.cards.indexOf(h1[i])
            }
            return Math.sign(compare)
        }
    }
    cardCounts(hand) {
        const map = [...hand].reduce((acc, c) => {
            acc.set(c, (acc.get(c) ?? 0) + 1);
            return acc
        }, new Map())
        return [...map.values()]
    }
    handType(hand) {
        const cnts = this.cardCounts(hand)
        return this.types.findIndex(pred => pred(cnts))
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
    const poker = new Poker()
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
    console.log(`sorted: ${JSON.stringify(handsAndBids, null, 2)}`)
    return { part1, part2: 0 }
}