const solution = require('./07')
const primer = `primer
input`

test('Day 7', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})
