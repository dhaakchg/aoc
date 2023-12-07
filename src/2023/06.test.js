const solution = require('./06')
const primer = `Time:      7  15   30
Distance:  9  40  200`

test('Day 6', () => {
    expect(solution(primer)).toEqual({ part1: 288, part2: 71503 })
})