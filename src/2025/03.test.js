const solution = require('./03')
const primer = `987654321111111
811111111111119
234234234234278
818181911112111`

test('Day 3', () => {
    expect(solution(primer)).toEqual({ part1: 357, part2: 3121910778619 })
})
