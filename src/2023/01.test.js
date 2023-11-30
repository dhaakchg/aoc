const solution = require('./01')
const primer = `primer
input`

test('Day 01', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})