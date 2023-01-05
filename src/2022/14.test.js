const solution = require('./14')
const primer = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

test('Day 14', () => {
    expect(solution(primer)).toEqual([24, 93])
})