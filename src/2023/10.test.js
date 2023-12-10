const solution = require('./10')
const primer = `primer
input`

test('Day 10', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})