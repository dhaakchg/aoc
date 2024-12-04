const solution = require('./01')
const primer = `3   4
4   3
2   5
1   3
3   9
3   3`

test('Day 1', () => {
    expect(solution(primer)).toEqual({ part1: 11, part2: 31 })
})
