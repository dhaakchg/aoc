const solution = require('./07')
const primer = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

test('Day 7', () => {
    expect(solution(primer)).toEqual({ part1: 6440, part2: 5905 })
})