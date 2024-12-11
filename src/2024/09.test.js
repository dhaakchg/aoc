const solution = require('./09')
const primer = `2333133121414131402`

test('Day 9', () => {
    expect(solution(primer)).toEqual({ part1: 1928, part2: 2858 })
})
