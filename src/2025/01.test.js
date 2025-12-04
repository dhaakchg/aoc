const solution = require('./01')
const test1 = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

const test2 = `L55
R5
L612`

test.each([
  [test1, { part1: 3, part2: 6 }],
  [test2, { part1: 1, part2: 7 }],
])('Day 1', (input, expected) => {
    expect(solution(input)).toEqual(expected)
})
