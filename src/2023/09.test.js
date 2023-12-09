const solution = require('./09')
const primer = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

test('Day 9', () => {
    expect(solution(primer)).toEqual({ part1: 114, part2: 0 })
})