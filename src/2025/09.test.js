const solution = require('./09')
const primer = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

test('Day 09', () => {
    expect(solution(primer)).toEqual({ part1: 50, part2: 0 })
})
