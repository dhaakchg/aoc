const solution = require('./11')
const primer = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

test('Day 11', () => {
    expect(solution(primer, 1)).toEqual({ part1: 374, part2: 374 })
})

test('Day 11', () => {
    expect(solution(primer, 9)).toEqual({ part1: 374, part2: 1030 })
})

test('Day 11', () => {
    expect(solution(primer, 99)).toEqual({ part1: 374, part2: 8410 })
})