const solution = require('./02')
const primer = `primer
input`

test('Day 2', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})
