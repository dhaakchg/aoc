const solution = require('./04')
const primer = `primer
input`

test('Day 4', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})