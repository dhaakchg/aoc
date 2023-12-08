const solution = require('./08')
const primer = `primer
input`

test('Day 8', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})