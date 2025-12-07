const solution = require('./06')
const primer = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

test('Day 06', () => {
    expect(solution(primer)).toEqual({ part1: 4277556, part2: 3263827 })
})
