const solution = require('./10')
const primer = `0123
1234
8765
9876`

test('Day 10', () => {
    expect(solution(primer)).toEqual({ part1: 36, part2: 'input' })
})
