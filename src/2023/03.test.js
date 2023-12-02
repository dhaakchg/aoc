const solution = require('./03')
const primer = `primer
input`

test('Day 3', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})