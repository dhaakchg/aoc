const solution = require('./00')
const primer = `primer
input`

test('Day 00', () => {
    expect(solution(primer)).toEqual(['part1', 'part2'])
})