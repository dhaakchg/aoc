const solution = require('./06')
const primer = `primer
input`

test('Day 6', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})