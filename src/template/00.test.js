const solution = require('./00')
const primer = `primer
input`

test('Day 0', () => {
    expect(solution(primer)).toEqual({ part1: 0, part2: 0 })
})
