const solution = require('./10')

const test1 = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF`

const test2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`

test.skip('Day 10', () => {
    expect(solution(test1)).toEqual({ part1: 4, part2: 0 })
})

test('Day 10', () => {
    expect(solution(test2)).toEqual({ part1: 8, part2: 0 })
})