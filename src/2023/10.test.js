const solution = require('./10')

const test1 = `
.....
.S-7.
.|.|.
.L-J.
.....`

const test2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`

test('Day 10', () => {
    expect(solution(test1)).toEqual({ part1: 4, part2: 0 })
})

test.skip('Day 10', () => {
    expect(solution(test2)).toEqual({ part1: 8, part2: 0 })
})