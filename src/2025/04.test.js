const solution = require('./04')
const primer = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

test('Day 04', () => {
    expect(solution(primer)).toEqual({ part1: 13, part2: 43 })
})
